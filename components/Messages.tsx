import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useMessages, useW3iAccount } from "@web3inbox/widget-react";
import Link from "next/link";
import React from "react";

function Messages() {
  const { account } = useW3iAccount();
  const { messages, deleteMessage } = useMessages(account);

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading fontSize="md" as="span" flex="1" textAlign="left">
          Last Messages
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <Box overflowY="scroll" position={"relative"} maxH="400px">
        <AccordionPanel
          display="flex"
          flexDirection={"column"}
          pb={4}
          gap={2}
          position={"relative"}
        >
          {!messages?.length ? (
            <Text>No messages yet.</Text>
          ) : (
            messages
              .sort((a, b) => b.id - a.id)
              .map(({ id, message }) => (
                <Alert
                  as={Link}
                  href={message.url}
                  target="_blank"
                  key={id}
                  status="info"
                  colorScheme={
                    message.type === "transactional" ? "blue" : "purple"
                  }
                  rounded="xl"
                >
                  <AlertIcon />

                  <Flex flexDir={"column"} flexGrow={1}>
                    <AlertTitle>{message.title}</AlertTitle>
                    <AlertDescription flexGrow={1}>
                      {message.body}
                    </AlertDescription>
                  </Flex>
                  <Flex w="60px" justifyContent="center">
                    <Image
                      src={message.icon}
                      alt="notification image"
                      height="60px"
                      rounded="full"
                      alignSelf="center"
                    />
                  </Flex>
                  <CloseButton
                    alignSelf="flex-start"
                    position="relative"
                    right={-1}
                    top={-1}
                    onClick={async (e) => {
                      e.preventDefault();
                      deleteMessage(id);
                    }}
                  />
                </Alert>
              ))
          )}
        </AccordionPanel>
      </Box>
    </AccordionItem>
  );
}

export default Messages;
