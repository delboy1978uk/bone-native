import React from 'react';
import {View, StyleSheet, Platform, TouchableOpacity, TouchableHighlight} from "react-native";

import Text from '../components/Text'
import colors from '../config/colors'
import defaultStyles from '../config/styles'

function Button({title, onPress, color, textColor}) {
    return (
        <TouchableHighlight style={[styles.roundbutton, {
            backgroundColor: color ? colors[color]: styles.roundbutton.color,
        }]} onPress={onPress}>
            <Text style={[styles.text, {
                color: textColor ? colors[textColor] : styles.text.color}]
            }>{title}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    roundbutton: {
        width: '100%',
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        color: colors.black
    },
    text: {
        fontFamily: defaultStyles.text.fontFamily,
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default Button;
