"use client";
import { Flex } from "@chakra-ui/react";
import {
  useW3iAccount,
  useManageSubscription,
  useManageView,
} from "@web3inbox/widget-react";
import React, { useCallback, useEffect } from "react";
import { NOTIFICATION_BODY } from "../utils/constants";
import useSendNotification from "../utils/useSendNotification";
import GmButton from "./core/GmButton";
import SendIcon from "./icons/SendIcon";
import SubscribeIcon from "./icons/SubscribeIcon";
import { usePublicClient } from "wagmi";

const NotifySubscription = () => {
  const wagmiPublicClient = usePublicClient();
  const { account = "" } = useW3iAccount();
  const { isSubscribed } = useManageSubscription({
    account,
  });
  const { open } = useManageView();
  const { handleSendNotification, isSending } = useSendNotification();

  const handleBlockNotification = useCallback(async () => {
    if (isSubscribed) {
      const blockNumber = await wagmiPublicClient.getBlockNumber();
      handleSendNotification({
        title: "New block",
        body: blockNumber.toString(),
        icon: `${window.location.origin}/eth-global.png`,
        url: "https://hackers.gm.walletconnect.com/",
        type: "gm_hacker",
      });
    }
  }, [wagmiPublicClient, handleSendNotification, isSubscribed]);

  useEffect(() => {
    handleBlockNotification();
  }, [handleBlockNotification]);

  return (
    <Flex flexDirection="column" gap={2} mb="24px">
      {!isSubscribed && (
        <GmButton leftIcon={<SubscribeIcon />} onClick={open}>
          Subscribe
        </GmButton>
      )}
      <GmButton
        leftIcon={<SendIcon isDisabled={!isSubscribed || isSending} />}
        onClick={async (e) => {
          e.preventDefault();
          handleSendNotification({
            title: "gm hackers!",
            body: NOTIFICATION_BODY,
            icon: `${window.location.origin}/eth-global.png`,
            url: "https://hackers.gm.walletconnect.com/",
            type: "gm_hacker",
          });
        }}
        isDisabled={!isSubscribed || isSending}
      >
        Send notification
      </GmButton>
    </Flex>
  );
};

export default NotifySubscription;
