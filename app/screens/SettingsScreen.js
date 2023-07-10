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
import useStyle from "../hooks/useStyle";

function SettingsScreen({ navigation }) {
    const style = useStyle();

    const styles = StyleSheet.create({
        screen: {
            backgroundColor: style.backgroundColor
        }
    });

    return (
        <Screen style={styles.screen}>
            <DarkModeSetting />
        </Screen>
    );
}

export default SettingsScreen;
