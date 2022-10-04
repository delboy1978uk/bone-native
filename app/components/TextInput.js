import React from 'react';
import {StyleSheet, TextInput as NativeTextInput, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import defaultStyles from '../config/styles'

function TextInput({ icon, width = '100%', ...otherProps }) {
    return (
        <View style={ [styles.container, {width}] }>
            {icon && <MaterialCommunityIcons name={icon} size={25} color={defaultStyles.colors.medium} style={styles.icon} />}
            <NativeTextInput
                placeholderTextColor={defaultStyles.colors.medium}
                style={[styles.input, defaultStyles.text]}
                {...otherProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
    },
    input: {
        flex: 1,
    },
    icon: {
        marginRight: 10
    },
})

export default TextInput;
