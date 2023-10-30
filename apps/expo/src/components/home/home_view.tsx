import type { RouterOutputs } from '@acme/api'
import { FlashList } from '@shopify/flash-list'
import { Link } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  Text,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderBar from '~/components/header_bar'
import { COLORS, SPACING } from '~/constants/theme'
import ClassesCard from '../classes_card'
import HomeSlider from './home_slider'

interface HomeProps {
  courses: RouterOutputs["student"]["classroom"]["getAll"]
}

const HomeView = (
  { courses }: HomeProps
) => {

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >

      {/* App Header */}
      <HeaderBar />

      {/* Home Banner */}
      <HomeSlider />

      {/* Recent Course list */}
      <View className=' mt-8'>
        <Text className=' text-lg font-semibold'>Recent Course</Text>
      </View>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={30}
        data={courses}
        ListEmptyComponent={
          <View
            className='items-center justify-center'
            style={{ width: Dimensions.get('window').width * 0.75 }}
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
            <Link asChild href={{
              pathname: "/(main)/my_course/[id]",
              params: { id: item.id }
            }}>
              <ClassesCard
                data={item} />
            </Link>
          )
        }}
      />


    </ScrollView>

  )
}

export default HomeView