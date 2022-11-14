import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import ActivateUserScreen from "../screens/ActivateUserScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import useLinking from "../hooks/useLinking";

const Stack = createStackNavigator();

function AuthNavigator(props) {
    useLinking();

    return (
        <Stack.Navigator initialRouteName={'Welcome'} >
            <Stack.Screen name={'Register'} component={RegisterScreen} />
            <Stack.Screen name={'ActivateUser'} component={ActivateUserScreen} />
            <Stack.Screen name={'Welcome'} component={WelcomeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
