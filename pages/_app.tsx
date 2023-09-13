import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure web3Modal
const chains = [mainnet];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ChakraProvider theme={theme}>
          <Box
            width="100vw"
            style={{ width: "100vw", height: "100vh" }}
            className="bg-primary"
          >
            <Grid
              templateAreas={`"header" "main" "footer"`}
              style={{ height: "100%", width: "100%" }}
              gridTemplateRows={"50px 3f 20px"}
              gridTemplateColumns={"1fr"}
              paddingY="2em"
            >
              <GridItem area={"header"} padding={4}>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  gap="5"
                  fontSize={"1.25em"}
                />
              </GridItem>
              <Flex justifyContent="center">
                <GridItem area={"main"} justifyContent="center">
                  <Component {...pageProps} />
                </GridItem>
              </Flex>
              <Footer />
            </Grid>
          </Box>
        </ChakraProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default MyApp;
