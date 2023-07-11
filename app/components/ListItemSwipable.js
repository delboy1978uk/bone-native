import React from 'react';
import {StyleSheet, TouchableHighlight, View} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Image from '../components/Image'
import Text from '../components/Text'
import colors from '../config/colors'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useStyle from "../hooks/useStyle";

function ListItemSwipable({title, subtitle, image, IconComponent, onPress, renderRightActions, displayCheverons}) {
    const style = useStyle();

    if (!title && subtitle) {
        title = subtitle;
        subtitle = null;
    }

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
            fontWeight: "500"
        },
        subtitle: {
            color: colors.medium
        }
    });

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.light} onPress={onPress} >
                <View style={styles.container}>
                    { IconComponent }
                    { image && <Image style={styles.image} source={image}></Image> }
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            { title }
                        </Text>
                        {subtitle && <Text numberOfLines={2} style={styles.subtitle}>{subtitle}</Text> }
                    </View>
                    { displayCheverons && <MaterialCommunityIcons name={'chevron-right'} size={25} color={colors.medium}/> }
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

export default ListItemSwipable;
