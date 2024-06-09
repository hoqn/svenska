---
title: Monorepo와 Github로 원하는 배포 및 호스팅 환경 구축
created_at: 2024-06-08
tags:
  - github
  - monorepo
subtitle: monorepo에서의 호스팅
---
## 도입

짤막하게 구현한 애니메이션들을 종합적으로 호스팅(또는 배포) 하는 환경을 구성하고 싶었다. 이때, 각각의 애니메이션들이 모두 한 패키지 내에서 구현되는 것이 아니라, 모노레포로 구성된 패키지 하위에서 각각의 구현마다 완전히 독립된 패키지 내에서 관리되는 것이 핵심이었다. 대략 아래와 같았다.

```
@anim/monorepo
├ @anim/app
└ packages/
  ├ @anim/shared-modal
  ├ @anim/multistep
  ├ ...
```

Monorepo 구성은 pnpm workspace로, 통합 빌드 시스템 구성은 turborepo를 사용해 구축된 상태였다. 빌드는 각각의 하위 패키지 내의 `dist/`로 되도록 통일해놓았고, 모두 완전히 클라이언트 사이드 기술만 사용하기로 하였다. (즉, 빌드된 페이지는 모두 정적 페이지이다.)

한편, 내가 원하는 호스팅(또는 배포) 방식은 아래와 같았다.

```
@anim/monorepo
├ @anim/app -> /anim/: 진입점으로, 다른 패키지들의 호스팅 주소를 보여준다.
└ packages/
  ├ @anim/shared-modal -> /anim/shared-modal
  ├ @anim/multistep -> /anim/multistep
  ├ ...
```

이를 구성하기 위해 Github Actions과 Github Pages를 활용하기로 했다.

### Github Pages

Github Pages는 Github에서 제공하는 무료 호스팅이다. 이를 구성하기 위한 원천(source)은 두 가지 타입이 있다.

- Github Actions
- 브랜치로부터 배포(Deploy from a Branch)

아주 예전엔 브랜치를 통한 배포만 있었던 것 같은데, 어느새 이는 좋게 말해 Classic, 나쁘게 말해 Legacy 방식이 된 것으로 보인다. 브랜치로부터 배포하는 것은 정말 간단한 개념이다. 말 그대로 특정 브랜치의 파일 시스템을 그대로, 호스팅해준다.

내가 궁극적으로 구축하고자 한 것은 단순히 커밋과 푸시만 하면 CI/CD로 관리되는 것이었으므로, Github Actions를 활용하는 것이 더 적절해보인다.

### Github Actions

Github Actions를 통한 배포는 Github Actions의 개념을 알아야 하는데, 간단히 말하면 Github Actions이라는, 깃허브 서버 측 빌드 툴을 이용하는 것이다. 일종의 Serverless function이라 생각해도 무리는 없을 것 같다.

Github Actions는 CI/CD(지속 통합/지속 배포)를 목적으로 하는 플랫폼이고, 이를 통해 build-test-deployment 파이프라인을 구성할 수 있다. 참고로 리눅스, 윈도우, 맥 가상 머신을 모두 제공해준다!

Github Actions는 특정 이벤트에 의해 트리거링된다. 예컨대, 이슈가 등록될 때마다 작동하는 작업을 부여할 수도 있고, 새로운 커밋이 푸시될 때마다 작동하는 작업을 부여할 수도 있다. 흔히 정적 페이지로만 이뤄진 블로그(Astro, Jekyll 등)를 배포할 때는 새로운 커밋이 푸시될 때마다 빌드가 이뤄지고, 빌드된 결과를 배포해주는 액션을 일반적으로 사용한다.

#### Github Actions의 주요 개념

