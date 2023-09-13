import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface ISubscribeIconProps {
  isDisabled?: boolean;
}

function SubscribeIcon({ isDisabled }: ISubscribeIconProps) {
  const stroke = useColorModeValue(
    "#2D3131",
    isDisabled ? "#3B4040" : "#949E9E"
  );
  const backgroundColor = useColorModeValue(
    "#fff",
    "rgba(255, 255, 255, 0.15)"
  );
  const borderColor = useColorModeValue(
    "rgba(6, 43, 43, 0.1)",
    "rgba(255, 255, 255, 0.05)"
  );

  const disabledBackgroundColor = useColorModeValue(
    "rgba(6, 43, 43, 0.02)",
    "#272A2A"
  );
  const disabledBorderColor = useColorModeValue(
    "rgba(6, 43, 43, 0.10)",
    "rgba(255, 255, 255, 0.05)"
  );

  return (
    <Flex
      border={`2px solid ${isDisabled ? disabledBorderColor : borderColor}`}
      borderRadius="50%"
      backgroundColor={isDisabled ? disabledBackgroundColor : backgroundColor}
    >
      <Flex
        p="5px"
        alignItems="center"
        justifyContent="center"
        w="32px"
        h="32px"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path
            d="M6.45596 12.25C6.86742 12.613 7.40791 12.8333 7.99987 12.8333C8.59183 12.8333 9.13232 12.613 9.54379 12.25M11.501 5.25C11.501 4.32174 11.1322 3.4315 10.4756 2.77513C9.81898 2.11875 8.92844 1.75 7.99987 1.75C7.0713 1.75 6.18076 2.11875 5.52417 2.77513C4.86757 3.4315 4.4987 4.32174 4.4987 5.25C4.4987 7.05261 4.04382 8.28681 3.53568 9.10316C3.10705 9.79176 2.89274 10.1361 2.9006 10.2321C2.9093 10.3385 2.93184 10.379 3.01757 10.4426C3.09499 10.5 3.44402 10.5 4.14207 10.5H11.8577C12.5557 10.5 12.9048 10.5 12.9822 10.4426C13.0679 10.379 13.0904 10.3385 13.0991 10.2321C13.107 10.1361 12.8927 9.79176 12.4641 9.10316C11.9559 8.28681 11.501 7.05261 11.501 5.25Z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Flex>
    </Flex>
  );
}

export default SubscribeIcon;
