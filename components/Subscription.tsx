import {
  AccordionItem,
  AccordionButton,
  Heading,
  AccordionIcon,
  AccordionPanel,
  Code,
} from "@chakra-ui/react";
import { useSubscription, useW3iAccount } from "@web3inbox/widget-react";
import React from "react";

function Subscription() {
  const { account } = useW3iAccount();
  const { subscription } = useSubscription(account);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Heading fontSize="md" as="span" flex="1" textAlign="left">
            Subscription
          </Heading>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Code
          lang="json"
          maxW={{
            base: "280px",
            sm: "lg",
            md: "full",
          }}
        >
          <pre
            style={{
              overflow: "scroll",
            }}
          >
            {JSON.stringify(subscription, undefined, 2)}
          </pre>
        </Code>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Subscription;
