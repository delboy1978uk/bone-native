import React from 'react';
import {Text as NativeText, StyleSheet} from "react-native";

import defaultStyles from '../config/styles'
import colors from "../config/colors";

function Text({children, style, ...otherProps}) {
    return (
        <NativeText style={[defaultStyles.text, style]} {...otherProps} >
            {children}
        </NativeText>
    )
}

export default Text;
