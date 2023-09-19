"use client";
import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import "@web3inbox/widget-react/dist/compiled.css";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useSignMessage } from "wagmi";

import DefaultView from "../views/DefaultView";
import SignedInView from "../views/SignedInView";
import dynamic from "next/dynamic";

const W3iWidget = dynamic(
  () => import("@web3inbox/widget-react").then((w3i) => w3i.W3iWidget),
  { ssr: false }
);

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const Widget: NextPage = () => {
  const [view, changeView] = useState<"default" | "qr" | "signedIn">("default");
  const { address, isConnected, connector } = useAccount({
    onDisconnect: () => {
      changeView("default");
    },
  });
  const { signMessageAsync } = useSignMessage();

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  const ref = useRef(null);
  const [currentAddress, setCurrentAddress] = useState<`0x${string}`>();
  const { close, open } = useWeb3Modal();

  const connect = useCallback(async () => {
    if (!connector) return open();
    try {
      const connected = await connector.connect({
        chainId: 1,
      });
      console.log({ connected });
    } catch (error) {
      console.log({ error });
    }
  }, [connector, open]);

  useEffect(() => {
    if (!address) return;
    setCurrentAddress(address);
    // setAccount(`eip155:1:${address}`);
  }, [signMessage, address]);

  useEffect(() => {
    if (currentAddress && isConnected) {
      changeView("signedIn");
      close();
    }
  }, [currentAddress, changeView, close, isConnected]);

  return (
    <>
      <Flex width={"100%"} h="full" justifyContent="center" position="relative">
        {view === "default" ? <DefaultView /> : <SignedInView />}
      </Flex>

      <Box
        ref={ref}
        maxH="600px"
        maxW="400px"
        rounded="2xl"
        position="fixed"
        top={20}
        right={20}
      >
        {currentAddress && (
          <W3iWidget
            projectId={projectId}
            account={`eip155:1:${currentAddress}`}
            onConnect={connect}
            onSign={signMessage}
            domain="hackers.gm.walletconnect.com"
          />
        )}
      </Box>
    </>
  );
};

export default Widget;
