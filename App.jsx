import React from "react";
import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from "./Screens/HomeScreen";
import MovieScreen from "./Screens/MoiveScreen";
import PersonScreen from "./Screens/PersonScreen";
import SearchScreen from "./Screens/SearchScreen";
import { Text, TouchableOpacity, View } from "react-native";
import Bollywood from "./Screens/Bollywood";
import Hollywood from "./Screens/Hollywood";
import Web_series from "./Screens/Web_serious";
import Dubbed from "./Screens/Dubbed";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  return (
    <>
      <StatusBar barStyle=" default"  /> 
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Movies" component={MovieScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </>
  );
}

function CustomDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1 }} className="border rounded-4xl">
      {/* Website Name */}
      <View className="pt-10 pl4 mt-4">
        <Text className="text-white text-3xl">
          <Text className="text-red-600">V</Text>egaMovies
        </Text>
      </View>
      {/* Drawer Items */}
      <View className="pl-5 pt-5">
        <TouchableOpacity onPress={() => navigation.navigate("HomeStack")}>
          <Text className="text-white text-2xl">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("bollywood")}>
          <Text className="text-white pt-5 text-2xl">Bollywood</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("hollywood")}>
          <Text className="text-white pt-5 text-2xl">Hollywood</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("dubbed")}>
          <Text className="text-white pt-5 text-2xl">Hindi Dubbed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Series")}>
          <Text className="text-white pt-5 text-2xl">Webseries</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text className="text-white pt-5 text-2xl">Genres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main App with Drawer
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" /> {/* Global light status bar */}
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#1a1a1a", // Drawer background color
              width: 240,
            },
          }}
        >
          {/* Drawer Items */}
          <Drawer.Screen
            name="HomeStack"
            component={StackNavigator}
            options={{ title: "Home", headerShown: false }}
          />
          <Drawer.Screen
            name="bollywood"
            component={Bollywood}
            options={{ title: "Bollywood", headerShown: false }}
          />
          <Drawer.Screen
            name="dubbed"
            component={Dubbed}
            options={{ title: "Dubbed", headerShown: false }}
          />
          <Drawer.Screen
            name="Series"
            component={Web_series}
            options={{ title: "Web Series", headerShown: false }}
          />
          <Drawer.Screen
            name="hollywood"
            component={Hollywood}
            options={{ title: "Hollywood", headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
