import { SVGProps } from "react";

export interface SvgIconsProps extends SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}
