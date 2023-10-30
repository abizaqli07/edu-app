import { Dimensions, FlatList, Image, View, TextInput } from 'react-native';
import { COLORS } from '~/constants/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeSlider() {

  return (
    <View className='mt-1'>
      {/* <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className=' mx-auto'>
            <Image source={require("../../../assets/images/banner.png")}
              style={{
                width: Dimensions.get('screen').width * 0.87
                , height: 170, borderRadius: 10, marginRight: 15
              }}
            />
          </View>
        )}
      /> */}
      <View className='flex flex-row bg-white p-2 rounded-lg mt-4 items-center' style={{ elevation: 3 }}>
        <Ionicons name="search" size={24}
          color={COLORS.primaryGreyHex} style={{ marginRight: 10 }} />
        <TextInput placeholder='Search' />
      </View>

      <View className=' mx-auto mt-4'>
        <Image source={require("../../../assets/images/banner.png")}
          style={{
            width: Dimensions.get('screen').width * 0.83
            , height: 170, borderRadius: 10
          }}
        />
      </View>
    </View>
  )
}
