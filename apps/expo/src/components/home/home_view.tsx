import type { RouterOutputs } from '@acme/api'
import { FlashList } from '@shopify/flash-list'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CustomIcon from '~/components/custom_icon'
import HeaderBar from '~/components/header_bar'
import { COLORS, FONTSIZE, SPACING } from '~/constants/theme'
import CourseCard from '../course_card'

interface HomeProps {
  categories: RouterOutputs["category"]["getAll"],
  courses: RouterOutputs["student"]["course"]["getAll"]
}

const HomeView = (
  { categories, courses }: HomeProps
) => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >

      {/* App Header */}
      <HeaderBar />

      <Text
        className='text-2xl font-semibold pl-8'
        style={{ color: COLORS.primaryWhiteHex }}
      >
        Find the best{'\n'}course for you
      </Text>

      {/* Search Input */}

      <View
        className='flex-row m-8 rounded-2xl items-center'
        style={{ backgroundColor: COLORS.primaryDarkGreyHex }}
      >
        <TouchableOpacity
          onPress={() => { console.log("Pressed") }}>
          <CustomIcon
            className='mx-5'
            name="search"
            size={FONTSIZE.size_18}
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Find Your Coffee..."
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
          }}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          className='flex-1 h-5 font-medium text-sm'
          style={{ color: COLORS.primaryWhiteHex }}
        />
      </View>

      {/* Category Scroller */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SPACING.space_20, marginBottom: SPACING.space_20 }}>
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
          paddingHorizontal: SPACING.space_30,
        }}
        ItemSeparatorComponent={() => <View className='w-2' />}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <Link asChild href={{
              pathname: "/course/[id]",
              params: { id: item.id }
            }}>
              <CourseCard
                data={item} />
            </Link>
          )
        }}
      />


    </ScrollView>

  )
}

export default HomeView