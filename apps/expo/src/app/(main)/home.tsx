import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import {
  View,
  Text
} from 'react-native'
import HomeView from '~/components/home/home_view'
import { COLORS } from '~/constants/theme'
import { api } from '~/utils/api'

const Home = () => {
  const { user } = useUser()

  const { data: courses, isLoading: isCourseLoading, isError: isCourseError } = api.student.classroom.getAll.useQuery({
    userId: user?.id
  })

  if (isCourseLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (isCourseError) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }

  return (
    <View className='flex-1 p-8' style={{ backgroundColor: COLORS.primaryWhiteHex }}>
      <HomeView courses={courses} />
    </View>
  )
}

export default Home