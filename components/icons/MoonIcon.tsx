import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

function MoonIcon() {
  const stroke = useColorModeValue("#9EA9A9", "#E4E7E7");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M13.3332 9.28574C12.8945 9.40026 12.4343 9.46123 11.9598 9.46123C8.9658 9.46123 6.5387 7.03412 6.5387 4.04014C6.5387 3.56564 6.59967 3.10537 6.71419 2.66675C4.38524 3.27483 2.6665 5.39287 2.6665 7.91235C2.6665 10.9063 5.0936 13.3334 8.08758 13.3334C10.6071 13.3334 12.7251 11.6147 13.3332 9.28574Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MoonIcon;
