import React from 'react';
import {StyleSheet, View} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Image from "./Image";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import Text from '../components/Text'
import colors from "../config/colors";

function ListItemFlipswitch({title, IconComponent, isOn, onColor, offColor, onToggle = () => {}}) {
    return (
        <View style={styles.container}>
            {IconComponent}
            <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
            <ToggleSwitch
                isOn={isOn}
                onColor={onColor}
                offColor={offColor}
                size="large"
                onToggle={onToggle}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: colors.white
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "500",
    },
    subtitle: {
        color: colors.medium
    }
});

export default ListItemFlipswitch;
