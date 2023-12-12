import { Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "./NavLink";

function Navbar() {
  return (
    <Flex alignItems="center" justifyContent={"space-between"} w="full">
      <Flex gap={4} alignItems="center">
        <NavLink href="/">Network Gateway</NavLink>
      </Flex>
      <w3m-button label="Connect to GSCxBT" balance="show" />
    </Flex>
  );
}

export default Navbar;
