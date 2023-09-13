import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import useThemeColor from "../../styles/useThemeColors";

function GmButton({ children, ...props }: ButtonProps) {
  const {
    buttonTextColor,
    buttonBgColor,
    disabledButtonBgColor,
    disabledButtonTextColor,
    hoverButtonBgColor,
    activeButtonBgColor,
  } = useThemeColor();
  return (
    <Button
      display="flex"
      size="xl"
      fontSize="16px"
      fontWeight="600"
      w="320px"
      gap="12px"
      bg={buttonBgColor}
      color={buttonTextColor}
      padding="12px 18px 12px 12px"
      justifyContent={"flex-start"}
      _hover={{
        bgColor: hoverButtonBgColor,
      }}
      _active={{
        bgColor: activeButtonBgColor,
      }}
      _disabled={{
        bgColor: disabledButtonBgColor,
        color: disabledButtonTextColor,
        cursor: "no-drop",
        _hover: {
          bgColor: disabledButtonBgColor,
        },
      }}
      borderRadius={"16px"}
      {...props}
    >
      {children}
    </Button>
  );
}

export default GmButton;
