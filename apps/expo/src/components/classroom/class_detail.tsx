import type { RouterOutputs } from '@acme/api';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { COLORS } from '~/constants/theme';
import ChapterList from './chapter_list';

interface ClassDetailProps {
  data: RouterOutputs["student"]["course"]["getOne"]
}

const ClassDetailView = ({ data }: ClassDetailProps) => {
  return (
    <View style={{ padding: 20, paddingTop: 50 }}>
      <View>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>{data?.title}</Text>
        <Text style={{ color: COLORS.primaryDarkGreyHex }}>{data?.category?.name}</Text>
        <Image source={{ uri: data?.imageUrl ?? "" }}
          style={{ height: 150, marginTop: 10, borderRadius: 10 }} />
        <Text style={{
          marginTop: 10,
          fontSize: 16, fontWeight: 'bold'
        }}>About Class</Text>
        <Text numberOfLines={4}
          style={{ color: COLORS.primaryDarkGreyHex }}>{data?.description}</Text>
      </View>
      <View>
        <ChapterList data={data} />
      </View>
    </View>
  )
}
export default ClassDetailView