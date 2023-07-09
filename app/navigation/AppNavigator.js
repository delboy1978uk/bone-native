import * as Device from 'expo-device';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';

import AccountNavigator from "../navigation/AccountNavigator";
import ApiInterceptor from "../components/ApiInterceptor";
import expoPushTokensApi from '../api/expoPushTokens';
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "../navigation/NewListingButton";
import FeedNavigator from "../navigation/FeedNavigator";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import navigation from "../navigation/rootNavigation";
import useNotifications from "../hooks/useNotifications";
import useStyle from "../hooks/useStyle";

const Tab = createBottomTabNavigator();

function AppNavigator(props) {
    useNotifications();
    const {token, setToken} = useState(null);
    const style = useStyle();

    return (
        <>
        <ApiInterceptor></ApiInterceptor>
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarActiveBackgroundColor: style.backgroundColor,
                tabBarInactiveBackgroundColor: style.backgroundColor,
                tabBarInactiveTintColor: "grey",
                tabBarStyle: [
                    {
                        display: "flex",
                    },
                    null
                ],
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tab.Screen
                name={'Listings'}
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({size, color}) => <MaterialCommunityIcons name={'home'} size={size} color={color}/>,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={'FeedEdit'}
                component={ListingEditScreen}
                options={ ({ navigation }) => ({
                        tabBarButton: props => (<NewListingButton onPress={ () => navigation.navigate('FeedEdit') } />)
                    })
                }
            />
            <Tab.Screen
                name={'Summary'}
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({size, color}) => <MaterialCommunityIcons name={'account'} size={size} color={color}/>,
                    headerShown: false
                }}
            />
        </Tab.Navigator>
        </>
    )
}

export default AppNavigator;
