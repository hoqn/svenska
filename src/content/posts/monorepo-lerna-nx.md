---
title: "모노레포 환경 구축하기 (ft. Lerna + Nx)"
subtitle: "모노모노"
created_at: 2023-06-21
edited_at: 2023-06-21
tags:
- Web FE
draft: true
---

# 모노레포 환경 구축하기 (feat. Lerna + Nx)

내가 원하는 레포지토리의 최종 구조는 다음과 같다. (`*`를 한 것이 하위 패키지의 루트)

```
.
├── packages
│   ├── core
│   │   └── common *
│   └── react
│       ├── components *
│       └── theme *
├── tsconfig.json
└── rollup.config.js
```

## 모노레포를 구성하기 위한 라이브러리

모노레포를 구성하는 데 사용되는 라이브러리(혹은 프레임워크)는 `Lerna + Nx`, `Turborepo`, 그리고 `Rush` 정도가 많이 언급되고 있었다.

Lerna의 경우 이전에 신규 개발 및 유지보수가 아예 중지된다고 들었어서 Turborepo를 도입해야 하나 싶었다. 하지만 Lerna가 Nx의 개발사에 의해 계속 유지된다고 한다! 그래도 Vercel의 Turborepo도 무시할 수 없었기에 고민을 많이 해보았다. (Rush는 사용자가 많지 않고, 오픈소스에서 많이 사용되지 않아 논외였다)

최종적으로 정한 것은 `Lerna + Nx` 조합이었다. Nx의 개발사가 Lerna를 관리하기 때문인지는 몰라도, 이 조합은 매우 흔하고 Lerna의 공식 문서에서도 추천하고 있다.

일단 해보자!

## Root

일단, 루트 경로 상의 설정 파일들을 공유하고 싶었다. 예컨대, `tsconfig.json`와 같은.. 나는 TypeScript를 사실상 필수적으로 이용하기 때문에 `tsconfig.json`가 공유되는 것은 매우 중요한 부분이다. 또한 번들을 위해 `rollup.config.js`와 같은 파일도 공유되면 좋을 것 같다.

### Lerna, Run!!

가장 기본적인 Lerna의 명령어로는 `lerna run <script>`가 있다. 이는 하위 패키지들에 대해 `script`를 실행시켜준다. `npm run`와 거의 같으니 뭐.. 간단하다!

```shell
lerna run build
```

아래와 같이 하면, 여러 스크립트를 동시에 실행할 수 있다.

```shell
lerna run test,build,lint
```

만약 특정 패키지에 대해서만 실행하고 싶다면 아래와 같이 하면 된다.

```shell
lerna run build --scope=minipack
```

이 내용은 모두 [공식 문서](https://lerna.js.org/docs/features/run-tasks)에 있다.

### Nx?

Lerna로 모노레포를 구성한다는 건 알겠다. 근데 `Nx`는 무엇이길래 같이 언급되고 또 같이 사용되는 것일까?



[[DS] Monorepo 환경에서 디자인시스템 구축 I | SONGC](https://blog.songc.io/react/design-system-1/)
