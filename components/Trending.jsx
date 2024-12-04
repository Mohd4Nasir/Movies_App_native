import React, { useRef } from 'react';
import { Animated, Dimensions, FlatList, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image500 } from '../Api/moivesdb';
import { FireIcon } from 'react-native-heroicons/solid';

// Get device dimensions
const { width, height } = Dimensions.get('window');

export default function Trending({ data }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  if (!data || data.length === 0) {
    return (
      <View className="mb-2">


        <Text className="text-white text-2xl  mx-2">Trending</Text>
        <Text className="text-white text-center">No data available</Text>
      </View>
    );
  }
  const navigation = useNavigation();
  const handleClick = ({ item }) => {

    navigation.navigate('Movies', item)

  }

  const renderItem = ({ item, index }) => (
    <MovieCard item={item} index={index} scrollX={scrollX} handleClick={handleClick} />
  );

  return (

    <View className="mb-2">
      <Text className="text-white text-3xl mx-2 mt-2"> <FireIcon size={35} color={'white'} strokeWidth={2} />
        Trending</Text>
      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );
}

const MovieCard = ({ item, index, scrollX, handleClick }) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.2, 0.8, 0.5],
    extrapolate: 'clamp',
  });

  return (
    <TouchableWithoutFeedback onPress={() => { handleClick({ item }) }}>
      <Animated.View
        style={{
          width: width * 1, // Full width of the screen
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ scale }], // Apply scaling
        }}
      >
        <Image
          source={{ uri: Image500(item.poster_path) }}
          style={{
            width: width * 0.6, // Half the screen width
            height: height * 0.7, // 80% of the screen height
            aspectRatio: 0.7, // Correct numeric aspect ratio
            borderRadius: 40, // Apply rounded cornersbi
            resizeMode: 'contain', // Maintain image aspect ratio
          }}
        />
      </Animated.View>

    </TouchableWithoutFeedback>
  );
};


