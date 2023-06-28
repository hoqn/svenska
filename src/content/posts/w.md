---
title: "Svelte Kit 적용"
toc: true
created_at: 2023-06-22
edited_at: 2023-06-22
categories:
  - Web FE
  - Svelte
tags:
  - Svelte
  - SvelteKit
---

SvelteKit에는 `src/routes/` 하위 경로에 따라 라우팅을 해주는 기능이 들어가 있다. 이를 이용하기 위해 SvelteKit을 적용하기로 했다.

## 방법 1. template 사용해 새로운 프로젝트 생성

가장 간단한 방법이다. 이제 새로 시작하는 프로젝트인데, `src/routes`를 활성화하고 싶다면 SvelteKit 홈페이지에 소개된 `npm create svelte@latest my-app`보다는 아래와 같이 템플릿을 사용하는 것이 제일 마음 편하다.
```
npx degit sveltejs/template my-svelte-project
```

## 방법 2. 기존(또는 새로운) 프로젝트에 적용시키기

사실 방법 1은 편한 방법일 뿐, 어떤 식으로 `src/routes/`를 활성화할 수 있는지에 대한 근본적인 질문에는 답을 할 수 없다. 또한 내 상황에서 기존 프로젝트에 적용하는 것이 필요했다. (처음엔 SPA로 기획했던 프로젝트에서 간단한 routing이 필요했다.)

__답은 아주 간단하다. `vite.config.js`에서 sveltekit을 플러그인으로 추가해주면 된다.__

나 같은 경우엔 `@sveltejs/vite-plugin-svelte`로 추가되어 있어 이를 sveltekit으로 교체하였다.

```js
import { defineConfig } from 'vite'
//import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  }
})
```

끝.