// Astro Transition API에 맞춘 애니메이션

import type {
  TransitionAnimationPair,
  TransitionDirectionalAnimations,
} from "astro";

const mainTransitionAnim: TransitionDirectionalAnimations = {
  backwards: {
    old: {
      name: "transition-main--in",
      // duration: "250ms",
      duration: "50ms",
      easing: "ease-in",
      direction: "reverse",
      fillMode: "forwards",
    },
    new: {
      name: "transition-main--out",
      // delay: "250ms",
      duration: "250ms",
      easing: "ease-out",
      direction: "reverse",
      fillMode: "forwards",
    },
  },
  forwards: {
    old: {
      name: "transition-main--out",
      // duration: "250ms",
      duration: "50ms",
      easing: "ease-in",
      fillMode: "forwards",
    },
    new: {
      name: "transition-main--in",
      // delay: "250ms",
      duration: "250ms",
      easing: "ease-out",
      fillMode: "forwards",
    },
  },
};

export { mainTransitionAnim };
