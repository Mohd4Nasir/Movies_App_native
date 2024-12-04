import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Trending from '../components/Trending'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import LoadingScreen from '../components/LoadingScreen'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../Api/moivesdb'

const Home = () => {
    const [trending, settrending] = useState([])
    const [upcoming, setupcoming] = useState([])
    const [toprated, settoprated] = useState([])
    const [loading, setloading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()

    }, [])
    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results)
            settrending(data.results);
        setloading(false)
    };
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results)
            setupcoming(data.results);
        setloading(false)
    };
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results)
            settoprated(data.results);
        setloading(false)
    };



    return (

        <View className=" flex-1 bg-neutral-600 ">
            <SafeAreaView className="mt-10 ">
                <View className=" flex flex-row justify-between items-center h-16">
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color={'white'} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-4xl"><Text className=" text-red-600">V</Text>egaMovies </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}
                    >
                    <MagnifyingGlassIcon size="30" strokeWidth={2} color={'white'}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <LoadingScreen />

                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>
                        {trending.length > 0 && <Trending data={trending}></Trending>}
                        {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}
                        <MovieList title="Top Rated" data={toprated} />
                    </ScrollView>
                )
            }


        </View>
    )
}

export default Home

