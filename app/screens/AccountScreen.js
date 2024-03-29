import React from 'react';

import {FlatList, StyleSheet, View} from "react-native";
import ListItemSwipable from '../components/ListItemSwipable'
import Icon from '../components/Icon'
import Screen from '../components/Screen'
import colors from '../config/colors'
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import useAuth from "../hooks/useAuth";
import useStyle from "../hooks/useStyle";

const menuItems = [
    {
        title: "Settings",
        icon: {
            name: "cog",
            backgroundColor: colors.primary
        },
        targetScreen: 'Settings'
    },
    {
        title: "Sample Map",
        icon: {
            name: "map-marker",
            backgroundColor: colors.secondary
        },
        targetScreen: 'Sample Map'
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.primary
        },
        targetScreen: 'Messages'
    },
];

function AccountScreen({ navigation }) {
    const { user, logout } = useAuth();
    const style = useStyle();

    const styles = StyleSheet.create({
        screen: {
            backgroundColor: style.backgroundColor
        },
        container: {
            marginVertical: 20
        }
    });

    return (
        <Screen style={styles.screen}>
            <View style={styles.container}>
                <ListItemSwipable
                    title={user.person?.firstname}
                    subtitle={user.email}
                    image={{ uri: user.person?.image}}
                    onPress={() => navigation.navigate(routes.USER_EDIT_PROFILE)}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    ItemSeparatorComponent={() => <ListItemSeparator />}
                    keyExtractor={menuItem => menuItem.title}
                    renderItem={ ({item}) =>
                        <ListItemSwipable
                            title={item.title}
                            IconComponent={<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />}
                            onPress={() => navigation.navigate(item.targetScreen) }
                        />
                    }
                />
            </View>
            <ListItemSwipable
                title="Log Out"
                IconComponent={
                    <Icon name="logout" backgroundColor="#ffe66d" />
                }
                onPress={logout}
            />
        </Screen>
    );
}

export default AccountScreen;
