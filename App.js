import * as Linking from 'expo-linking';
import React from 'react';

import AppEntryScreen from './app/screens/AppEntryScreen'
import Screen from './app/components/Screen';
import TestZone from './app/screens/TestZone';
import TokenZone from './app/screens/TokenZone';

export default function App() {
    return (
        <Screen style={{height: '100%'}}>
            <AppEntryScreen />
            {/*<TokenZone />*/}
            {/*<TestZone />*/}
        </Screen>
    )
}
