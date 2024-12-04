import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import debounce from 'lodash.debounce';
import LoadingScreen from '../components/LoadingScreen'; // Import your LoadingScreen component
import { fetchSearchMovies, Image185 } from '../Api/moivesdb'; // Ensure these imports match your API structure

const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    debounce(async (value) => {
      if (value.length > 2) {
        setLoading(true);
        try {
          const data = await fetchSearchMovies({
            query: value,
            include_adult: 'false',
            language: 'en-US',
            page: '1',
          });
          setLoading(false);
          if (data?.results) setResult(data.results);
          else setResult([]);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching movies:', error);
          setResult([]);
        }
      } else {
        setLoading(false);
        setResult([]);
      }
    }, 400),
    []
  );

  const handleInputChange = (text) => {
    setResult([]);
    handleSearch(text);
  };

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* Search Bar */}
      <View className="mx-4 mb-3 flex-row justify-between items-center mt-10 border border-neutral-500 rounded-xl">
        <TextInput
          onChangeText={handleInputChange}
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          className="rounded-full p-2 m-1 bg-neutral-200"
          onPress={() => navigation.navigate('Home')}
        >
          <XMarkIcon size={20} color="red" />
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {loading ? (
        <LoadingScreen />
      ) : result.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({result.length})
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {result.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Movies', item)}
              >
                <View className="space-y-2 mb-2" style={{ width: '48%' }}>
                  <Image
                    className="rounded-3xl"
                    source={{ uri: Image185(item?.poster_path) }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item?.title.length > 22
                      ? item?.title.slice(0, 22) + '....'
                      : item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        // No Results
        <View className="justify-center items-center mt-8 flex-col">
          <Image
            source={require('../assets/popcorn-image_8264.jpg')}
            className="h-96 w-96 rounded-xl"
          />
          <Text className="text-center text-white mt-4">
            No Movies Available
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
