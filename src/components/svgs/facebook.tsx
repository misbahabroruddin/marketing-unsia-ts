import React from "react";

import { SvgIconsProps } from "@/types/svg-props";

export const FacebookRoundIcon: React.FC<SvgIconsProps> = ({
  width = "24",
  height = "24",
  color = "white",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.75 12C19.75 15.875 16.9062 19.0938 13.1875 19.6562V14.25H15L15.3438 12H13.1875V10.5625C13.1875 9.9375 13.5 9.34375 14.4688 9.34375H15.4375V7.4375C15.4375 7.4375 14.5625 7.28125 13.6875 7.28125C11.9375 7.28125 10.7812 8.375 10.7812 10.3125V12H8.8125V14.25H10.7812V19.6562C7.0625 19.0938 4.25 15.875 4.25 12C4.25 7.71875 7.71875 4.25 12 4.25C16.2812 4.25 19.75 7.71875 19.75 12Z"
      fill={color}
    />
  </svg>
);
