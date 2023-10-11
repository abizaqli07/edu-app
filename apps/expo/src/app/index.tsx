import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "~/utils/api";

const Index = () => {

  return (
    <SafeAreaView className="bg-[#1F104A]">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full p-4">
        <Link href="/course"><Text className=" text-white font-semibold text-xl">Home</Text></Link>
        <Link href="/sign_in"><Text className=" text-white font-semibold text-xl">Login</Text></Link>
      </View>
    </SafeAreaView>
  );
};

export default Index;
