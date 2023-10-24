import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('User changed: ', isSignedIn);

    if (isSignedIn) {
      router.replace('/home');
    }
  }, [isSignedIn]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6c47ff',
        },
        headerTintColor: '#fff',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen
        name="sign_in"
        options={{
          headerTitle: 'Clerk Auth App',
        }}></Stack.Screen>
      <Stack.Screen
        name="sign_up"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
      <Stack.Screen
        name="reset_password"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>
    </Stack>
  );
};

const AuthLayout = () => {
  return (
    <InitialLayout />
  );
};

export default AuthLayout;