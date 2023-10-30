import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router';
import { api } from '~/utils/api';
import ChapterDetailView from '~/components/classroom/chapter_detail_view';

const ChapterDetails = () => {

  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");

  const { data, isLoading, isError } = api.student.course.getChapter.useQuery({
    chapterId: id
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
      <ChapterDetailView data={data} />
    </View>
  )
}

export default ChapterDetails