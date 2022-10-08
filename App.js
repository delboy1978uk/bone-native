// import * as Linking from 'expo-linking';
import React from 'react';

import AppEntryScreen from './app/screens/AppEntryScreen'
import Text from './app/components/Text'
import Screen from './app/components/Screen';
import {Image} from "react-native";

export default function App() {

    return (
        <Screen style={{height: '100%'}}>
            <AppEntryScreen />
        </Screen>
    )
}
