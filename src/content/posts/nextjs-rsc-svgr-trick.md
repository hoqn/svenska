---
title: "Next.js Server Component에서 SVGR 정상적으로 사용하기"
subtitle: "약간의 트릭"
created_at: 2023-10-18
draft: true
---

Next.js 13 app router를 이용하다 보니 발생한 문제다. SVG 파일을 컴포넌트로 쓰기 편하도록 `svgr`를 사용하는데, 자꾸 오류가 발생했다. `unexpected token` 오류가 나오는 것을 보아 로더 자체로 넘어가질 않는 것 같았다.

Webpack 쪽 설정은 아래와 같았다.

```js
webpack(config) {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.svg$/i,
      use: [
        {
          loader: "@svgr/webpack",
          ...
        }
      ]
    }
    ...
  ]

  return config;
}
```

### 해결법 1

정확한 이유는 모르겠으나, `/\.svg$/i` test 자체가 안 걸린다. `*.svg?svgr` 처럼 사용하도록 우회적으로 설정해주면 된다.


[[Next.js 13.3.0] Upgrade breaks `@svgr/webpack` in appDir · Issue #48177 · vercel/next.js · GitHub](https://github.com/vercel/next.js/issues/48177#issuecomment-1505293111)


