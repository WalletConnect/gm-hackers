import { useColorModeValue } from "@chakra-ui/react";

function useThemeColors() {
  const cardBgColor = useColorModeValue("#FFFFFF", "#191A1A");
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
  };
}

export default useThemeColors;
