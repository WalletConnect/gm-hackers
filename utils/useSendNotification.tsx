import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useW3iAccount } from "@web3inbox/widget-react";

interface INotification {
  title: string;
  body: string;
  icon: string;
  url: string;
  type: string;
}
function useSendNotification() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const toast = useToast();
  const { account } = useW3iAccount();

  const handleSendNotification = useCallback(
    async (notification: INotification) => {
      setIsSending(true);
      try {
        // Construct the payload, including the target `accounts`
        // that should receive the notification.
        const notificationPayload = {
          accounts: [account],
          notification,
        };

        const result = await fetch("/api/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationPayload),
        });

        const gmRes = await result.json();
        const { success, message } = gmRes;
        setIsSending(false);

        toast({
          status: success ? "success" : "error",
          position: "top",
          variant: "subtle",
          title:
            message ?? success
              ? `Message sent`
              : "Message failed. Did you set up a subscription via the widget first?",
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
