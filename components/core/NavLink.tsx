import { Button, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const NavLink = (props: Props) => {
  const { children, href } = props;

  return (
    <Button
      variant="outline"
      as={Link}
      px={2}
      py={1}
      rounded={"full"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={href}
    >
      {children}
    </Button>
  );
};
