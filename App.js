import * as Linking from 'expo-linking';
import React from 'react';
import {View} from "react-native";

import AppEntryScreen from './app/screens/AppEntryScreen'
import TestZone from './app/screens/TestZone';

export default function App() {
    return (
        <View style={{height: '100%'}}>
            <AppEntryScreen />
            {/*<TestZone />*/}
        </View>
    )
}
