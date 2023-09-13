import { Flex, Text, useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import StatusIcon from "../components/core/StatusIcon";
import useThemeColor from "../styles/useThemeColors";

interface INotification {
  address: string;
  notification: {
    title: string;
    body: string;
    icon: string;
    url: string;
    type: string;
  };
}
function useSendNotification() {
  const [isSending, setIsSending] = useState<boolean>(false);
  const toast = useToast();
  const { defaultFontColor, cardBgColor, borderColor } = useThemeColor();

  const handleSendNotification = useCallback(
    async ({ address, notification }: INotification) => {
      setIsSending(true);
      try {
        // Construct the payload, including the target `accounts`
        // that should receive the push notification.
        const notificationPayload = {
          accounts: [`eip155:1:${address}`],
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
          colorScheme: success ? "whatsapp" : "red",
          position: "top",
          containerStyle: {
            display: "flex",
            justifyContent: "center",
          },
          render: (props) => (
            <Flex
              mt="16px"
              h="40px"
              borderRadius="100px"
              alignItems="center"
              w="fit-content"
              color={defaultFontColor}
              border={`solid 1px ${borderColor}`}
              bgColor={cardBgColor}
              p="8px 16px 8px 8px"
              gap="8px"
              boxShadow="0px 14px 64px -4px rgba(0, 0, 0, 0.08), 0px 8px 22px -6px rgba(0, 0, 0, 0.08)"
            >
              <StatusIcon status={success ? "success" : "error"} />
              <Text fontSize={"14px"} fontWeight={500}>
                {message ??
                  (success
                    ? `Message sent`
                    : "Message failed. Did you set up a subscription via the widget first?")}
              </Text>
            </Flex>
          ),
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
    [toast, borderColor, defaultFontColor, cardBgColor]
  );

  return {
    handleSendNotification,
    isSending,
  };
}

export default useSendNotification;
