---
title: React Virtual DOM, 그리고 Fiber의 구조
created_at: 2024-10-06
edited_at: 2024-10-14
subtitle: 동작을 파해치기 이전, 구조만을 중심으로 파해쳐보기
tags:
  - Web
  - FE
  - React
series: react-deep
---
Virtual DOM은 구현체(Implementation) 차원의 개념이 아니에요. **실제 DOM과 별도의 객체를 통해 관리한다는 하나의 추상적인 개념(Concept)에 가까워요.**

그렇다면 React에서는 이걸 어떻게 구현하고 있을까요?

### React Element

먼저, **React 16 버전** 이전에는 React Element만 사용되었어요. React Element는 이름처럼 React의 엘리먼트를 나타내는 구조예요. `jsx` 형태가 변환하는, `createElement`가 반환하는 값이 바로 이것이에요.

```jsx
// jsx
<div>Hello World!</div>
// js
createElement("div", {}, "Hello World!");
```

React Element는 다음과 같은 속성을 가진 객체예요.

```ts
// @types/react
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: string | null;
}
```

React Element는 아주 중요한 특징이 있어요. 바로 **Immutable**하게 유지된다는 거예요! 단순히 **무엇을 리액트가 렌더링해야 할지**만 나타내는 객체에요.

여기에 추가적으로 `InternalInstance`라는 구조를 별도로 사용해, 실제 DOM 노드와 매핑하도록 처리하고 있어요.

```ts
// ! 아래는 내부적으로 사용되는 타입이라,
// ! @types/react, @types/react-dom에 선언되어 있지 않아요.
// ! 아래는 제가 코드를 보고 직접 추정한 속성이예요. 부정확한 속성일 수 있어요!
interface InternalInstance {
  _currentElement: ReactElement;
  _renderedComponent: Node;
  _instance: unknown;
  _pendingCallbacks: unknown[];
  _pendingForceUpdate: unknown;
  // ...
}
```

React 16 이전엔, 이와 같은 구조만을 활용해 트리를 새로 생성하고, 이전 트리와 비교했어요. 이 시기의 재조정을 **Stack Reconciliation**이라고 해요.

### Fiber

React 16 이후로는 **Fiber**라는 개념이 등장했어요. 새로 등장한 이 구조를 기반으로 Reconciliation가 다시 구현되었어요.

> [!note]
> Fiber 아키텍처가 등장한 이유로는 비동기적으로, 또 우선순위를 고려하여 유연한 렌더링 스케줄링이 이뤄질 수 있도록 한 게 더 커요. 하지만, 지금은 형태에 대해서만 살펴볼게요.
> 

Fiber의 노드 구조는 앞서 살펴본 React Element와 `InternalInstance`가 합쳐진 느낌이에요. React Element보다 더 많은 내용을 담고 있어요. 하는 역할은 `InternalInstance`와 더 유사하면서도, React Element가 가지고 있는 속성들을 더 가지고 있어요.

```js
// react
function FiberNode(
  this: $FlowFixMe,
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag; // 노드의 타입을 enum 정수로 나타내요. e.g. FunctionComponent, HostComponent
  this.key = key;
  this.elementType = null; // JSX 타입을 나타내요. e.g. div, MyComponent
  this.type = null; // 컴포넌트 타입을 나타내요. e.g. MyComponent
  this.stateNode = null; // 실제 렌더링된 요소를 나타내요. 즉, 컴포넌트의 인스턴스 또는 DOM 노드를 가리켜요.

  // Fiber
  // 다음은 트리 형태의 Fiber 구조를 나타내기 위해 사용돼요.
  this.return = null; // 부모 노드를 가리켜요
  this.child = null; // 첫 자식 노드를 가리켜요
  this.sibling = null; // 다음 형제 노드를 가리켜요
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}
```

React Element가 나타내던 type과 props 같은 정보도 가지고 있으면서도, `stateNode` 같은 속성은 `InternalInstance`가 담고 있던 내용과 비슷하네요! 이런 속성은 뒤로 하고, Fiber 구조와 Reconiliation 과정 자체와 관련된 속성을 살펴볼게요.

**return, child, sibling**

모두 트리 구조를 표현하기 위한 속성이에요. 특이한 점이 하나 있네요. 자식 노드를 여러 개 연결하고 있지 않고, 첫 자식 노드만 연결하고 다음으로 올 형제 노드를 연결해주고 있어요. 이런 표현은 [Left-child Right-sibling 표현](https://en.wikipedia.org/wiki/Left-child_right-sibling_binary_tree) 에 위로 거슬러 올라갈 수 있는 return 간선을 추가한 것으로 볼 수 있겠네요.

**alternate**

Reconciliation 과정에서 Fiber 트리의 이전(또는 다음) 상태를 가리켜요. 두 상태의 노드가 `alternate` 속성을 통해 서로를 가리키는 형태가 돼요.

**lanes, childLanes**

작업의 우선순위를 관리하기 위한 속성이에요. 단, 이 글에서는 형태만 다루기 위해 자세히 다루지 않을게요. 앞서 언급했듯, Fiber가 도입된 것은 우선순위 고려를 비롯해, Concurrent Mode와 같은 스케줄링 관련 기능을 강화하기 위함이 더 커요.

**stateNode**

실제 렌더링된 요소를 가리켜요. 일반적인 `react-dom` 환경에서는 대체로 브라우저의 실제 DOM Node를 가리켜요.

### Fiber는 React Element를 대체한 것인가요?

결론부터 말하면, 아닙니다! 둘은 공존하고, 또 비슷해 보이지만 완전히 다른 성격을 가지고 있어요.

- React Element: 가상 DOM 트리의 구조를 나타냅니다. 변할 수 없다는 특징이 있어요(**Immutable**).
- Fiber: 작업의 단위(a unit of work)를 나타냅니다. 작업의 흐름에 따라서 변할 수 있어요(**Mutable**).

## 마무리

구조를 중심으로, 가상 DOM과 Fiber를 살펴보았어요. 구조를 먼저 파악해야 다음 단계로 나아가기 수월한 경우가 많은데요, 그렇기 때문에 구조에만 집중한 글을 작성해보았어요.

하지만 실제로 중요한 것은 바로 렌더링 단계인데요, 이건 주제 특성상 이 글에서 다루기 힘들 것 같아 다른 글에서 다뤄볼게요. 특히, Fiber가 등장하게 된 건 구조적인 문제를 해결하려 했다기보단 렌더링 성능을 개선하는 게 가장 컸던 만큼, 다음 글을 꼭 읽어봐주셨으면 좋겠습니다!




