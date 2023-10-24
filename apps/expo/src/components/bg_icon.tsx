import React from 'react';
import { View } from 'react-native';
import CustomIcon from './custom_icon';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({ name, color, size, BGColor }) => {
  return (
    <View
      className='h-8 w-8 justify-center items-center rounded-lg'
      style={{ backgroundColor: BGColor }}
    >
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;
