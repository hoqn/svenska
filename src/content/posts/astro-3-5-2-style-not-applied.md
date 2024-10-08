---
title: "Astro 3.5.2에서 스타일이 적용되지 않는 문제"
subtitle: "astro@3.5.x의 버그; 분석해서 issue에 제보해 기여한 경험"
created_at: 2023-11-11
tags:
  - Astro
---

블로그를 수정하다보니 요상한 일이 일어났다. 분명 방금까지만 해도 잘 적용됐던 스타일들이 갑자기 전혀 동작하지 않는 것이다. 대체 무슨 일일까 싶어 몇 시간 동안 뭐가 문제일까 찾아보았다.

#### 분석

일단, 문제가 생기는 특징은 아래와 같았다.

- `*.md`로 구성된 페이지는 정상적으로 렌더링되었다.
- `*.astro`로 구성된, `Collection`을 불러오는 페이지는 스타일이 전혀 적용되지 않았다.
- `*.astro`로 구성되었지만, `Collection`을 불러오지 않고 정적인 페이지는 정상적으로 렌더링되었다.

즉, 그 페이지를 렌더링하기 위해 사전 작업이 필요한 페이지는 스타일이 적용되지 않았고, 페이지를 렌더링하기 위해 사전 작업이 필요없이 그대로 HTML로 변환만 하면 되는 페이지는 스타일이 문제 없이 적용되었다.

무엇이 문제일까… Astro 레포지토리의 이슈도 체크해보고 이것저것 다 만져봤지만, 해결되지 않았다.

#### 결론

`^3.3.4`라서 패키지 매니저를 교체하는 과정에서 `3.5.2`로 업데이트됐는데… 혹시나 해서 `3.3.4`로 다시 내려보니 잘 된다…

## Issue로 제보

astro에 [이슈](https://github.com/withastro/astro/issues/9066)로 남겼다. 이 내가 앞서 분석한 내용을 최대한 내용에 포함시켜 제보하였다.

+) 놀랍게도, 불과 몇 시간 만에 해당 문제 원인 파악하고 수정해주셨다! `3.5.3` 업데이트에 포함된다고 한다.
