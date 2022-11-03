import React, {useEffect, useState} from 'react';

import Card from '../components/Card'
import Screen from '../components/Screen'
import {FlatList, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

import listingsApi from '../api/listings'
import colors from '../config/colors'
import ActivityIndicator from '../components/ActivityIndicator'
import Button from '../components/Button'
import Text from '../components/Text'
import routes from '../navigation/routes'
import useApi from '../hooks/useApi'

function ListingsScreen({navigation}) {

    const getListingsApi = useApi(listingsApi.getListings);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getListingsApi.request();
    }, []);

    return (
        <>
        <ActivityIndicator visible={getListingsApi.loading}  type={'overlay'}/>
        <Screen style={styles.screen}>
            { getListingsApi.error &&
                <View>
                    <Text>Could not retrieve the listings</Text>
                    <Button textColor={'white'} color={'primary'} title={'retry'} onPress={ () => getListingsApi.request() }/>
                </View>
            }
            <FlatList
                data={getListingsApi.data}
                keyExtractor={listing => listing.id}
                onRefresh={() => {
                    getListingsApi.request()
                    getListingsApi.request()
                    getListingsApi.request()
                }}
                refreshing={refreshing}
                renderItem={ ({item}) => {
                    return <Card
                        title={item.title}
                        subtitle={"€" + item.price}
                        imageUrl={item.images[0].url}
                        thumbnailUrl={item.images[0].thumbnailUrl}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
                    />
                }
                }
            />
        </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 10,
        backgroundColor: colors.light
    }
})

export default ListingsScreen;
