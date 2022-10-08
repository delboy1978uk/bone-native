import * as Linking from 'expo-linking';
import React from 'react';

import AppEntryScreen from './app/screens/AppEntryScreen'
import Screen from './app/components/Screen';
import TestZone from './app/screens/TestZone';

export default function App() {
    return (
<<<<<<< Updated upstream
        <Screen style={{height: '100%'}}>
=======
        <Screen>
>>>>>>> Stashed changes
            <AppEntryScreen />
            {/*<TestZone />*/}
        </Screen>
    )
}
