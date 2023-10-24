import React from 'react';
import { Image, View } from 'react-native';
import { COLORS } from '~/constants/theme';

const ProfilePic = () => {
  return (
    <View className='h-9 w-9 rounded-xl border-2 items-center justify-center overflow-hidden' style={{ borderColor: COLORS.secondaryDarkGreyHex }}>
      <Image
        source={require('../assets/app_images/avatar.png')}
        className='h-9 w-9'
      />
    </View>
  );
};

export default ProfilePic;