import React, {useState} from 'react';
import {StyleSheet} from "react-native";
import Icon from "./Icon";
import colors from "../config/colors";
import ListItemFlipswitch from "./ListItemFlipswitch";

function DarkModeSetting(props) {
    const [toggle, setToggle] = useState(true);

    return(
        <ListItemFlipswitch
            IconComponent={<Icon name={'brightness-2'} backgroundColor={colors.dark} />}
            title={'Dark mode'}
            onToggle={() => setToggle(!toggle) }
            isOn={toggle}
        />
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default DarkModeSetting;
