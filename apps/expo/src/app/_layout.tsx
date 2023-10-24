import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from 'expo-constants';
import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/token_cache";
import { COLORS } from "~/constants/theme";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <Slot />
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
