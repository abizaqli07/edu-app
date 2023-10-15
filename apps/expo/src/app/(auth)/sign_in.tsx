/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "~/constants/colors";
import { useWarmUpBrowser } from "~/hooks/use_warm_up_browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });


    } catch (err) {
      console.log("Something error", err);
    }
  };

  const onOAuthPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
      } else {
        throw new Error("There are unmet requirements, modifiy this else to handle them")
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, []);

  return (
    <View className=" flex-1 bg-white" style={{ backgroundColor: COLORS.primary }}>
      <SafeAreaView className=" flex">
        <View className="flex-row justify-center">
          <Image source={require('../../../assets/images/auth/login.png')}
            style={{ width: 200, height: 200 }} />
        </View>
      </SafeAreaView>

      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8">
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={onSignInPress}
          >
            <Text
              className="text-xl font-bold text-center text-gray-700"
            >
              Login
            </Text>
          </TouchableOpacity>

        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={onOAuthPress}>
            <Image source={require('../../../assets/images/icons/google.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../../assets/images/icons/apple.png')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../../assets/images/icons/facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Dont have an account?
          </Text>
          <Link href="/sign_up">
            <Text className="font-semibold text-yellow-500">Sign Up</Text>
          </Link>

        </View>

      </View>
    </View>
  );
}