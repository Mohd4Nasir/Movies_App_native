import { View, Text, ScrollView, SafeAreaView, TouchableOpacity,Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import LoadingScreen from '../components/LoadingScreen';
import { fetchCreditMovies, fetchDetailsMovies, fetchDetilsMovies, fetchSimilarMovies, Image500 } from '../Api/moivesdb';

const MovieScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const { params: item } = useRoute();
  const [loading, setloading] = useState(false);
  const [isfavour, togglefavour] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setsimilarMovies] = useState([])
  const [Movies, setMovies] = useState({})


  useEffect(() => {
    console.log("item:::" + item.id);

    setloading(true)
    getDetailsMovies(item.id)
    getCreditMovies(item.id)
    getSimilarMovies(item.id)

  }, [item.id]);
  const getDetailsMovies = async (id) => {
    const data = await fetchDetailsMovies(id);
    if (data)
      setMovies(data);
    setloading(false)
  };
  const getCreditMovies = async (id) => {

    const data = await fetchCreditMovies(id);
    if (data && data.cast)
      setCast(data.cast);
    setloading(false)
  };
  const getSimilarMovies = async (id) => {

    const data = await fetchSimilarMovies(id);
    if (data && data.results)
      setsimilarMovies(data.results);
    setloading(false)
  };


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900">
      
      <View className="w-full mt-8">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-2">
          <TouchableOpacity className="bg-green-700 rounded-xl p-1" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-xl p-1" onPress={() => togglefavour(!isfavour)}>
            <HeartIcon size={30} strokeWidth={2.5} color={isfavour ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <LoadingScreen />

        ) : (
          <View className="w-full items-center mt-5 ">
            <Image
              source={{ uri: Image500(Movies?.poster_path) }}
              style={{
                width: width * 1.0,
                height: height * 0.45,
                resizeMode: 'contain',
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(22,22,22,0.8)', 'rgba(25,25,25,1)']}
              style={{ width, height: height * 0.52 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.9, y: 1.4 }}
              className="absolute"
            />
          </View>

        )


        }

      </View>
      <View style={{ marginTop: 0, alignItems: 'center' }} className="space-y-3 border-5 border-cyan-400">
        <Text className="text-white text-center text-3xl tracking-wider font-bold">
          {Movies?.title}
        </Text>
        {Movies?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {Movies?.status} -{Movies?.release_date?.split('_')[0]}- {Movies?.runtime}
          </Text>
        ) : null

        }

        <View className="flex-row justify-center mx-4 space-x-2">{Movies?.genres?.map((genre, index) => {
          let showdot = index + 1 != Movies.genres.length;
          return (
            <Text className="text-neutral-400 font-semibold text-base">{genre?.name}{showdot ? "•" : null}</Text>


          )
        })}
          {/* <Text className="text-neutral-400 font-semibold text-base">Romance •</Text>
          <Text className="text-neutral-400 font-semibold text-base">Drama •</Text> */}
        </View>
        <Text className="text-white mx-4 tracking-wider">
          {
            Movies?.overview
          }
        </Text>
      </View>
      <Cast navigation={navigation} cast={cast} />
      <MovieList title={"Simlilar Movies "} hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
};

export default MovieScreen;
