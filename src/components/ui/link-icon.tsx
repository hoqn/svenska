import { getLinkIcon } from "@/utils/link-icon";
import type { SVGProps } from "react";

export interface LinkIconProps extends SVGProps<SVGSVGElement> {
  src: string;
  title?: string;
}

export default function LinkIcon({ src, ...restProps }: LinkIconProps) {
  const Component = getLinkIcon(src);

  return Component && <Component {...restProps} />;
}
