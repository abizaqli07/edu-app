
import { useClerk, useUser } from "@clerk/clerk-expo";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from "expo-image";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "~/constants/colors";

const Profile = () => {
  const { user } = useUser()

  const [firstName, setFirstName] = useState<string>(user?.firstName ? user.firstName : "");
  const [lastName, setLastName] = useState<string>(user?.lastName ? user.lastName : "");

  const { signOut } = useClerk()

  const onSaveUser = async () => {
    try {
      const result = await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  return (
    <View>
      <View className=" items-end p-4">
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons
            name="log-out"
            size={40}
            style={{
              height: 40,
              width: 40,
              color: COLORS.black
            }}
          />
        </TouchableOpacity>
      </View>

      <View className=" justify-center items-center mb-12">
        <Image
          className="w-40 h-40 rounded-3xl mb-5"
          source={user?.hasImage ? { uri: user.imageUrl } : require("../../../assets/avatar.jpg")}
        />
        <Text className="text-lg font-bold">
          {(user?.firstName && user.lastName)
            ? `${user.firstName} ${user.lastName}`
            : "John Doe"
          }
        </Text>
        <Text className="text-base font-medium">
          {user?.emailAddresses[0]?.emailAddress}
        </Text>
      </View>

      <View className=" p-12">
        <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.inputField} />
        <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.inputField} />
        <Button onPress={onSaveUser} title="Update Profile" color={'#6c47ff'}></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  middleSectionTextContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  middleSectionText: {
    justifyContent: "center",
    alignItems: "center",
  },
  toptext: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "bold",
  },
  bottomtext: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "700",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#6c47ff',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default Profile