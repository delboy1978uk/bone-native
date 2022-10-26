import * as Linking from 'expo-linking';
import React from 'react';

import AppEntryScreen from './app/screens/AppEntryScreen'
import TestZone from './app/screens/TestZone';

export default function App() {
    return (
        <Screen style={{height: '100%'}}>
            <AppEntryScreen />
            {/*<TestZone />*/}
        </Screen>
    )
}
