import { Stack, useGlobalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import ClassDetailView from '~/components/classroom/class_detail';
import { api } from '~/utils/api';
const MyCourseDetails = () => {

  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  const { data, isLoading, isError } = api.student.course.getOne.useQuery({
    courseId: id
  })

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (isError) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    )
  }

  return (
    <View>
      <Stack.Screen options={{ title: data?.title }} />
      <ClassDetailView data={data} />
    </View>
  )
}

export default MyCourseDetails


