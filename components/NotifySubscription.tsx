"use client";
import { Flex } from "@chakra-ui/react";
import {
  useW3iAccount,
  useManageSubscription,
  useManageView,
} from "@web3inbox/widget-react";
import React, { useCallback } from "react";
import { NOTIFICATION_BODY } from "../utils/constants";
import useSendNotification from "../utils/useSendNotification";
import GmButton from "./core/GmButton";
import SendIcon from "./icons/SendIcon";
import SubscribeIcon from "./icons/SubscribeIcon";
import { usePublicClient } from "wagmi";
import { useInterval } from "usehooks-ts";

const NotifySubscription = () => {
  const wagmiPublicClient = usePublicClient();
  const { account: w3iAccount } = useW3iAccount();
  const { isSubscribed } = useManageSubscription({
    account: w3iAccount,
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
        url: "https://dev.gm.walletconnect.com/",
        type: "gm_hourly",
      });
    }
  }, [wagmiPublicClient, handleSendNotification, isSubscribed]);

  useInterval(() => {
    handleBlockNotification();
  }, 12000);

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
            url: "https://dev.gm.walletconnect.com/",
            type: "gm_hourly",
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
