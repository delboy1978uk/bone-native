import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Image} from 'react-native-expo-image-cache';

import Text from './Text'
import colors from '../config/colors'
import useStyle from "../hooks/useStyle";

function Card({title, subtitle, imageUrl, onPress, thumbnaiilUrl}) {
    const style = useStyle();

    const styles = StyleSheet.create({
        card: {
            borderRadius: 15,
            backgroundColor: style.box.backgroundColor,
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
        title: {
          color: style.text.color
        },
        subtitle: {
            color: style.errorText.color
        }
    });

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

export default Card;
