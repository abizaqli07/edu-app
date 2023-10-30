import type { RouterOutputs } from '@acme/api';
import type { AVPlaybackStatus } from 'expo-av';
import { ResizeMode, Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '~/constants/theme';

interface ChapterDetailViewProps {
  data: RouterOutputs["student"]["course"]["getChapter"]
}

const ChapterDetailView = ({ data }: ChapterDetailViewProps) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();
  const [orientationLandscape, setOrientation] = useState(true)

  const changeScreenOrientation = async () => {
    if (orientationLandscape == true) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else if (orientationLandscape == false) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }

  const toggleOrientation = async () => {
    setOrientation(!orientationLandscape)
    await changeScreenOrientation()
  }

  return (
    <View className='p-8'>
      <View>
        <Video
          ref={video}
          source={{ uri: data?.videoUrl ?? "" }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold'
          }}>{data?.title}</Text>
          <Text style={{
            marginTop: 10,
            fontSize: 16, fontWeight: 'bold'
          }}>About Chapter</Text>
          <Text numberOfLines={4}
            style={{ color: COLORS.primaryDarkGreyHex }}>{data?.description}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChapterDetailView