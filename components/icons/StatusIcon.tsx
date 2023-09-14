import { Box } from "@chakra-ui/react";
import React from "react";

interface IStatusIconProps {
  status: "success" | "error";
}

function StatusIcon({ status }: IStatusIconProps) {
  return (
    <Box
      padding="5px"
      bgColor={
        status === "success"
          ? "rgba(38, 181, 98, 0.16)"
          : "rgba(240, 60, 24, 0.16)"
      }
      borderRadius="50%"
    >
      {status === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.823 0.924018C11.2102 1.17289 11.3223 1.68849 11.0734 2.07563L5.4484 10.8256C5.3049 11.0489 5.06366 11.1904 4.7988 11.2067C4.53394 11.2231 4.27712 11.1123 4.10723 10.9085L0.982232 7.15849C0.687596 6.80492 0.735366 6.27945 1.08893 5.98482C1.44249 5.69018 1.96796 5.73795 2.2626 6.09151L4.66056 8.96906L9.67143 1.17437C9.92031 0.787227 10.4359 0.675141 10.823 0.924018Z"
            fill="#26B562"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M4 4L12 12M4 12L12 4"
            stroke="#F03C18"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Box>
  );
}

export default StatusIcon;
