import {DarkTheme, DefaultTheme} from "@react-navigation/native";

import useStyle from "./useStyle";
import colors from "../config/colors";

export default useNavigationTheme = () => {
    const style = useStyle();
    const theme = style.dark ? DarkTheme : DefaultTheme
    x = {
        ...theme,
        colors: {
            ...theme.colors,
            primary: style.text.color,
            background: style.backgroundColor,
            card: style.backgroundColor
        },
        dark: style.dark
    }

    console.log(x)

    return x;
};
