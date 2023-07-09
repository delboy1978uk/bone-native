import React from 'react';

import {FlatList, StyleSheet, View} from "react-native";
import ListItemFlipswitch from '../components/ListItemFlipswitch'
import DarkModeSetting from '../components/DarkModeSetting'
import Icon from '../components/Icon'
import Screen from '../components/Screen'
import colors from '../config/colors'
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import useAuth from "../hooks/useAuth";

function SettingsScreen({ navigation }) {
    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <DarkModeSetting />

                <ListItemFlipswitch
                    IconComponent={<Icon name={'brightness-2'} backgroundColor={colors.dark} />}
                    title={'हिन्दी'}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light
    },
    container: {
        marginVertical: 20
    }
});

export default SettingsScreen;
