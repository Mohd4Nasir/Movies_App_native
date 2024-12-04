import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native';
import { Image342 } from '../Api/moivesdb';
const { width, height } = Dimensions.get('window');


const MovieList = ({ title, data, hideseeAll }) => {
  const navigation = useNavigation();

  return (
    <View className=" mb-10 space-y-4">
      <View className="mx-4 flex-row  justify-between items-center">
        <Text className="text-white  text-2xl mb-4 ">{title}</Text>
        {

          !hideseeAll && (<TouchableOpacity>
            <Text className="text-yellow-500 text-xl">See all</Text>
          </TouchableOpacity>)
        }


      </View>
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontial: 15 }}>

        { 
          data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movies', { movieData: item })}
            >
              <View className="space-y-2 ">
                <Image
                  source={{ uri: Image342(item.poster_path) }}
                  style={{
                    width: width * 0.33, // Responsive width
                    height: height * 0.22, // Responsive height
                    borderRadius: 20, // Rounded corners
                    resizeMode: 'contain', // Maintain aspect ratio
                  }}
                />
                <Text className="text-white mx-4">
                  {item.title?.length > 15 ? item.title.slice(0, 15) + '...' : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })}

      </ScrollView>
    </View>
  )
}

export default MovieList