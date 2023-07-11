import React, {useEffect} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from "react-native";
import {Image} from 'react-native-expo-image-cache';
import * as Notifications from "expo-notifications";
import * as Yup from "yup";

import colors from '../config/colors'
import ContactSellerForm from '../components/ContactSellerForm';
import ListItemSwipable from '../components/ListItemSwipable'
import Text from '../components/Text'
import useStyle from "../hooks/useStyle";

function ListingDetailsScreen({ route }) {
    const style = useStyle();
    const listing = route.params;
    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        image: {
            width: '100%',
            height: 200
        },
        detailsContainer: {
        },
        userContainer: {
            marginVertical: 10,
        },
        title: {
            paddingHorizontal: 20,
            paddingTop: 20,
            fontSize: 24,
            fontWeight: '500',
            color: style.text.color
        },
        price: {
            paddingHorizontal: 20,
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.secondary,
            marginVertical: 10
        }
    });

    return (
        <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
        >
            <Image style={styles.image} tint="light" preview={{uri: listing.images[0].thumbnailUrl}} uri={listing.images[0].url } />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.price}>${listing.price}</Text>
                <View style={styles.userContainer}>
                    <ListItemSwipable
                        image={require('../assets/gretl.png')}
                        title="Gretl Michielsen"
                        subtitle="5 listings"
                    />
                </View>
            </View>
            <ContactSellerForm listing={listing} />
        </KeyboardAvoidingView>
    );
}

export default ListingDetailsScreen;
