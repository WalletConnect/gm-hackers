import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

function Zorb({ ...props }: BoxProps) {
  return (
    <Box
      borderRadius={"100%"}
      width="24px"
      height="24px"
      background="radial-gradient(75.29% 75.29% at 64.96% 24.36%, #FFF 0.52%, #F5CCFC 31.25%, #DBA4F5 51.56%, #9A8EE8 65.63%, #6493DA 82.29%, #6EBDEA 100%)"
      {...props}
    />
  );
}

export default Zorb;
