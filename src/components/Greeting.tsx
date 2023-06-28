import type { HTMLAttributes } from "react";

import $ from "./Greeting.module.scss";

export default function Greeting(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 {...props}>
      안녕하세요! <ShakingHand />
      <br />저는 전호균입니다.
    </h2>
  );
}

export function ShakingHand() {
  return (
    // <span className={$['shaking-hand']}>👋</span>
    <span className={$['shaking-hand']} />
  );
}