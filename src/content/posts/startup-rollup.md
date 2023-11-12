---
title: "Rollup 시작하기"
subtitle: "Startup Rollup"
created_at: 2023-08-14
draft: true
---

Rollup, 많이 들어보았지만 감히 사용하지 못하고 있던 번들러이다. 하지만 라이브러리 배포 시 많이 사용된다는 점 때문에 알아두어야 할 필요가 있다 생각해 조사하고 적용해보았다.

### Rollup?

근본적으로, 롤업(Rollup)은 번들러(Bundler)이다. 흔히 잘 알려진 번들러로 웹팩(Webpack)이 있다. 번들러가 필요한 경우 기본적으로 웹팩을 사용한다고 생각해도 될 정도로 많이 사용되고 있다. 그렇다면 더 널리 사용되는 웹팩 대신 롤업을 사용해야 할 이유는 무엇인가? 롤업의 공식 사이트에서는 다음과 같은 기능을 내세우고 있다.

- 롤업은 ESM, commonJS, UMD 등 많은 출력 포맷을 지원한다.
  
  - 웹팩은 기본적으로 commonJS 포맷으로의 출력만 지원'했'다. (v5부터는 ES6로의 출력 지원)

- 트리 셰이킹이 가능하다.
  
  - 내부적으로 commonJS를 사용하는 웹팩과 달리 롤업은 기본적으로 ES6를 사용하기 때문에 트리 셰이킹이 제대로 이뤄진다. 번들링의 출력으로 실제 사용되는 모듈만 포함된다.

- 오버헤드 없이 코드 스플리팅을 할 수 있다.

- 강력한 플러그인
  
  - 참고로 비트(Vite)도 롤업의 플러그인 인터페이스를 그대로 사용한다. 그렇기 때문에 일부는 서로 호환된다. 그만큼 롤업의 플러그인 인터페이스가 잘 짜여져 있다는 것이다!

아무래도 ES6를 기본으로 한다는 점, 또 그로 인해 트리 셰이킹이 제대로 이뤄진다는 점 때문에 라이브러리 빌드 시 롤업을 보통 사용하게 된다.

### 설치

전역으로 설치

```shell
# 전역 설치
pnpm add -g rollup

# 프로젝트 로컬 설치
pnpm add -D rollup
```

난 로컬 설치만 하는 것을 선호한다. (전역 설치하더라도 프로젝트에 버전 명시해두는 것을 추천한다. 어차피 빌드 스크립트를 롤업 명령어 기반으로 작성할 것이다.)

### 사용

#### 스크립트(명령어)

번들링에 롤업을 사용하는 가장 간단한 방법은 다음과 같다.

```shell
rollup input.js --file output.js --format cjs
```

`rollup` 명령어의 플래그 중 다음은 알아둘 필요가 있다.

- `-c`, `--config`: 설정 파일을 사용하겠다는 뜻으로, 프로젝트의 루트에 위치한 `rollup.config.js`을 사용하게 된다.

- `-w`, `--watch`: 변경 사항이 있을 때마다 자동으로 빌드하는, 즉 워칭 옵션이다.

보통 개발 시엔 `rollup -cw`와 같이 워칭 옵션으로 빌드하고, 배포를 위한 빌드 시엔 `rollup -c`로 빌드하면 큰 문제 없을 것 같다.

#### 설정 파일(`rollup.config.js`)

앞서 `-c` 플래그의 설명에 나타나 있듯이, 롤업의 설정 파일은 기본적으로 프로젝트의 루트에 `rollup.config.js` 파일을 사용한다. [공식 문서](https://rollupjs.org/command-line-interface/#configuration-files)에서 전체적인 내용을 확인할 수 있다.

```js
// rollup.config.js

export default {
	input: 'src/main.js', // 입력 진입 경로
	output: {
		file: 'bundle.js', // 출력 경로
		format: 'es' // 출력 형식 e.g.) cjs, es
	}
};
```



[Rollup 기반 라이브러리 개발 환경 구성하기 - 재그지그의 개발 블로그 (wormwlrm.github.io)](https://wormwlrm.github.io/2021/11/07/Rollup-React-TypeScript.html)










