import { useUser } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import ClassesView from '~/components/classroom/class_view';
import { api } from '~/utils/api';

const MyCourse = () => {
  const { user } = useUser()
  const { data: courses, isLoading: isCourseLoading, isError: isCourseError } = api.student.classroom.getAll.useQuery({
    userId: user?.id ?? ""
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
    <View>
      <Stack.Screen options={{ title: "Classroom" }} />
      <ClassesView courses={courses} />
    </View>
  )
}

export default MyCourse