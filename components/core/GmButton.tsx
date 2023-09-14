import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

function GmButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      display="flex"
      size="xl"
      fontSize="16px"
      fontWeight="600"
      w="320px"
      gap="12px"
      padding="4px"
      justifyContent={"flex-start"}
      borderRadius={"16px"}
      {...props}
    >
      {children}
    </Button>
  );
}

export default GmButton;
