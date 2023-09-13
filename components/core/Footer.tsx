import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import WalletConnectIcon from "./WalletConnectIcon";

function Footer() {
  const fontColor = useColorModeValue("#9EA9A9", "#6E7777");
  return (
    <Flex
      as={"footer"}
      w="full"
      justifyContent={"center"}
      alignSelf="flex-end"
      alignItems={"center"}
      h="32px"
      pb="32px"
      gap="4px"
    >
      <WalletConnectIcon />
      <Text fontSize="14px" fontWeight="500" color={fontColor}>
        WalletConnect
      </Text>

      <Box
        justifyContent="flex-end"
        position="fixed"
        right="36px"
        bottom="36px"
      >
        <ThemeSwitcher />
      </Box>
    </Flex>
  );
}

export default Footer;
