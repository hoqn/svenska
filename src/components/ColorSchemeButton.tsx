import { useCallback, useEffect } from "react";
import Button from "./ui/button";

import classnames from 'classnames/bind';
import $ from './ColorSchemeButton.module.scss';

const cx = classnames.bind($);

export default function ColorSchemeButton() {
  const doOnClick = useCallback(
    () => localStorage.setItem("color-scheme", document.documentElement.classList.toggle("dark-theme") ? 'dark' : 'light'),
    []
  );

  return <Button variant="text" tint="primary" data-text-light="밝음" data-text-dark="어두움" className={cx("color-scheme-btn")} onClick={doOnClick}></Button>;
}
