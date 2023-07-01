import React, { useMemo, type PropsWithChildren, type ReactNode, type ComponentPropsWithRef } from "react";
import classnames from "classnames/bind";
import $ from "./styles.module.scss";

const cx = classnames.bind($);

export interface ButtonProps extends PropsWithChildren {
  variant?: "contained" | "tonal" | "text";
  tint?: "primary" | "neutral";
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

export default function Button({
  children,
  variant = "tonal",
  tint = "neutral",
  iconStart,
  iconEnd,
  className,
  ...restProps
}: ButtonProps & ComponentPropsWithRef<"button">) {
  const iconCenter = useMemo<ReactNode | undefined>(
    () => (iconStart && iconEnd ? undefined : iconStart ? iconStart : iconEnd),
    [iconStart, iconEnd]
  );

  return (
    <button className={cx("button", `button--${variant}`, `button--${tint}`, className)} {...restProps}>
      {!iconCenter && iconStart && <i className={cx("button__icon", "button__icon--start")}>{iconStart}</i>}
      {iconCenter && <i className={cx("button__icon", "button__icon--center")}>{iconCenter}</i>}
      <span className={cx("button__label")}>{children}</span>
      {!iconCenter && iconEnd && <i className={cx("button__icon", "button__icon--end")}>{iconEnd}</i>}
    </button>
  );
}
