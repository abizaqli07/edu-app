import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/theme';
import CustomIcon from './custom_icon';

interface GradientBGIconProps {
  name: string;
  color: string;
  size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({ name, color, size }) => {
  return (
    <View
      className=' border-2 rounded-xl items-center justify-center overflow-hidden'
      style={{ borderColor: COLORS.secondaryDarkGreyHex, backgroundColor: COLORS.secondaryDarkGreyHex }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        className='h-9 w-9 items-center justify-center'
      >
        <CustomIcon name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  );
};

export default GradientBGIcon;
