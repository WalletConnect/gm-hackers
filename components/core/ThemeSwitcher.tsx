import { FormLabel, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormLabel
      htmlFor="theme-switcher"
      as="label"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      position="relative"
    >
      <IconButton
        aria-label="toggle theme"
        size="sm"
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </FormLabel>
  );
};

export default ThemeSwitcher;
