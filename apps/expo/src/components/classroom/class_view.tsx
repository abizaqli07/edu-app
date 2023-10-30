import type { RouterOutputs } from '@acme/api'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { COLORS, SPACING } from '~/constants/theme'
import ClassesCard from '../classes_card'

interface ClassesProps {
  courses: RouterOutputs["student"]["classroom"]["getAll"]
}

const ClassesView = (
  { courses }: ClassesProps
) => {
  const router = useRouter()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className='w-full p-8'
    >

      <Text
        className='text-2xl font-semibold'
        style={{ color: COLORS.primaryDarkGreyHex }}
      >
        My Courses
      </Text>

      {/* Search Input */}

      <View className='flex flex-row bg-white p-2 rounded-lg mt-4 items-center' style={{ elevation: 3 }}>
        <Ionicons name="search" size={24}
          color={COLORS.primaryGreyHex} style={{ marginRight: 10 }} />
        <TextInput placeholder='Search' />
      </View>


      {/* Course list */}
      <FlashList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        data={courses}
        estimatedItemSize={50}
        ListEmptyComponent={
          <View
            className='items-center justify-center py-9'
            style={{ width: Dimensions.get('window').width - SPACING.space_30 * 2, }}
          >
            <Text
              className='font-semibold text-base mb-1'
              style={{ color: COLORS.primaryLightGreyHex }}
            >No Course Available</Text>
          </View>
        }
        contentContainerStyle={{
          paddingVertical: SPACING.space_20,
        }}
        ItemSeparatorComponent={() => <View className='h-4'></View>}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/(main)/my_course/[id]",
                params: {
                  id: item.courseId
                }
              })}
            >
              <ClassesCard
                data={item} />
            </TouchableOpacity>
          )
        }}
      />


    </ScrollView>

  )
}

export default ClassesView