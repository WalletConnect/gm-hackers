import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertTitle,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { getAllSubscribers } from "../utils/fetchNotify";
import Link from "next/link";

function Subscribers() {
  const [subscribers, setSubscribers] = useState<string[]>();

  const getSubscribers = useCallback(async () => {
    try {
      const allSubscribers = await getAllSubscribers();
      setSubscribers(allSubscribers);
    } catch (getSubscribersError) {
      console.log({ getSubscribersError });
    }
  }, []);

  useEffect(() => {
    getSubscribers();
  }, [getSubscribers]);

  return (
    <AccordionItem>
      <AccordionButton>
        <Heading fontSize="md" as="span" flex="1" textAlign="left">
          ADMIN - All subscribers
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
          {!subscribers?.length ? (
            <Text>No subscribers yet.</Text>
          ) : (
            subscribers.map((caip10Account) => (
              <Alert
                as={Link}
                href={`https://etherscan.io/address/${
                  caip10Account.split("eip155:1:")[1]
                }`}
                target="_blank"
                key={caip10Account}
                status="info"
                rounded="xl"
                gap={2}
              >
                <BsPersonCircle />

                <AlertTitle>{caip10Account}</AlertTitle>
              </Alert>
            ))
          )}
        </AccordionPanel>
      </Box>
    </AccordionItem>
  );
}

export default Subscribers;
