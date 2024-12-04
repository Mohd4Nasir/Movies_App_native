import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import LoadingScreen from '../components/LoadingScreen';
import { fetchPersoncast, fetchPersonMovies, Image342 } from '../Api/moivesdb';

const { width, height } = Dimensions.get('window');

const PersonScreen = () => {
    const [isFavour, setIsFavour] = useState(false);
    const navigation = useNavigation();
    const { params: item } = useRoute();
     const [personMovie, setPersonMovie] = useState([]);
    const [person, setPerson] = useState({});

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPersoncast(item.id)
        getPersonMovies(item.id)

    }, [item.id])

    const getPersoncast = async (id) => {
        const data = await fetchPersoncast(id);
        if (data)
            setPerson(data);
        setLoading(false)
    };
    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        console.log('Fetched PersonMovies:::', data);
        if (data&& data.cast)
            setPersonMovie(data.cast);
        setLoading(false)
    };
    return (
        <ScrollView className="flex-1 bg-neutral-900 py-5">
            {/* Header */}
            <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-8">
                <TouchableOpacity className="bg-green-700 rounded-xl p-2" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-xl p-2" onPress={() => setIsFavour(!isFavour)}>
                    <HeartIcon size={30} strokeWidth={2.5} color={isFavour ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {loading ? (
                <LoadingScreen />
            ) : (
                <>
                    {/* Profile Picture */}
                    <View className="flex items-center justify-center mt-16 w-full">
                        <View
                            className="rounded-full shadow-lg"
                            style={{
                                shadowColor: 'red',
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 0.5,
                                shadowRadius: 10,
                                elevation: 8,
                            }}
                        >
                            <View className="overflow-hidden rounded-full h-72 w-72 border-2 border-neutral-400">
                                <Image
                                    source={{ uri: Image342(person?.profile_path) }}
                                    style={{
                                        height: 248,
                                        width: 248,
                                        resizeMode: 'cover',
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Person Details */}
                    <View  className="space-y-4 ">
                        <Text className="text-white text-3xl font-bold tracking-wider text-center">
                            {person?.name}                     
                               </Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {person?.place_of_birth}                             
                             </Text>

                        {/* Stats */}
                        <View className="w-full flex-row justify-between items-center bg-neutral-300 rounded-3xl py-4 px-4">
                            <View className="items-center border-r-2 border-r-neutral-400 px-1">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-600 text-lg">{person?.gender == 1 ? "femali" : 'male'}</Text>
                            </View>
                            <View className="items-center border-r-2 border-r-neutral-400 px-2">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-600 text-sm">{person?.birthday}</Text>
                            </View>
                            <View className="items-center border-r-2 border-r-neutral-400 px-2">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-600 text-sm">{person?.known_for_department}</Text>
                            </View>
                            <View className="items-center px-2">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-600 text-sm">{person?.popularity?.toFixed(2)}</Text>
                            </View>
                        </View>

                        {/* Biography */}
                        <View className="w-full space-y-2 px-4">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-500 tracking-wide">
                                {person.biography || "NA"}
                            </Text>
                        </View>

                        {/* Movies */}
                        <MovieList title="Person Movies" data={personMovie} />
                    </View>
                </>
            )}
        </ScrollView>
    );
};

export default PersonScreen;
