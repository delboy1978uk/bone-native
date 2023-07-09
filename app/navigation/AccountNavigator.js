import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import PlaceholderScreen from "../screens/PlaceholderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator();

function AccountNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Account'} component={AccountScreen} />
            <Stack.Screen name={'Settings'} component={SettingsScreen} />
            <Stack.Screen name={'Edit Profile'} component={EditProfileScreen} />
            <Stack.Screen name={'Listings'} component={PlaceholderScreen} />
            <Stack.Screen name={'Messages'} component={MessagesScreen} />
            <Stack.Screen name={'Log Out'} component={WelcomeScreen} />
        </Stack.Navigator>
    );
}

export default AccountNavigator;
