import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchTVSeries, fetchTVSeriesbolly, Image185 } from '../Api/moivesdb';
import LoadingScreen from '../components/LoadingScreen';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
const { width, height } = Dimensions.get('window');


const Bollywood = () => {
    const navigation = useNavigation();

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTvSeriesbolly();
    }, []);

    const getTvSeriesbolly = async () => {
        try {
            setLoading(true);
            const response = await fetchTVSeriesbolly(); 
            if (response && response.results) {
                setResult(response.results);
            }
        } catch (error) {
            console.error('Error fetching TV series:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-10">
                <TouchableOpacity className="bg-green-700 rounded-xl p-3" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                <Text className="text-white font-bold text-4xl"><Text className=" text-red-600">V</Text>egaMovies </Text>

            </View>

            <View className=" pt-16 mt-8">
                <Text className="text-white text-4xl pl-2">Bollywood</Text>
                {loading ? (
                    <LoadingScreen /> // Show loading screen
                ) : result.length > 0 ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 15 }}
                        className="space-y-3"
                    >
                        
                        <View className="flex-row flex-wrap justify-between mt-6">
                            {result.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                // onPress={() => navigation.navigate('Movies', item)}
                                >
                                    <View className="space-y-2 mb-2" style={{ width: '48%' }}>
                                        <Image
                                            className="rounded-3xl"
                                            source={{ uri: Image185(item?.poster_path) }}
                                            style={{ width: width * 0.44, height: height * 0.3 }}
                                        />
                                        <Text className="text-neutral-300 ml-1">
                                            {item?.title?.length > 22
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
                            No Web Series Available
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Bollywood