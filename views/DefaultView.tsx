import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useWeb3Modal } from "@web3modal/react";
import GmCard from "../components/core/GmCard";
import useThemeColors from "../styles/useThemeColors";

const DefaultView = () => {
  const { colorMode } = useColorMode();
  const { open } = useWeb3Modal();
  const { dividerColor, infoTextColor, strongTextColor, cardFooterBgColor } =
    useThemeColors();

  return (
    <Box w="360px">
      <Box position={{ position: "relative" }}>
        <Flex
          style={{ position: "relative", top: "50px" }}
          justifyContent="center"
        >
          <Image
            style={{ width: "100px", height: "100px" }}
            rounded="full"
            src="/eth-global.png"
            alt="gm"
          />
        </Flex>
      </Box>
      <GmCard>
        <Box pt="40px" w="full">
          <Heading py="16px" size="lg" textAlign="center">
            GM Hackers
          </Heading>
        </Box>
        <Divider borderColor={dividerColor} />

        <Flex py="40px" w="full" justifyContent="center">
          <Button
            paddingY="1.25em"
            fontSize={"16px"}
            onClick={open}
            borderRadius={"10px"}
            border="solid 1px rgba(6, 43, 43, 0.10)"
            bg="brand.400"
            _hover={{
              bg: "brand.300",
            }}
          >
            <Flex gap="1em">
              <Image src="/wc.png" fit="scale-down" alt="WC" />
              <Box as="span" color="white">
                Connect Wallet
              </Box>
            </Flex>
          </Button>
        </Flex>

        <Box
          fontSize={"14px"}
          color={infoTextColor}
          bgColor={cardFooterBgColor}
          borderBottomRadius={"23px"}
          padding="12px"
          textAlign={"center"}
          w="full"
          borderTop={`1px solid ${dividerColor}`}
        >
          <Text as="span" fontWeight={colorMode === "dark" ? "600" : "normal"}>
            By connecting your wallet, you acknowledge and agree to our
          </Text>{" "}
          <Text as="span" fontWeight="600" color={strongTextColor}>
            Terms of Service
          </Text>
        </Box>
      </GmCard>
    </Box>
  );
};

export default DefaultView;
