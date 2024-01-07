---
title: Makeju
icon: 🍺
start_date: 2024. 01. 06.
end_date: 2024. 01. 07.
stacks:
  - TypeScript
  - React
  - Next.js
---

> [!info] 정보
> 
> - 레포 깃허브: https://github.com/hoqn/makeju

> 단기(2일)로 진행한 개인 프로젝트예요.

# 1. 프로젝트 소개

# 2. 계획

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

<img src="https://private-user-images.githubusercontent.com/4702412/294753622-7a97a5da-b941-4501-bfe4-ec5b886e789b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ2NTI0MzAsIm5iZiI6MTcwNDY1MjEzMCwicGF0aCI6Ii80NzAyNDEyLzI5NDc1MzYyMi03YTk3YTVkYS1iOTQxLTQ1MDEtYmZlNC1lYzViODg2ZTc4OWIucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDEwNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAxMDdUMTgyODUwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YTAwMDZkODg3MmNhMmIxNjM5NjllMDczMTdjYWMyNjhiNzE1ZGYyMjNmYmIwMTI0MWJhZjFmMjhiYjFkYmRlZCZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.70VbhaTtrJQkrSqWtaRC4fHl3zgXhrK999rkUNn_-7M" width="256"/>

완성 페이지

맥주잔의 외형, 따르는 애니메이션, 잔의 회전은 모두 순수 css로 구현하였다. (물론 마우스의 좌표 등은 js에서 inline style로 css variable 형태로 넘겨줬다)

<img src="https://private-user-images.githubusercontent.com/4702412/294755641-ffcd5c44-3e3a-4e63-a957-c2aba9561e5f.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ2NTI0MzAsIm5iZiI6MTcwNDY1MjEzMCwicGF0aCI6Ii80NzAyNDEyLzI5NDc1NTY0MS1mZmNkNWM0NC0zZTNhLTRlNjMtYTk1Ny1jMmFiYTk1NjFlNWYuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDEwNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAxMDdUMTgyODUwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MzEwOTMzNDNjNzhjYjhmOWMwM2Y2ZDU2ZTFkODEyMjY3MTZhNTRjZWExN2FmNjA1YTc4MzZlNGEyNGM3ZWUzZSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.DjLOyNlZ5AyKsMQBIFTcTA8thvlLzgdrIoOgM3IwDBw" width="256"/>
<img src="https://private-user-images.githubusercontent.com/4702412/294755355-af984474-cbc7-45d8-9295-f41446b70191.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ2NTI0MzAsIm5iZiI6MTcwNDY1MjEzMCwicGF0aCI6Ii80NzAyNDEyLzI5NDc1NTM1NS1hZjk4NDQ3NC1jYmM3LTQ1ZDgtOTI5NS1mNDE0NDZiNzAxOTEuZ2lmP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDEwNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAxMDdUMTgyODUwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YmE2NjhhOGE0NjRiMzEwNmE3N2Q1YjI0OTIwOGU2NWU4YjZiYmQxM2Y1MzUzMDgxNTg2MDM1MjIwYzk5YWY4NiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.No9GP3M1t7cOQV44jZjn9a7TYr_0sUqqdam5-iwMt4A" width="256"/>
<img src="https://private-user-images.githubusercontent.com/4702412/294755549-068a1ac4-0e7a-4bba-8475-87b1aec8bb57.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDQ2NTI0MzAsIm5iZiI6MTcwNDY1MjEzMCwicGF0aCI6Ii80NzAyNDEyLzI5NDc1NTU0OS0wNjhhMWFjNC0wZTdhLTRiYmEtODQ3NS04N2IxYWVjOGJiNTcuZ2lmP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDEwNyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAxMDdUMTgyODUwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9NTZhNGE4OWI0MmUxYTdkYzczMjE3MDlhODI5MDA4NGUwNjUzZGU4YmRhNmE2ODc2OTM4YzRlY2E3NmRlMmU5YiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.GKUB1iJr4KCQTLH-rN5GVoqG4Ccu-j9IEOJbVqrYqRU" width="256"/>

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

아직은 뭐가 맞는지 모르겠는 주니어주니어주니어주니어개발자이다..
