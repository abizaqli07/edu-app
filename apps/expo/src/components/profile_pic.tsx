import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Image, View } from 'react-native';
import { COLORS } from '~/constants/theme';

const ProfilePic = () => {
  const { user } = useUser()
  return (
    <View className='h-12 w-12 rounded-xl border-2 items-center justify-center overflow-hidden' style={{ borderColor: COLORS.secondaryDarkGreyHex }}>
      <Image
        source={user?.hasImage ? { uri: user.imageUrl } : require('../../assets/avatar.jpg')}
        className='h-12 w-12'
      />
    </View>
  );
};

export default ProfilePic;