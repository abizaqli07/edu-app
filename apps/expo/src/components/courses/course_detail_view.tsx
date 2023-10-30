import type { RouterOutputs } from '@acme/api';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '~/constants/theme';
import { api } from '~/utils/api';

interface CourseDetailProps {
  data: RouterOutputs["student"]["course"]["getOne"],
  courseId: string
}

const CourseDetailView = ({ data, courseId }: CourseDetailProps) => {
  const router = useRouter()
  const { user } = useUser()

  const joinCLass = api.student.classroom.join.useMutation({
    onSuccess(data) {
      router.push({
        pathname: "/(main)/my_course/[id]",
        params: {
          id: data[0]?.id ?? ""
        }
      })
    },
    onError(error) {
      console.log(error)
    }
  })

  return (
    <View className='p-8 pt-12'>
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
        }}>About Course</Text>
        <Text numberOfLines={4}
          style={{ color: COLORS.primaryDarkGreyHex }}
        >{data?.description}</Text>
        <View className='mt-8'>
          <TouchableOpacity
            className='p-2 rounded-xl justify-center items-center'
            style={{ backgroundColor: COLORS.primaryPurpleHex }}
            onPress={() => joinCLass.mutate({
              courseId: courseId,
              userId: user?.id ?? ""
            })}
          >
            <Text className=' text-lg font-semibold' style={{ color: COLORS.primaryWhiteHex }}>Enroll Course</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default CourseDetailView