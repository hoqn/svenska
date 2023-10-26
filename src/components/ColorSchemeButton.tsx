import { useCallback, useEffect, useMemo } from "react";
import Button from "./ui/button";

import classnames from "classnames/bind";
import $ from "./ColorSchemeButton.module.scss";
import { t } from "i18next";
import { getColorScheme, toggleColorScheme } from "@/stores/color-scheme-store";

const cx = classnames.bind($);

export default function ColorSchemeButton() {
  const colorScheme = getColorScheme();

  // return <Button variant="text" tint="primary" data-text-light={t("app.colorscheme.light")} data-text-dark={t("app.colorscheme.dark")} className={cx("color-scheme-btn")} onClick={doOnClick}></Button>;
  return (
    <Button variant="text" tint="primary" className={cx("color-scheme-btn")} onClick={toggleColorScheme}>
      테슷
      {colorScheme === "dark" ? t("app.colorscheme.dark") : t("app.colorscheme.light")}
    </Button>
  );
}
