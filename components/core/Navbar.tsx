import { BellIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { useManageView, useW3iAccount } from "@web3inbox/widget-react";
import React, { useCallback, useRef } from "react";
import { NavLink } from "./NavLink";

function Navbar() {
  const { account } = useW3iAccount();
  const { isOpen, open: openW3I, close: closeW3I } = useManageView();

  const toggleWeb3Inbox = useCallback(() => {
    isOpen ? closeW3I() : openW3I();
  }, [isOpen, closeW3I, openW3I]);

  return (
    <Flex width={"100vw"}>
      <Flex gap={4} alignItems="center">
        <NavLink href="/">Simple</NavLink>
        <NavLink href="/advanced">Advanced</NavLink>
      </Flex>
      <Flex
        position="fixed"
        top={"36px"}
        right={"36px"}
        alignItems="center"
        gap="16px"
      >
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
