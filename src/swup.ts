import Swup from "swup";
import SwupA11yPlugin from "@swup/a11y-plugin";
import SwupHeadPlugin from "@swup/head-plugin";
import SwupProgressPlugin from "@swup/progress-plugin";
import SwupScrollPlugin from "@swup/scroll-plugin";

const swup = new Swup({
  plugins: [
    new SwupA11yPlugin(),
    new SwupHeadPlugin(),
    new SwupProgressPlugin(),
    new SwupScrollPlugin(),
  ],
  containers: ["#swup"]
});

// @ts-ignore
window.swup = swup;
