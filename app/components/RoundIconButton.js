import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from '../config/colors'

function RoundIconButton({ icon, onPress = () => {}, style }) {
    const combinedStyle =  { ...styles.container, ...style };

    return (
        <TouchableOpacity onPress={ onPress } >
            <View style={combinedStyle}>
                <MaterialCommunityIcons style={styles.icon} name={icon} size={40}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        borderColor: colors.white,
        borderWidth: 5,
        borderRadius: 40,
        height: 80,
        width: 80,
        bottom: 25
    },
    icon: {
        color: colors.white
    }
})

export default RoundIconButton;
