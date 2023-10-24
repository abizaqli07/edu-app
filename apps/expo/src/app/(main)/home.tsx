import React from 'react'
import {
  View,
  Text
} from 'react-native'
import HomeView from '~/components/home/home_view'
import { COLORS } from '~/constants/theme'
import { api } from '~/utils/api'

const Home = () => {
  const { data: categories, isLoading, isError } = api.category.getAll.useQuery()
  const { data: courses, isLoading: isCourseLoading, isError: isCourseError } = api.student.course.getAll.useQuery()

  if (isLoading || isCourseLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (categories === undefined || isError || isCourseError) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }

  return (
    <View className='flex-1' style={{ backgroundColor: COLORS.primaryBlackHex }}>
      <HomeView categories={categories} courses={courses} />
    </View>
  )
}

export default Home