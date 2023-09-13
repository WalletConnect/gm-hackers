import { useColorModeValue } from "@chakra-ui/react";

function useThemeColor() {
  const cardBgColor = useColorModeValue("#FFFFFF", "#191A1A");

  const buttonBgColor = useColorModeValue(
    "rgba(6, 43, 43, 0.05)",
    "rgba(255, 255, 255, 0.02)"
  );
  const buttonTextColor = useColorModeValue("#141414", "#949E9E");

  const disabledButtonBgColor = useColorModeValue(
    "rgba(6, 43, 43, 0.15)",
    "#272A2A"
  );
  const disabledButtonTextColor = useColorModeValue(
    "#8B9797",
    "rgba(255, 255, 255, 0.15)"
  );

  const hoverButtonBgColor = useColorModeValue(
    "rgba(6, 43, 43, 0.10)",
    "rgba(255, 255, 255, 0.05)"
  );
  const activeButtonBgColor = useColorModeValue(
    "rgba(6, 43, 43, 0.15)",
    "rgba(255, 255, 255, 0.10)"
  );

  const defaultFontColor = useColorModeValue("#191A1A", "#FFFFFF");
  const actionTextColor = useColorModeValue("#474D4D", "#A8B1B1");
  const cardFooterBgColor = useColorModeValue(
    "rgba(6, 43, 43, 0.10)",
    "rgba(255, 255, 255, 0.05)"
  );
  const infoTextColor = useColorModeValue("#8B9797", "#636D6D");
  const strongTextColor = useColorModeValue("#636D6D", "#949E9E");

  const dividerColor = useColorModeValue(
    "rgba(6, 43, 43, 0.10)",
    "rgba(255, 255, 255, 0.10)"
  );

  const borderColor = useColorModeValue(
    "rgba(6, 43, 43, 0.10)",
    "rgba(255, 255, 255, 0.10)"
  );

  return {
    cardBgColor,
    infoTextColor,
    strongTextColor,
    borderColor,
    dividerColor,
    cardFooterBgColor,
    defaultFontColor,
    actionTextColor,
    buttonTextColor,
    buttonBgColor,
    hoverButtonBgColor,
    activeButtonBgColor,
    disabledButtonBgColor,
    disabledButtonTextColor,
  };
}

export default useThemeColor;
