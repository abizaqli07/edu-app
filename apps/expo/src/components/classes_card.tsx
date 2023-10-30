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

const CARD_WIDTH = Dimensions.get('window').width;

interface ClassesCardProps {
  data: RouterOutputs["student"]["classroom"]["getAll"][number]
}

const ClassesCard: React.FC<ClassesCardProps> = ({
  data
}) => {
  return (
    <View
      className='p-2 rounded-2xl bg-white'
      style={{ elevation: 2 }}
    >
      <ImageBackground
        source={{ uri: data.course.imageUrl ?? "" }}
        className='rounded-xl mb-4 overflow-hidden'
        style={{ width: CARD_WIDTH * 0.8, height: CARD_WIDTH * 0.3 }}
        resizeMode="cover">
      </ImageBackground>
      <View className=' flex-grow flex-row'>
        <Text className='font-medium text-base flex-1' style={{ color: COLORS.primaryDarkGreyHex }}>{data.course.title}</Text>
      </View>
      <Text className='font-medium text-xs' style={{ color: COLORS.primaryDarkGreyHex }}>{data.course.category?.name}</Text>
      <View className=' flex-row justify-between items-center mt-4'>
        <View
          className='flex flex-row items-center justify-between w-full'
        >
          <Text className='text-base font-semibold' style={{ color: COLORS.primaryDarkGreyHex }}>Chapter Completion</Text>
          <Text style={{ color: COLORS.primaryDarkGreyHex }}>0/{data.course.chapters.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default ClassesCard;
