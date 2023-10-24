import type { RouterOutputs } from '@acme/api';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTSIZE
} from '../constants/theme';
import BGIcon from './bg_icon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CourseCardProps {
  data: RouterOutputs["student"]["course"]["getAll"][number]
}

const CourseCard: React.FC<CourseCardProps> = ({
  data
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className='p-4 rounded-3xl'
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={{ uri: data.imageUrl ?? "" }}
        className='rounded-2xl mb-4 overflow-hidden'
        style={{ width: CARD_WIDTH, height: CARD_WIDTH }}
        resizeMode="cover">
      </ImageBackground>
      <Text className='font-medium text-base' style={{ color: COLORS.primaryWhiteHex }}>{data.title}</Text>
      <Text className='font-medium text-xs' style={{ color: COLORS.primaryWhiteHex }}>{data.category?.name}</Text>
      <View className=' flex-row justify-between items-center mt-4'>
        <Text
          className='font-semibold text-lg'
          style={{ color: COLORS.primaryPinkHex }}
        >
          <Text style={{ color: COLORS.primaryWhiteHex }}>{data.chapters.length} Chapter</Text>
        </Text>
        <TouchableOpacity>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryPinkHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CourseCard;
