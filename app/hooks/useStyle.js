import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {Platform, useColorScheme} from "react-native";
import colors from "../config/colors";

export default useStyle = () => {
    const colorScheme = useColorScheme();
    const [mode, setMode] = useState();
    const dark = colorScheme == 'dark'
    const style = {
        dark: dark,
        text: {
            color: dark ? colors.light : colors.dark,
            ...Platform.select({
                ios: {
                    fontSize: 20,
                    fontFamily: "Helvetica",
                },
                android: {
                    fontSize: 18,
                    fontFamily: "Roboto",
                },
            })
        },
        box: {},
        errorText: {},
        flipswitch: {},
        colors: colors
    };

    style.backgroundColor = dark ? style.colors.dark : style.colors.light;
    style.box.backgroundColor = dark ? style.colors.darkish : style.colors.white;
    style.flipswitch.onColor = dark ? style.colors.secondary : style.colors.white;
    style.flipswitch.offColor = dark ? style.colors.darkish : style.colors.white;
    style.errorText.color = dark ? style.colors.secondary : style.colors.primary;

    return style;
};
