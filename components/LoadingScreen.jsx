import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
const {width,height}=Dimensions.get('window');

export default LoadingScreen = () => {
  return (
    <View style={{width ,height}} className="absolute justify-center items-center flex-row">
    <Progress.CircleSnail thickness={12} size={160} color={'yellow'}/>
    </View>
  )
}

