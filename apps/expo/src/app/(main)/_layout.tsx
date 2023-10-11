
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { COLORS } from '~/constants/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('User changed: ', isSignedIn);

    if (!isSignedIn) {
      router.replace('/sign_in');
    }
  }, [isSignedIn]);

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        height: 72,
        elevation: 0,
        backgroundColor: COLORS.white
      }
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <Ionicons
                  name="home"
                  size={32}
                  color="green"
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Home</Text>
              </View>
            )
          }
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <Ionicons
                  name="home"
                  size={32}
                  color="green"
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Cards</Text>
              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="my_course"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.primary,
                width: Platform.OS == "ios" ? 50 : 60,
                height: Platform.OS == "ios" ? 50 : 60,
                top: Platform.OS == "ios" ? -10 : -20,
                borderRadius: Platform.OS == "ios" ? 25 : 30,
              }}>
                <Ionicons
                  name="home"
                  size={32}
                  color="green"
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="task"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <Ionicons
                  name="home"
                  size={32}
                  color="green"
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Loans</Text>
              </View>
            )
          }
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <View style={{
                alignItems: "center",
                paddingTop: 16,
                borderTopColor: focused ? COLORS.primary : COLORS.white,
                borderTopWidth: 2
              }}>
                <Ionicons
                  name="home"
                  size={32}
                  color="green"
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Settings</Text>
              </View>
            )
          }
        }}
      />
    </Tabs>
  );
};

const AuthLayout = () => {
  return (
    <InitialLayout />
  );
};

export default AuthLayout;