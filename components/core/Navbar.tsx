import { BellIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useManageView, useW3iAccount } from "@web3inbox/widget-react";
import React, { useCallback } from "react";
import { NavLink } from "./NavLink";

function Navbar() {
  const { account } = useW3iAccount();
  const { isOpen, open: openW3I, close: closeW3I } = useManageView();

  const toggleWeb3Inbox = useCallback(() => {
    isOpen ? closeW3I() : openW3I();
  }, [isOpen, closeW3I, openW3I]);

  return (
    <Flex
      position="fixed"
      gap={4}
      alignItems="center"
      justifyContent={"space-between"}
      w="full"
      pr={12}
    >
      <Flex ml={4} gap={4} alignItems="center">
        <NavLink href="/">Custom</NavLink>
        <NavLink href="/widget">Widget</NavLink>
      </Flex>
      <Flex alignItems="center" gap="16px">
        {account && (
          <IconButton
            variant="outline"
            aria-label="toggle Web3Inbox Widget"
            rounded="full"
            icon={<BellIcon />}
            onClick={toggleWeb3Inbox}
          />
        )}

        <w3m-button label="Connect Wallet" balance="show" />
      </Flex>
    </Flex>
  );
}

export default Navbar;
