//npm i @react-native-community/masked-view  @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated@2.2.4 react-native-safe-area-context react-native-screens @react-navigation/native

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import StackN from './src/navigator/Navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Homescreen, Bondsdetails, Portfolioscreen } from '../screens';

const Stack = createStackNavigator();

export default function Homestack({ userData }) {
  // console.log('userData',userData);
  return (

    <Stack.Navigator screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Homescreen"
        children={() => <Homescreen userData={userData} />}
      />
      <Stack.Screen name="Bondsdetails" component={Bondsdetails} />
      {/* <Stack.Screen name="Portfolioscreen" component={Portfolioscreen} /> */}
    </Stack.Navigator>
  );
}
