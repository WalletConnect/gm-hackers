"use client";
import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useMessages,
  useSubscription,
  useSubscriptionScopes,
  useW3iAccount,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import { useAccount, useSignMessage } from "wagmi";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import useSendNotification from "../utils/useSendNotification";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const Home: NextPage = () => {
  const isW3iInitialized = useInitWeb3InboxClient({
    projectId,
    domain: "gm.walletconnect.com",
  });
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const {
    account = "",
    setAccount,
    register: registerIdentity,
  } = useW3iAccount();
  const { subscribe, isSubscribed, unsubscribe } = useManageSubscription({
    account,
  });
  const { subscription } = useSubscription({ account });
  const { messages, deleteMessage } = useMessages({ account });
  const { scopes, updateScopes } = useSubscriptionScopes({ account });
  const { handleSendNotification } = useSendNotification();
  const toast = useToast();

  const { register, setValue, handleSubmit } = useForm();

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );
  const onSubmit = handleSubmit(async (formData) => {
    const enabledScopes = Object.entries(formData)
      .filter(([key, isEnabled]) => isEnabled)
      .map(([key]) => key);
    try {
      await updateScopes(enabledScopes);
      toast({
        title: "Preferences updated",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Failed to update preferences",
        status: "error",
      });
    }
  });
  const handleTestNotification = useCallback(async () => {
    if (isSubscribed) {
      handleSendNotification({
        title: "GM Hacker",
        body: "Hack it until you make it!",
        icon: `${window.location.origin}/eth-global.png`,
        url: "https://dev.gm.walletconnect.com/",
        type: "gm_hourly",
      });
    }
  }, [handleSendNotification, isSubscribed]);

  useEffect(() => {
    if (!address) return;
    setAccount(`eip155:1:${address}`);
  }, [signMessage, address, setAccount]);

  useEffect(() => {
    if (!account) return;
    registerIdentity(signMessage);
  }, [signMessage, account, registerIdentity]);

  useEffect(() => {
    if (!Object.keys(scopes)?.length) {
      return;
    }
    Object.entries(scopes).forEach(([scopeKey, scope]) => {
      const s: any = scope;
      if (s.enabled) {
        console.log({ isEnabled: s.enabled });
        setValue(scopeKey, s.enabled);
      }
    });
  }, [scopes, setValue]);

  return (
    <Flex w="xl" flexDirection={"column"} p={10}>
      <Heading alignSelf={"center"} mb={4}>
        Web3Inbox hooks
      </Heading>
      <Flex flexDirection="column">
        {isSubscribed ? (
          <Flex flexDirection={"column"} gap={2}>
            <Button
              leftIcon={<FaBellSlash />}
              variant="outline"
              onClick={unsubscribe}
              disabled={isW3iInitialized}
              colorScheme="red"
            >
              Unsubscribe
            </Button>
            <Button
              leftIcon={<BsSendFill />}
              variant="outline"
              onClick={handleTestNotification}
              disabled={isW3iInitialized}
              colorScheme="blue"
            >
              Send test notification
            </Button>
          </Flex>
        ) : (
          <Button
            leftIcon={<FaBell />}
            onClick={subscribe}
            colorScheme="cyan"
            variant="outline"
          >
            Subscribe
          </Button>
        )}

        {isSubscribed && (
          <Accordion defaultIndex={[1]} allowMultiple mt={10}>
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
                <Code lang="json" maxW="500px">
                  {JSON.stringify(subscription)}
                </Code>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading fontSize="md" as="span" flex="1" textAlign="left">
                  Last Messages
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection={"column"}
                pb={4}
                gap={2}
              >
                {!messages?.length ? (
                  <Text>No messages yet.</Text>
                ) : (
                  messages
                    .sort((a, b) => b.id - a.id)
                    .map(({ id, message }) => (
                      <Alert key={id} status="info" rounded="full">
                        <AlertIcon />
                        <AlertTitle>{message.title}</AlertTitle>
                        <AlertDescription flexGrow={1}>
                          {message.body}
                        </AlertDescription>
                        <CloseButton
                          alignSelf="flex-start"
                          position="relative"
                          right={-1}
                          top={-1}
                          onClick={async () => deleteMessage(id)}
                        />
                      </Alert>
                    ))
                )}
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <AccordionButton>
                <Heading as="span" fontSize="md" flex="1" textAlign="left">
                  Preferences
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} display="flex" flexDir="column">
                <VStack as="form" onSubmit={onSubmit}>
                  {Object.entries(scopes).map(([scopeKey, scope]) => {
                    return (
                      <FormControl
                        key={scopeKey}
                        display="flex"
                        justifyContent="space-between"
                        gap={4}
                      >
                        <FormLabel htmlFor={scopeKey}>{scopeKey}</FormLabel>
                        <Switch
                          id={scopeKey}
                          defaultChecked={(scope as any).enabled}
                          {...register(scopeKey)}
                        />
                      </FormControl>
                    );
                  })}
                  <Button
                    leftIcon={<BiSave />}
                    alignSelf="flex-end"
                    variant="outline"
                    colorScheme="blue"
                    type="submit"
                  >
                    Save preferences
                  </Button>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
