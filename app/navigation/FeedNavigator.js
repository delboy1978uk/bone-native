import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator
        initialRouteName={'Listings'}
        screenOptions={{presentation: 'modal'}}
        options={{headerShown: false}}
    >
        <Stack.Screen name={'Feed'} component={ListingsScreen} />
        <Stack.Screen name={'ListingDetails'} component={ListingDetailsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
)

export default FeedNavigator;
