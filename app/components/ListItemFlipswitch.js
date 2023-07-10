import React from 'react';
import {StyleSheet, View} from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import Image from "./Image";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import Text from '../components/Text'
import colors from "../config/colors";
import useStyle from "../hooks/useStyle";

function ListItemFlipswitch({title, subtitle, IconComponent, isOn, onColor, offColor, onToggle = () => {}}) {
    const style = useStyle();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: style.box.backgroundColor
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
            color: style.text.color,
            fontWeight: "500",
        },
        subtitle: {
            color: colors.medium
        }
    });

    onColor = onColor ? onColor : style.flipswitch.onColor
    offColor = offColor ? offColor : style.flipswitch.offColor

    return (
        <View style={styles.container}>
            {IconComponent}
            <View style={styles.detailsContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {subtitle && <Text numberOfLines={2} style={styles.subtitle}>{subtitle}</Text> }
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

export default ListItemFlipswitch;
