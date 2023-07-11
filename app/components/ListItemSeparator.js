import React from 'react';
import {StyleSheet, View} from "react-native";

import colors from '../config/colors'
import useStyle from "../hooks/useStyle";

function ListItemSeparator() {
    const style = useStyle();

    const styles = StyleSheet.create({
        separator: {
            width: '100%',
            height: 1,
            backgroundColor: style.backgroundColor
        }
    })

    return (
        <View style={styles.separator} />
    );
}

export default ListItemSeparator;
