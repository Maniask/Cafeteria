import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home'

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
      <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;