import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Image} from 'react-native-expo-image-cache';

import Text from './Text'
import colors from '../config/colors'

function Card({title, subtitle, imageUrl, onPress, thumbnaiilUrl}) {
    return (
        <TouchableWithoutFeedback onPress={onPress} >
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    uri={imageUrl}
                    preview={{uri: thumbnaiilUrl}}
                    tint={'light'}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={styles.subtitle} numberOfLines={5}>
                        {subtitle}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: "hidden"
    },
    image: {
        width: '100%',
        height: 200,
    },
    detailsContainer: {
        padding: 20,
    },
    subtitle: {
        color: 'red'
    }
});

export default Card;
