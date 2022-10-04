import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import Constants from 'expo-constants'

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from '../components/Screen';

const initialMessages = [
    {
        id: 1,
        title: 'Choufke',
        description: 'Derek McLean',
        image: require('../assets/delboy.jpg'),
    },
    {
        id: 2,
        title: 'Honey Bunny Bee',
        description: 'Gretl Michielsen',
        image: require('../assets/gretl.png'),
    },
    {
        id: 3,
        title: 'Teddicus Maximus',
        description: 'Teddy',
        image: require('../assets/teddy.png'),
    },
    {
        id: 4,
        title: 'Teddicus Minimus',
        description: 'Django',
        image: require('../assets/django.png'),
    },
    {
        id: 5,
        title: 'Bonny Moo',
        description: 'The Hieland Coo',
        image: require('../assets/moo.png'),
    },
    {
        id: 6,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: require('../assets/mosh.jpg'),
    },
];



function MessagesScreen() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);
    const handleDelete = message => {
        // delete call to server, then upon success:
        setMessages(messages.filter(m => m.id !== message.id));
    }
    const renderItem = ({item}) =>
        <ListItem title={item.title}
                  subtitle={item.description}
                  image={item.image}
                  onPress={() => alert('wtf')}
                  renderRightActions={() => (<ListItemDeleteAction onPress={() => handleDelete(item)}/>)}
                  displayCheverons={true}
        /> ;

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <ListItemSeparator />}
                refreshing={refreshing}
                onRefresh={() => setMessages(initialMessages)}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({

})

export default MessagesScreen;
