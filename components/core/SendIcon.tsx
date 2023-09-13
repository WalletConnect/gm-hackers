import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface ISendIconProps {
  isDisabled: boolean;
}

function SendIcon({ isDisabled }: ISendIconProps) {
  const stroke = useColorModeValue(
    "#8B9797",
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
            d="M9.00941 5.92363L6.74414 8.18814"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.22818 4.79649L12.2588 1.78624C12.6265 1.66364 13.0239 1.86218 13.1465 2.22969C13.1946 2.37377 13.1946 2.52956 13.1465 2.67365L10.1353 11.7013C10.0127 12.0689 9.61524 12.2677 9.24746 12.1451C9.08533 12.0911 8.94848 11.9799 8.86257 11.8322L6.74344 8.18719L3.09723 6.06877C2.76211 5.87396 2.64842 5.44446 2.8433 5.10945C2.9292 4.96177 3.06605 4.85049 3.22818 4.79649Z"
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

export default SendIcon;
