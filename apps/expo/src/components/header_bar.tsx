import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, FONTSIZE } from '../constants/theme';
import GradientBGIcon from './gradient_bg_icon';
import ProfilePic from './profile_pic';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View
      className='p-8 flex-row items-center justify-between'
    >
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text
        className='font-semibold text-xl'
        style={{ color: COLORS.primaryWhiteHex }}
      >{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeaderBar;
