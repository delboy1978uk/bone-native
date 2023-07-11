import React, {useEffect, useState} from 'react';

import {FlatList, StyleSheet, View} from "react-native";
import ListItemFlipswitch from '../components/ListItemFlipswitch'
import Icon from '../components/Icon'
import Screen from '../components/Screen'
import colors from '../config/colors'
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import useStyle from "../hooks/useStyle";
import userApi from '../api/users'
import ActivityIndicator from "../components/ActivityIndicator";

function SettingsScreen({ navigation }) {
    const [toggleEmail, setToggleEmail] = useState(true);
    const style = useStyle();
    const getSettingsApi = useApi(userApi.userSettings);
    const updateSettingsApi = useApi(userApi.updateUserSettings);
    const settings = {
        email: toggleEmail
    }

    useEffect(() => {
        const init = async () => {
            await getSettingsApi.request()
                .then(async result => {
                    if ('email' in result.data) {
                        setToggleEmail(result.data.email)
                    } else {
                        setToggleEmail(settings.email);
                        updateSettings();
                    }
                })

        };
        init();
    }, []);

    const styles = StyleSheet.create({
        screen: {
            backgroundColor: style.backgroundColor
        }
    });

    const updateSettings = () => {
        updateSettingsApi.request(settings);
    }

    return (
        <>
        <ActivityIndicator visible={updateSettingsApi.loading || getSettingsApi.loading}  type={'overlay'}/>
        <Screen style={styles.screen}>
            <ListItemFlipswitch
                IconComponent={<Icon name={'email'} backgroundColor={colors.primary} />}
                title={'Receive Email'}
                onToggle={async () => {
                    setToggleEmail(!toggleEmail);
                    settings.email = !toggleEmail;
                    updateSettings();
                } }
                isOn={toggleEmail}
            />
        </Screen>
        </>
    );
}

export default SettingsScreen;
