import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";

import Text from '../components/Text'
import Icon from '../components/Icon'
import useStyle from "../hooks/useStyle";

function CategoryPickerItem({item, onPress}) {
    const style = useStyle();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center'
        },
        label: {
            paddingTop: 5,
            textAlign: 'center',
            color: style.text.color
        }
    })

    return <TouchableOpacity onPress={onPress} style={styles.container}>
        <Icon backgroundColor={item.backgroundColor} name={item.icon} size={80}/>
        <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>;
}
export default CategoryPickerItem;
