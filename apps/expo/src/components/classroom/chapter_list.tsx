import type { RouterOutputs } from '@acme/api';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '~/constants/theme';

interface ChapterListProps {
  data: RouterOutputs["student"]["course"]["getOne"]
}

const ChapterList = ({ data }: ChapterListProps) => {
  const router = useRouter()

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 16
      }}>Course Chapters</Text>
      <ScrollView
        horizontal={false}
      >
        <FlashList
          data={data?.chapters}
          estimatedItemSize={15}
          contentContainerStyle={{
            paddingVertical: SPACING.space_10,
          }}
          ItemSeparatorComponent={() => <View className='h-2' />}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row', backgroundColor: COLORS.primaryWhiteHex, marginBottom: 5
                , padding: 13, alignItems: 'center', borderRadius: 5
              }}>
              <Text style={{
                fontWeight: 'bold', fontSize: 20,
                color: COLORS.primaryLightGreyHex, marginRight: 20
              }}>{index + 1}</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                {item.title}</Text>
              <Ionicons name="play-circle" size={24}
                style={{ position: 'absolute', right: 10, }}
                color={COLORS.primaryPurpleHex} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  )
}

export default ChapterList
