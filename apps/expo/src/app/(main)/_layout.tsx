
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { COLORS } from '~/constants/colors';

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
                  size={24}
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
                  name="book"
                  size={24}
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Class</Text>
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
                width: Platform.OS == "ios" ? 55 : 65,
                height: Platform.OS == "ios" ? 55 : 65,
                top: Platform.OS == "ios" ? -10 : -20,
                borderRadius: Platform.OS == "ios" ? 30 : 35,
              }}>
                <Ionicons
                  name="rocket-outline"
                  size={33}
                  color="green"
                  style={{
                    height: 33,
                    width: 33,
                    color: focused ? COLORS.white : COLORS.white
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
                  name="document"
                  size={24}
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
                }}>Task</Text>
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
                  name="person-circle"
                  size={24}
                  style={{
                    height: 24,
                    width: 24,
                    color: focused ? COLORS.primary : COLORS.black
                  }}
                />

                <Text style={{
                  fontSize: 14,
                  color: focused ? COLORS.primary : COLORS.black
                }}>Profile</Text>
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