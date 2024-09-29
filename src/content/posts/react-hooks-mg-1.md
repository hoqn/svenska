---
title: React의 Hooks는 어떻게 동작하는 걸까요?
subtitle: 직접 만들어보며 분석하는, React Hooks - 1
created_at: 2024-09-29T00:00:00
tags:
  - Web
  - FE
  - React
---
> React Hooks은 마법이 아니에요

제가 React Hooks를 처음 접했을 때, 마치 마법 같이 느껴졌습니다. 아마 많은 분들이 비슷하게 느꼈을 것 같습니다.

기존 클래스형 컴포넌트에서 `this.state`는, 그 인스턴스의 하위 속성으로 가지고 있으니 특별히 신기할 게 없었습니다. 반면, 함수형 컴포넌트에서 사용되는 `useState`는 대체 어디에 저장되고, 어떻게 유지되는 걸까요? 심지어 함수형 컴포넌트는 재렌더링 시마다 다시 실행되는데, 그렇다면 `useState`와 같은 훅도 다시 실행되는 것일텐데, 어떻게 그 값이 유지될 수 있는 걸까요? 마법과 같은 부분이 있는데, 반면 동시에 [이런 특이한 조건들](https://react.dev/reference/rules/rules-of-hooks)이 있다는 것은 더욱 갸우뚱하게 만들었습니다.

저와 같은 호기심을 가진 분들을 위해, 간단하게 React Hooks의 동작 방법을 분석해보았습니다. 이를 직접 따라 구현해보며 따라가봅시다!

> 아래부터는 React Hooks을 ‘훅’이라고 표현할게요

# 리액트 살펴보기

## 훅의 데이터는 어디에 저장될까요?

`useState`든, `useEffect`든, `useRef`든, 모든 훅들은 데이터를 포함하고 있어요. 그럼 이걸 어떻게 저장하고 있는 걸까요?

### 훅의 데이터는 리스트 구조에 저장돼요!

결론적으로 리액트에서의 구현에선, 각 컴포넌트마다 훅의 데이터를 저장하기 위한 리스트 구조가 존재합니다.

### 훅이 불리는 순서로 리스트에 접근해요!

그렇다면, 저장된 데이터에 접근하는 것은 어떻게 하는 걸까요? 훅을 사용할 때 우리는 별도의 키 값을 넘긴 적이 없는데 말이죠.

물론 키값을 기반으로 구분하는 것도 하나의 방법이 될 수 있겠습니다만, 리액트는 컴포넌트 함수 안에서 훅이 **불리는 순서**로 이 배열에 접근합니다. 그래서 아래와 같은 훅의 특이한 조건들이 있는 거죠.

- 최상위 레벨에서만 훅을 호출할 것
- React 함수에서만 훅을 호출할 것

최상위 레벨에서만 훅을 호출하지 않으면, 상황에 따라 훅의 순서가 바뀔 수 있어요. 그러니 제대로 동작하지 않겠죠. 최상위 레벨에서만 훅을 호출하라는 것은, 다음을 금지한다는 뜻이기도 해요.

- 조건이나 루프 안에서 훅을 호출하지 마세요.
- 조건부 `return` 문 뒤에 훅을 호출하지 마세요.
- 이벤트 핸들러에서 훅을 호출하지 마세요.
- 클래스 컴포넌트에서 훅을 호출하지 마세요.
- `useMemo`, `useReducer`, `useEffect`로 전달된 함수 내에서 훅을 호출하지 마세요.
- `try`/`catch`/`finally` 블록 내에서 훅을 호출하지 마세요.

처음엔 이상하게 느껴졌던, 이 조건들. 이제 이해가 되시나요? 모두 컴포넌트 함수가 호출될 때마다 훅의 호출 순서를 바꿀 수 있는 상황들이에요!

### 실제 리액트에서는 어떻게 구현하고 있을까요?

실제로 리액트에서는 어떻게 구현하고 있는지 살펴볼까요? 먼저, `react` 패키지에서는 다음과 같이 호출만 하고 있어요.

```js
// react 패키지의 ReactHooks.js
export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function resolveDispatcher() {
  const dispatcher = ReactSharedInternals.H;
  return ((dispatcher: any): Dispatcher);
}
```

그렇다면, `dispatcher`는 어떻게 구현되어 있는지가 실제 핵심을 담고 있겠네요! 이 부분은 `react-reconciler` 패키지에 담겨 있어요.

```js
ReactSharedInternals.H =
  current === null || current.memoizedState === null
    ? HooksDispatcherOnMount
    : HooksDispatcherOnUpdate;

const HooksDispatcherOnUpdate: Dispatcher = {
  readContext,
  // ...
  useState: updateState,
  // ...
};

function updateState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  return updateReducer(basicStateReducer, initialState);
}

function updateReducer<S, I, A>(
  reducer: (S, A) => S,
  initialArg: I,
  init?: I => S,
): [S, Dispatch<A>] {
  const hook = updateWorkInProgressHook();
  return updateReducerImpl(hook, ((currentHook: any): Hook), reducer);
}

let currentHook: Hook | null = null;
let workInProgressHook: Hook | null = null;

function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
  } else {
    // Clone from the current hook.

    if (nextCurrentHook === null) {
      const currentFiber = currentlyRenderingFiber.alternate;
      if (currentFiber === null) {
        throw new Error(
          'Update hook called on initial render. This is likely a bug in React. Please file an issue.',
        );
      } else {
        // This is an update. We should always have a current hook.
        throw new Error('Rendered more hooks than during the previous render.');
      }
    }

    currentHook = nextCurrentHook;

    const newHook: Hook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,

      next: null,
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
  }
  return workInProgressHook;
}
```

꼬리에 꼬리를 물고 여러 함수가 호출되고 있네요. 그래서 좀 길게 느껴지지만, 결국 다음이 핵심일 것 같네요.

```js
let currentHook: Hook | null = null;
let workInProgressHook: Hook | null = null;
let currentlyRenderingFiber: Fiber = (null: any);

function updateWorkInProgressHook(): Hook {
  let nextCurrentHook: null | Hook;
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    if (current !== null) {
      nextCurrentHook = current.memoizedState;
    } else {
      nextCurrentHook = null;
    }
  } else {
    nextCurrentHook = currentHook.next;
  }

  let nextWorkInProgressHook: null | Hook;
  if (workInProgressHook === null) {
    nextWorkInProgressHook = currentlyRenderingFiber.memoizedState;
  } else {
    nextWorkInProgressHook = workInProgressHook.next;
  }

  // ...
      currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
  // ...

  return workInProgressHook;
}
```

모듈 안에서 전역 변수로 `currentHook`, `workInProgressHook`, `currentlyRenderingFiber`에 현재 작업 중인 훅 데이터를 가리키게 하고, 불리는 순서대로 처리하고 있음을 알 수 있어요.

> Fiber는 리액트에서 가상 DOM을 업데이트하는 과정에서 재조정(Reconcilation)을 효율적으로 하기 위해 도입한 구조이자 알고리즘이에요. 여기서 다루기엔 너무 내용이 방대해 다루지 않으나, 당장은 단순히 가상 DOM과 대응될 수 있는 트리 구조의 무언가라고만 생각해도 충분해요.  
> https://github.com/acdlite/react-fiber-architecture

불리는 순서에 따라 훅 데이터에 접근하고, 현재 작업 중인 Fiber Node에 이를 기록해놓는 모습을 확인할 수 있어요. 더불어, `Hook`은 다음과 같이 연결 리스트로 구현되어 있군요!

```js
export type Hook = {
  memoizedState: any,
  baseState: any,
  baseQueue: Update<any, any> | null,
  queue: any,
  next: Hook | null,
};
```

`useState`와 같이 업데이트가 필요한 경우엔, `Hook`의 `baseQueue` 의 `update` 함수를 호출함을 확인할 수 있어요.

## 마무리

다음 글에서, 위 원리들을 naïve하게 적용해 간단한 구현을 해볼게요!