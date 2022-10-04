import React from 'react';
import {View, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function Icon({name, size = 40, backgroundColor, borderRadius , iconColor = 'white'}) {
    borderRadius = borderRadius ? borderRadius : size /2;

    const styles = StyleSheet.create({
        icon: {
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
            justifyContent: "center",
            alignItems: "center"
        }
    });

    return (
        <View style={styles.icon}>
            <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
        </View>
    );
}



export default Icon;
