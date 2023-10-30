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
import CourseCard from '../course_card'

interface HomeProps {
  categories: RouterOutputs["category"]["getAll"],
  courses: RouterOutputs["student"]["course"]["getAll"]
}

const CoursesView = (
  { categories, courses }: HomeProps
) => {
  const router = useRouter()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      className='p-8'
    >

      <Text
        className='text-2xl font-semibold'
        style={{ color: COLORS.primaryDarkGreyHex }}
      >
        Find the best{'\n'}course for you
      </Text>

      {/* Search Input */}

      <View className='flex flex-row bg-white p-2 rounded-lg mt-4 items-center' style={{ elevation: 3 }}>
        <Ionicons name="search" size={24}
          color={COLORS.primaryGreyHex} style={{ marginRight: 10 }} />
        <TextInput placeholder='Search' />
      </View>

      {/* Category Scroller */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: SPACING.space_20, marginTop: SPACING.space_10 }}

      >
        {categories.map((data) => (
          <View
            key={data.id}
            className='px-4'
          >
            <TouchableOpacity
              className='items-center'
            >
              <Text
                className='font-semibold text-base mb-1'
                style={{ color: COLORS.primaryLightGreyHex }}
              >
                {data.name}
              </Text>
              {/* {categoryIndex.index == index ? (
              <View style={styles.ActiveCategory} />
            ) : (
              <></>
            )} */}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Course list */}
      <FlashList
        horizontal
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
        ItemSeparatorComponent={() => <View className='w-2' />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => router.push({
              pathname: "/(main)/course/[id]",
              params: {
                id: item.id
              }
            })}>
              <CourseCard
                data={item} />
            </TouchableOpacity>
          )
        }}
      />


    </ScrollView>

  )
}

export default CoursesView