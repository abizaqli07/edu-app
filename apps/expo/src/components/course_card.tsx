import type { RouterOutputs } from '@acme/api';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View
} from 'react-native';
import {
  COLORS
} from '../constants/theme';

const CARD_WIDTH = Dimensions.get('window').width * 0.37;

interface CourseCardProps {
  data: RouterOutputs["student"]["course"]["getAll"][number]
}

const CourseCard: React.FC<CourseCardProps> = ({
  data
}) => {
  return (
    <View
      className='p-2 rounded-2xl bg-white'
      style={{ elevation: 2 }}
    >
      <ImageBackground
        source={{ uri: data.imageUrl ?? "" }}
        className='rounded-xl mb-4 overflow-hidden'
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
        resizeMode="cover">
      </ImageBackground>
      <Text className='font-medium text-base' style={{ color: COLORS.primaryDarkGreyHex }}>{data.title.length > 15 ? data.title.slice(0, 14) + "..." : data.title}</Text>
      <Text className='font-medium text-xs flex-' style={{ color: COLORS.primaryDarkGreyHex }}>{data.category?.name}</Text>
      <View className=' flex-row justify-between items-center mt-4'>
        <Text
          className='font-semibold'
          style={{ color: COLORS.primaryPinkHex }}
        >
          <Text className='text-base' style={{ color: COLORS.primaryDarkGreyHex }}>{data.chapters.length} Chapter</Text>
        </Text>
      </View>
    </View>
  );
};

export default CourseCard;
