import * as Linking from "expo-linking";
import {useEffect} from "react";

import navigation from "../navigation/rootNavigation";
import routes from '../navigation/routes';

export default useLinking = () => {
    const url = Linking.useURL();

    useEffect(() => {
        if (url) {
            const parts = Linking.parse(url);

            if (parts.path !== null && parts.path !== '') {
                switch (parts.path) {
                    case 'user/activate':
                        navigation.navigate(routes.USER_ACTIVATION, parts.queryParams);
                        break;
                }
            }
        }
    }, [url]);

    return url;
};
