import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

function AuthNavigator(props) {
    return (
        <Stack.Navigator
            initialRouteName={'Welcome'}
        >
            <Stack.Screen name={'Login'} component={LoginScreen} />
            <Stack.Screen name={'Register'} component={RegisterScreen} />
            <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default AuthNavigator;
