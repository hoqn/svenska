---
title: Makeju
icon: 🍺
start_date: 2024. 01. 06.
end_date: 2024. 01. 07.
stacks:
  - TypeScript
  - React
  - Next.js
links:
  데모사이트: "https://makeju.vercel.app"
  소스코드: "https://github.com/hoqn/makeju"
---

> [!info] 정보
>
> - 레포 깃허브: https://github.com/hoqn/makeju

> 단기(2일)로 진행한 개인 프로젝트예요.

# 1. 프로젝트 소개

단기로 진행한 프로젝트이다. 평소 관심 있는 맥주 관련해서 색을 나타내는 수치(SRM)가 존재한다는 것에서 착안하여 맥주의 색을 가상으로 정해주는 미니 서비스.

# 2. 계획

사실 어떤 엄청난 목적이나 성장을 위해서 프로젝트를 해본다기보단 그냥 도전이었다. 사실, 나는 속도가 매우 느리다. 물론 그 덕에 퀄리티가 괜찮을 때도 있지만 너무 비효율적이고 큰 그림에서는 오히려 뒤쳐지는 듯하게 느껴졌다.

그래서 억지로라도 빠르게 진행해보면 어떨까 싶었다. 무리하게 단 하루를 잡았다. 아이디어 탐색, 기획, 개발, 문서화 모두.

(하루는 불가능했다 :) 또한 문서 초안까지 이틀 걸렸는데, 문서도 이후 수정이 필요했다)

## 2.1. 환경

#### 개발 환경

- 웹 프런트엔드: `TypeScript` `React` `Next.js`
- 스타일링: `tailwindcss` `css`
- 전역 상태: `zustand`
- 기타: `@radix-ui/slot`

## 2.2. 역할과 책임

개인 프로젝트이기 때문에 혼자 진행하였다. Next.js를 이용한 MPA로 구성하였으며, 짧은 기간 안에 완성하기 위해 시간 관리를 최우선으로 두고 작업하였다.

# 3. 결과물

재료 선택

![](./makeju/ss-a.png)

완성 페이지

맥주잔의 외형, 따르는 애니메이션, 잔의 회전은 모두 순수 css로 구현하였다. (물론 마우스의 좌표 등은 js에서 inline style로 css variable 형태로 넘겨줬다)

![](./makeju/ss-b1.jpg)
![](./makeju/ss-b2.gif)
![](./makeju/ss-b3.gif)

# 4. 회고 및 배운 점

## 4.1. 아쉬운 점

처음부터 기간을 짧게 잡고 기획부터 조사, 개발까지 진행하였기 때문에 고민하는 시간들을 많이 가지진 못하였다.

### 4.1.1. 더 계획적인 상태 관리 필요

개발하면서 계속 상태 관리 부분에서의 수정이 필요했다. 아무리 기간이 짧았다고 하더라도 전역 상태와 같은 전체 로직을 관통하는 부분은 더 엄밀한 계획이 필요할 것이다.

혼자 진행하였기 때문에 중간에 상태 관리(타입, 특정 기능 구현의 책임을 어디에 둘지 등)와 관련된 사항을 변경하는 게 코드 수정을 요할 뿐, 어렵진 않았다. 하지만 협업하는 환경에서는 이것은 매우 치명적으로 생산성을 떨어뜨릴 것이다. 따라서 더 엄밀하고 치밀한 계획을 사전에 세우는 것이 매우 중요하다는 것을 다시 한 번 느꼈다.

## 4.2. 트러블슈팅 & 고민

### 4.2.1. 적절한 Component Pattern

항상 React를 이용해왔지만, 고민되는 주제이다. 단순한 컴포넌트들은 상태의 관리는 상위 컴포넌트에 넘기고 props으로만 데이터를 받아 사용하면 된다.

하지만 조금 복잡하거나 비즈니스 로직을 직접적으로 활용하는 컴포넌트들의 경우 이게 참 난감하다. 외부에 상태 관리를 맏기자니 페이지 컴포넌트의 책임이 너무 커짐과 동시에 코드 자체도 읽기 어려워진다. 그렇다고 컴포넌트 내에서 어떤 상태를 관리하기엔 상위 컴포넌트에서 하위 컴포넌트로 접근을 아예 막게 된다. (양방향 바인딩이 되지 않는다)

한편, 보통 Component Pattern 하면 많이 언급되는 것이 Compound Component Pattern이다. 나도 이런 패턴을 좋아하지만, 솔직히 해당 컴포넌트를 사용하는 측의 책임이 너무 커지고 코드도 방대해지는 게 사실이다. 또한 이런 경우 Context나 전역 상태를 사용하는 경우가 많은데, 이는 컴포넌트가 너무 종속되는 결과가 나타날 수 있다고 생각한다.

나는 컴포넌트가 외부 맥락(Context)에 종속되는 게 좋은 것은 아니라 생각한다. 컴포넌트 그 자체로도 어느 정도 완결성이 있어야 한다. 또, 컴포넌트들은 정확히 자신에게 필요한 상태나 데이터만 접근할 수 있어야 이상적이라 생각한다. 하지만 상위에서 하위 컴포넌트로, 단방향으로만 상태가 전달되는 React에서는 (Flux와 같은 구조를 이용한다 하더라도) 한계가 있는 것 같다.

늘 고민하지만 정답이 무엇인지 모르겠다..는 마음과 함께 이번 프로젝트는 단기간에 완성하기로 한 만큼 현실적인 선택을 하였다. 컴포넌트의 Model과 View를 분리하는 느낌으로 별도 Hook을 제공하였다.

컴포넌트 자체는 아래와 같이 모두 props으로 전달 받는다. 여기에 직접 존재하는 상태는 상위 컴포넌트에서 전혀 사용될 필요 없이, UI 구성만을 위한 상태 뿐이다.

```ts
// beer-glass.tsx
export default function BrewMachine({ className, data, glassVolume = 100, beerVolume, isPouring = false }: Props) {
  // 오로지 화면 구성을 위한 상태라 Hook이 아닌 여기 위치시킴
  const [isPouringStart, setPouringStart] = useState<boolean>(false);

  ...

  return (
    <>
      <div
        className={twMerge("beer-glass w-full", className)}>
        ...
      </div>
    </>
  );
}
```

나머지 상태 또는 콜백들은 컴포넌트를 위한 별도의 Hook에 존재한다. 이때, 컴포넌트에 해당 Hook의 상태 또는 콜백들을 제공하기 쉽도록 `control` 필드도 제공해주었다. 이는 컴포넌트를 사용할 때 `<BeerGlass {...control} />`와 같이 spread 연산자로 제공하면 쉽게 사용 가능하다.

```ts
// beer-glass.hook.ts
export function useBeerGlass({
  glassVolume = 100,
  beer,
}: UseBeerGlassOptions) {
  const [isPouring, setPouring] = useState<boolean>(false);
  const [beerVolume, setBeerVolume] = useState<number>(0);

  ...

  const control = {
    data: beer,
    beerVolume,
    glassVolume,
    isPouring,
  };

  return {
    pourBeer,
    drainBeer,
    beerVolume,
    glassVolume,
    isPouring,
    control,
  };
}
```

사용하는 측에서 Hook을 호출하고 컴포넌트를 렌더링하면 된다.
