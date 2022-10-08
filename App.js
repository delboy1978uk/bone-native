import * as Linking from 'expo-linking';
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

// import * as React from 'react';
// import { Button, Text, View } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
//
// WebBrowser.maybeCompleteAuthSession();
// const useProxy = true;
// const redirectUri = AuthSession.makeRedirectUri({
//     useProxy,
// });
//
// export default function App() {
//     const discovery = AuthSession.useAutoDiscovery('https://demo.identityserver.io');
//     // Create and load an auth request
//     const [request, result, promptAsync] = AuthSession.useAuthRequest(
//         {
//             clientId: 'native.code',
//             redirectUri,
//             scopes: ['openid', 'profile', 'email', 'offline_access'],
//         },
//         discovery
//     );
//
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Button title="Login!" disabled={!request} onPress={() => promptAsync({ useProxy })} />
//             {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
//         </View>
//     );
// }
