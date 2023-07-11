import * as Linking from 'expo-linking';
import React from 'react';
import {View, useColorScheme} from "react-native";

import AppEntryScreen from './app/screens/AppEntryScreen'
import TestZone from './app/screens/TestZone';
import useStyle from './app/hooks/useStyle'

export default function App() {
    const style = useStyle();

    return (
        <View style={{height: '100%', backgroundColor: style.backgroundColor}}>
            <AppEntryScreen />
            {/*<TestZone />*/}
        </View>
    )
}