![](https://docs.github.com/assets/cb-25535/mw-1440/images/help/actions/overview-actions-simple.webp)

**Workflow**

하나 이상의 작업을 실행하는, 구성 가능한 자동화된 프로세스이다. 말이 좀 복잡하지만 결국 Github Actions ‘구성’의 단위라 생각하면 된다. 즉, 하나의 Workflow는 하나의 YAML로 기술된다. 그 안에서 작업(job)은 여러 개가 될 수도 있다. 다만, 하나의 이벤트에 해당 작업들이 함께 트리거링된다.

`./.github/workflows/` 하위에 `*.yaml`로 존재한다.

**Events**, **Jobs**

말 그대로 각각 트리거링되는 조건과, 실제 하는 동작이다.

**Runner**

Workflow가 트리거링되었을 때 실제 실행되는 ‘서버’를 일컫는다.

### Github Actions로 Github Pages 배포 워크플로

Github Actions로 Github Pages를 배포하는 워크플로의 흐름은 다음과 같다.

1. 빌드 후 업로드
	1. 당연히, 빌드!
	2. 빌드된 파일을 Github Pages Artifact에 업로드해야 한다. 보통 `actions/upload-pages-artifact`를 가져와 사용한다.
2. 배포
	1. Github Pages Artifact에 업로드된 파일들을 기반으로 Github Pages로 배포한다. 보통 `actions/deploy-pages`를 가져와 사용한다.

### 내가 필요로 하는 작업

빌드는 루트에서 `pnpm run build` 하면 turborepo에 의해 전체가 빌드된다. (다만, 현재는 캐싱을 이용하지 않았는데, 이후 이용해야 특정 패키지만 다시 빌드하는 식의 전개가 가능할 듯 하다. 또는 워크플로 자체를 하위 패키지별로 트리거링되도록 하거나.) 그렇다면 내가 이 워크플로에서 변형해야 할 부분은 무엇일까? 

바로, 하위 패키지들의 `{package_name}/dist`를 루트의 `dist/{package_name}`으로 옮겨야 한다는 것이었다.

이는 그냥 리눅스 명령줄로 해결했다. (스크립트 파일로 구성해도 될 것이다!)

먼저, 인덱스 패키지(`@anim/app`)의 `dist`를 루트의 `dist`로 그대로 이동시킨다.

```sh
mv ./app/dist ./dist
```

그 다음, 하위 패키지들의 `{package_name}/dist`를 루트의 `dist/{package_name}`으로 이동시킨다. 이때, `{package_name}`이 유지되어야 하기 때문에 `find`를 이용해 경로를 탐색하고, 파이프라인(`|`)으로 이동 명령을 작성했다.

```sh
find ./packages -type d -name dist | while read dir; do package_name=$(basename $(dirname "$dir")) mv "$dir" "./dist/$package_name" done
```

위 명령줄은 다음과 같이 해설할 수 있을 것이다.

- `./packages` 하위에서 `dist`라는 이름의 디렉터리들을 찾아내고,
- 찾아낸 디렉터리들을 순회하며
	- `basename`, `dirname`을 통해 해당 디렉터리의 이름, 즉 `package_name`을 찾아낸다.
	- 해당 디렉터리를 `./dist/{package_name}`으로 이동시킨다.

# 결과

아래는 내가 작성한 Workflow 파일의 전문이다.

```yaml
# author: hoqn<akzm9999@gmail.com> = Hogyun Jeon

name: Deploy Monorepo to GitHub Pages
run-name: ${{ github.run_id }} 빌드 및 배포

#### app 패키지는 루트에,
#### packages/* 패키지는 하위에 위치시키도록 해야 한다.
### 이를 관리하기 쉽게 환경 변수로서 지정
env:
  BASE_PATH: "."
  INDEX_APP_PATH: "./app"
  SUBPACKAGES_PATH: "./packages"

on:
  # main 브랜치에 푸시될 때마다 트리거링
  push:
    branches: [main]
  # 또는 메뉴를 통해 수동으로 트리거링
  workflow_dispatch:

# 권한 설정; 서버에서 레포를 클론하고 페이지 배포가 가능하도록
permissions:
  contents: read
  pages: write
  id-token: write

jobs:

  build:
    name: 빌드 # ~~및 테스트~~는 스킵하자
    runs-on: ubuntu-latest
    steps:
      # git으로 해당 레포 체크아웃
      - name: Checkout
        uses: actions/checkout@v4

      # node.js 환경 구축
      # - name: Setup Node.js Env.
      #   uses: actions/setup-node@v4
      #   with:
      #     node-version: 20
      #     cache: pnpm

      - name: Setup PNPM
        uses: pnpm/action-setup@v4

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm run build

      # 결과물을 Github Pages 아티팩트에 업로드해야 한다

      # 그 전에, 각각 하위 패키지의 빌드 결과물을 옮긴다
      - name: Ensure dist dir
        run: mkdir -p ${{ env.BASE_PATH }}/dist
      - name: Move index-package's builds to root
        run: mv ${{ env.INDEX_APP_PATH }}/dist ${{ env.BASE_PATH }}/dist
      - name: Move sub-packages' builds to root
        run: |
          find ${{ env.SUBPACKAGES_PATH }} -type d -name dist | while read dir; do \
            package_name=$(basename $(dirname "$dir"))
            mv "$dir" "${{ env.BASE_PATH }}/dist/$package_name"
          done
      # 이제 업로드
      - name: Upload to pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ env.BASE_PATH }}/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

![](monorepo-hosted-by-github-pages/3B26B12A625500FF34F1CA3EDEF0E537.png)

만족스러운 형식으로 배포되었다 :)