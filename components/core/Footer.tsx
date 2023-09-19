import { Box } from "@chakra-ui/react";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Footer() {
  return (
    <Box justifyContent="flex-end" position="fixed" right="36px" bottom="36px">
      <ThemeSwitcher />
    </Box>
  );
}

export default Footer;
