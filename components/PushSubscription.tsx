"use client";
import { Flex } from "@chakra-ui/react";
import {
  useAccount as useW3iAccount,
  useManageSubscription,
  useManageView,
} from "@web3inbox/widget-react";
import React from "react";
import { NOTIFICATION_BODY } from "../utils/constants";
import useSendNotification from "../utils/useSendNotification";
import GmButton from "./core/GmButton";
import SendIcon from "./icons/SendIcon";
import SubscribeIcon from "./icons/SubscribeIcon";

const PushSubscription = ({ address }: { address: string }) => {
  const { account: w3iAccount } = useW3iAccount();
  const { isSubscribed } = useManageSubscription({
    account: w3iAccount,
  });
  const { open } = useManageView();
  const { handleSendNotification, isSending } = useSendNotification();

  return (
    <Flex flexDirection="column" gap={2} mb="24px">
      {!isSubscribed && (
        <GmButton leftIcon={<SubscribeIcon />} onClick={open}>
          Subscribe
        </GmButton>
      )}
      <GmButton
        leftIcon={<SendIcon isDisabled={!isSubscribed || isSending} />}
        onClick={async () =>
          handleSendNotification({
            notification: {
              title: "gm hackers!",
              body: NOTIFICATION_BODY,
              // href already contains the trailing slash
              icon: `${window.location.href}gm.png`,
              url: "https://dev.gm.walletconnect.com/",
              type: "gm_hourly",
            },
          })
        }
        isDisabled={!isSubscribed || isSending}
      >
        Send notification
      </GmButton>
    </Flex>
  );
};

export default PushSubscription;
