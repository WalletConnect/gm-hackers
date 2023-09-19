"use client";
import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
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
  Box,
  Button,
  CloseButton,
  Code,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Switch,
  Text,
  Tooltip,
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

import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { BiSave } from "react-icons/bi";
import useSendNotification from "../utils/useSendNotification";
import Link from "next/link";
import { useInterval } from "usehooks-ts";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const Home: NextPage = () => {
  const isW3iInitialized = useInitWeb3InboxClient({
    projectId,
    domain: "hackers.gm.walletconnect.com",
  });
  const { address } = useAccount({
    onDisconnect: () => window.location.reload(),
  });
  const { signMessageAsync } = useSignMessage();
  const { account, setAccount, register: registerIdentity } = useW3iAccount();
  const { subscribe, isSubscribed, unsubscribe } =
    useManageSubscription(account);
  const { subscription } = useSubscription(account);
  const { messages, deleteMessage } = useMessages(account);
  const { scopes, updateScopes } = useSubscriptionScopes(account);
  const { handleSendNotification } = useSendNotification();
  const wagmiPublicClient = usePublicClient();
  const toast = useToast();
  const [lastBlock, setLastBlock] = useState<string>();

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
        url: "https://hackers.gm.walletconnect.com/",
        type: "gm_hacker",
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
    Object.entries(scopes).forEach(([scopeKey, scope]) => {
      const s: any = scope;
      if (s.enabled) {
        setValue(scopeKey, s.enabled);
      }
    });
  }, [scopes, setValue]);

  const handleBlockNotification = useCallback(async () => {
    if (isSubscribed) {
      const blockNumber = await wagmiPublicClient.getBlockNumber();
      if (lastBlock !== blockNumber.toString()) {
        setLastBlock(blockNumber.toString());
        return handleSendNotification({
          title: "New block",
          body: blockNumber.toString(),
          icon: `${window.location.origin}/eth-global.png`,
          url: `https://etherscan.io/block/${blockNumber.toString()}`,
          type: "gm_hacker",
        });
      }
    }
  }, [wagmiPublicClient, handleSendNotification, isSubscribed, lastBlock]);

  useInterval(() => {
    handleBlockNotification();
  }, 12000);

  return (
    <Flex w="full" flexDirection={"column"} pt={10} maxW="700px">
      <Heading alignSelf={"center"} textAlign={"center"} mb={10}>
        WalletConnect Web3Inbox hooks
      </Heading>
      <Flex flexDirection="column">
        {isSubscribed ? (
          <Flex flexDirection={"column"} alignItems="center" gap={4}>
            <Button
              leftIcon={<FaBellSlash />}
              variant="outline"
              onClick={unsubscribe}
              isDisabled={!isW3iInitialized}
              colorScheme="red"
              rounded="full"
            >
              Unsubscribe
            </Button>
            <Button
              leftIcon={<BsSendFill />}
              variant="outline"
              onClick={handleTestNotification}
              isDisabled={!isW3iInitialized}
              colorScheme="blue"
              rounded="full"
            >
              Send test notification
            </Button>
          </Flex>
        ) : (
          <Tooltip
            label={
              "Connect your wallet first and register your account by approving the signature request."
            }
            hasArrow
            rounded="lg"
            hidden={Boolean(account)}
          >
            <Button
              leftIcon={<FaBell />}
              onClick={subscribe}
              colorScheme="cyan"
              rounded="full"
              variant="outline"
              w="fit-content"
              alignSelf="center"
              isDisabled={!Boolean(account)}
            >
              Subscribe
            </Button>
          </Tooltip>
        )}

        {isSubscribed && (
          <Accordion defaultIndex={[1]} allowToggle mt={10}>
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
                          rounded="xl"
                        >
                          <AlertIcon />

                          <Flex flexDir={"column"} flexGrow={1}>
                            <AlertTitle>{message.title}</AlertTitle>
                            <AlertDescription flexGrow={1}>
                              {message.body}
                            </AlertDescription>
                          </Flex>
                          <Box w="80px">
                            <Image
                              src={message.icon}
                              alt="notification image"
                              w="60px"
                              height="60px"
                              rounded="full"
                            />
                          </Box>
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

            <AccordionItem>
              <AccordionButton>
                <Heading as="span" fontSize="md" flex="1" textAlign="left">
                  Preferences
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} display="flex" flexDir="column">
                <VStack as="form" onSubmit={onSubmit}>
                  {Object.entries(scopes)?.map(([scopeKey, scope]) => {
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
                    rounded="full"
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
