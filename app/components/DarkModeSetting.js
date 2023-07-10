import React, {useState} from 'react';
import {StyleSheet, useColorScheme} from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";
import ListItemFlipswitch from "./ListItemFlipswitch";
import Text from "./Text";

function DarkModeSetting(props) {
    const [toggle, setToggle] = useState(true);
    const colorScheme = useColorScheme();
    const [mode, setMode] = useState(!toggle ? 'Overridden' : 'System setting: ' + colorScheme);

    return(
        <ListItemFlipswitch
            IconComponent={<Icon name={'brightness-2'} backgroundColor={colors.dark} />}
            title={'Dark mode'}
            subtitle={mode}
            onToggle={() => {
                setToggle(!toggle)
                setMode(!toggle ? 'Overridden' : 'System setting: ' + colorScheme);
            } }
            isOn={toggle}
        />
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default DarkModeSetting;
