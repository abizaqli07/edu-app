import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from 'expo-constants';
import { TRPCProvider } from "~/utils/api";
import { tokenCache } from "~/utils/token_cache";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f472b6",
            },
          }}
        />
        <StatusBar />
      </TRPCProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
