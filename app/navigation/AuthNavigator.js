import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import ActivateUserScreen from "../screens/ActivateUserScreen";
import CheckEmailScreen from "../screens/CheckEmailScreen";
import RegisterScreen from "../screens/RegisterScreen";
import routes from "../navigation/routes";
import useLinking from "../hooks/useLinking";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

function AuthNavigator(props) {
    useLinking();

    return (
        <Stack.Navigator initialRouteName={'Welcome'} >
            <Stack.Screen name={routes.USER_REGISTRATION} component={RegisterScreen} />
            <Stack.Screen name={routes.USER_ACTIVATION} component={ActivateUserScreen} options={{headerShown: false}} />
            <Stack.Screen name={routes.USER_ACTIVATION_CHECK_EMAIL} component={CheckEmailScreen} options={{headerShown: false}}  />
            <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
