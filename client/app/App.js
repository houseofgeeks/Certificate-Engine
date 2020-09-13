import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from "./screens/welcome";
import scanner from "./screens/scanner";
import manage from "./screens/manage";
import details from "./screens/details";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="welcome" component={welcome} />
        <Stack.Screen name="scanner" component={scanner} />
        <Stack.Screen name="manage" component={manage} />
        <Stack.Screen name="details" component={details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
