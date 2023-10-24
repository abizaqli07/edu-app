import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "~/constants/colors";


const Index = () => {

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.primary }}>
      <View className="flex-1 flex justify-around my-4">
        <Text
          className="text-white font-bold text-4xl text-center">
          Lets Get Started!
        </Text>
        <View className="flex-row justify-center">
          <Image source={require("../../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }} />
        </View>
        <View className="space-y-4">
          <Link
            href={"/sign_up"}
            className="py-3 bg-yellow-400 mx-7 rounded-xl text-center">
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Sign Up
            </Text>
          </Link>
          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">Already have an account?</Text>
            <Link href={"/sign_in"}>
              <Text className="font-semibold text-yellow-400"> Log In</Text>
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
