import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import ProfilePic from './profile_pic';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  const { user } = useUser()
  return (
    <View
      className='p-1 flex-row items-center justify-between'
    >
      <View>
        <Text className=' text-base'>Hello,</Text>
        <Text className=' text-lg font-bold'>{user?.username ? user.username : user?.emailAddresses[0]?.emailAddress}</Text>
      </View>
      <Text
        className='font-semibold text-xl'
        style={{ color: COLORS.primaryWhiteHex }}
      >{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;
