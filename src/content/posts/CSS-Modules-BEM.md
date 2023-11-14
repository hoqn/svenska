---
title: "CSS Modules에서 BEM 깔끔하게 사용하기"
subtitle: "보다 구조적으로!"
created_at: 2023-06-21
edited_at: 2023-11-10
---

나는 CSS를 그대로 사용하는 것을 좋아한다. React를 사용하면서 Styled-Component나 Emotion과 같은 CSS-in-JS 라이브러리들이 큰 인기를 끌었고 많이 사용되었지만, 나는 여전히 CSS에 기반을 둔 방법을 가장 좋아한다. 물론 CSS를 생(?)으로 사용하기엔 기능적인 측면이나, 호환성 측면에서 부족한 점이 많기 때문에 Sass와 같은 대체 언어와 Postcss를 애용한다.

### CSS Modules

특히, React에선 CSS Modules가 있어서 주로 그 형태를 이용한다. CSS Modules는 컴포넌트 기반으로 개발하는 요즘 시대의 프론트엔드 환경과 매우 좋은 궁합을 가지고 있다고 생각한다. 하지만 CSS Modules의 단점도 있다고 생각한다. 다음은 내가 느끼는 단점들이다.

##### CSS 클래스 네이밍과 js 네이밍 컨벤션의 차이

순수한 html과 css는 네이밍에 `kebab-case`를 일반적으로 적용한다. 반면, js는 네이밍에 `camelCase`를 일반적으로 적용한다. CSS Modules는 \*.css 파일에 대해 각 클래스 이름들에 대한 매핑 json을 생성해준다. 따라서 js에서는 단순한 `object`를 다루는 것과 다를 것이 없는 것이다.  그래서 css에서 `my-button`과 같이 클래스 이름을 지었다면, js에선 `styles["my-button"]`과 같이 사용해야 한다. 개인적으로 깔끔해보이진 않는다. 이것에 대한 해결 방법은 물론 있다. 보통 두 가지로 해결한다.

- 애초에 css에서 클래스 이름을 `camelCase`로 구성한다.

- `css-loader`의 옵션 중 `localsConvention`을 설정해준다.

첫 번째 해결법은 조금 괴상(?)하다고 느꼈기 때문에 두 번째 해결법을 주로 사용했다. 충분히 만족스러운 해결법이다!

##### CSS 파일을 따로 구성하지만, 결국 js에 종속되는 경우가 발생

나는 이것이 불편했다. CSS를 module로서 사용하지만, 여전히 css 파일이 독립적이었음 좋겠다는 생각이 들었다. 그래서 css는 BEM과 같은 방법론으로 작성하면서, js에서는 보다 자연스럽게 작성할 수 있음 좋겠다는 생각이 들었다. 어차피, CSS Modules 자체가 클래스 이름을 매핑해주는 json을 생성해주는 거 아닌가? 하는 생각과 함께 그 과정을 조금 손대면 더 나은 결과가 나올 것 같았다.

### 비슷한 라이브러리

나와 비슷한 고민을 가진 사람이 있지 않을까 하고 찾아보았다. 너무 훌륭한 방법들이 이미 많이 존재했다!

#### CVA(Class Variance Authority)

CSS Modules만을 위한 방법은 아니다. 클래스 이름을 각 variant에 맞게 반환해주는 유틸 함수라고 할 수 있다.

```js
const $button = cva("button", {
  variants: {
    intent: {
      primary: "button--primary",
      secondary: "button--secondary",
    },
    size: {
      sm: "button--sm",
      md: "button--md",
      lg: "button--lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  }
});

// 사용 시
$button({ intent: "secondary", size: "lg" });
// <=> "button button--secondary button--lg" 

```

이런 식으로 활용할 수 있다! 정말 깔끔한 방법이라 생각한다. 심지어 BEM 말고 Tailwind와 같은 방법론과도 호환되기 아주 좋다. 사실 비슷한 라이브러리를 직접 작성하려다 이미 이런 훌륭한 라이브러리가 있음을 알고 포기하기도 하였다.

#### 생성되는 json 파일 자체를 바꿔버리기 (Webpack Loader로 구현)

사실, json 파일 자체를 BEM스럽게 바꾸면 재미있겠다는 생각이 들어 구현하기 위해 검색을 하던 중 아래와 같은 재미있는 글을 발견했다.

https://medium.com/trabe/using-bem-conventions-in-css-modules-leveraging-custom-webpack-loaders-fd985f72bcb2

멋지다! 커스텀한 Webpack Loader로 생성되는 json 자체를 nested하게 바꾼다.

직접 이 방법을 적용해보았는데, 문제가 있긴 했다. `toString` 멤버를 이용해 문자열로 변환하는데, 문제는 자동으로 `toString()`이 호출되는 경우엔 문제 없지만 본질적으로 `string`이 아니라 `object`라는 것이었다.
이것은 `clsx`나 `classnames` 같은 유틸 함수를 사용할 때 문제가 되었으며, 동시에 TypeScript와의 궁합에도 좋지 않았다.

따라서 위 방법대로 하되, `toString` 멤버를 선언해서 변환하지 말고 그냥 `button.base`와 같은 방식으로 구현해야 하지 않을까 싶다.

재미있는 방법이지만 `CVA`에 비해 효율적이라고는 못하겠다. `primary small button` 버튼을 가리킨다고 쳐보자. 그렇다면 아래와 같이 클래스 이름이 작성되어야 한다.

```js
className="button button--primary button--small"
```

이것을 `CVA`에선 `button({ intent: "primary", size: "small" })`과 같은 방법으로 쓸 수 있다. `CSS` 상의 원래 변수를 생각할 것 없이 그냥 `js` 유틸 함수를 사용하는 느낌과 같다.

반면, 위 방법에선 `styles.button`, `styles.button.$small`, `styles.button.$primary`와 같이 세 개를 각각 작성해야 한다. 결국 `js`스럽지 않고 `CSS` 내지는 `HTML` 스럽게 작성하게 된다.


<!-- ### 그런데...

어차피 BEM 방법론만 사용할 거라면, CSS Modules 구현체가 생성하는 과정에서 비슷한 코드를 자동으로 생성해주면 더 좋지 않을까? 예컨대 다음과 같은 방식이다.

```css
/* button.module.css */
.button {
  ...
}

.button--primary {
  ...
}

.button--md {
  ...
}

.button__label {
  ...
}

.button__label--light {
  ...
}
```

```js
// button.jsx
import $ from "./button.module.css";

$.button; // "button"
$.button("primary", "md"); // "button button--primary button--md"
$.button.label("light"); // "button__label--light"
```

그렇다면 생성되어야 하는 코드는 아래와 같다.

```js
const styleSheet = function() {
  
}
styleSheet.toString() = () => "button";

styleSheet.label = () => {
  
}
``` -->

