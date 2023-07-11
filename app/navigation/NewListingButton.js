import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from '../config/colors'
import useStyle from "../hooks/useStyle";

function NewListingButton({ onPress }) {
    const style = useStyle();

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'tomato',
            borderColor: style.backgroundColor,
            borderWidth: 10,
            borderRadius: 40,
            height: 80,
            width: 80,
            bottom: 25
        },
        icon: {
            color: style.navButton.color
        },
        tab: {
            backgroundColor: style.backgroundColor
        }
    })

    return (
        <View style={styles.tab}>
            <TouchableOpacity onPress={ onPress } >
                <View style={styles.container}>
                    <MaterialCommunityIcons style={styles.icon} name={'plus-circle'} size={40}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default NewListingButton;
