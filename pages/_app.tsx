import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";
import { useInitWeb3InboxClient } from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "../components/core/Navbar";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure Web3Modal
const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  appName: "GM Hackers",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

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
                <Navbar />
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
    </>
  );
}

export default MyApp;
