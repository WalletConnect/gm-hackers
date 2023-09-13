import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "body",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("#F5FAFA", "#141414")(props),
        lineHeight: "base",
      },
    }),
  },
  colors: {
    brand: {
      50: "#E1EEFF",
      100: "#B5D6FF",
      200: "#89BDFF",
      300: "#5CA5FF",
      400: "#3396FF", // Our base color #3396FF
      500: "#1A7EE6",
      600: "#0064CC",
      700: "#004C99",
      800: "#003366",
      900: "#001A33",
    },
  },
});
