import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useW3iAccount } from "@web3inbox/widget-react";
import { INotification } from "./types";
import { sendNotification } from "./fetchNotify";

function useSendNotification() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const toast = useToast();
  const { account } = useW3iAccount();

  const handleSendNotification = useCallback(
    async (notification: INotification) => {
      if (!account) {
        return;
      }
      setIsSending(true);
      try {
        const { success, message } = await sendNotification({
          accounts: [account],
          notification,
        });
        setIsSending(false);

        toast({
          status: success ? "success" : "error",
          position: "top",
          variant: "subtle",
          colorScheme: success ? "purple" : "red",
          title: success ? notification.title : "Message failed.",
        });
      } catch (error: any) {
        setIsSending(false);
        console.error({ sendNotificationError: error });
        toast({
          status: "error",
          title: error.message,
          description: error.cause,
        });
      }
    },
    [toast, account]
  );

  return {
    handleSendNotification,
    isSending,
  };
}

export default useSendNotification;
