import {useEffect, useState} from "react";
import * as Location from "expo-location";

export default useLocation = () => {
    const [location, setLocation] = useState();

    const getLocation = async () => {
        try {
            const {granted} =  await Location.requestForegroundPermissionsAsync();

            if (!granted) {
                return;
            }

            const {coords: {longitude, latitude}} = await Location.getLastKnownPositionAsync();
            setLocation({latitude, longitude})
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        getLocation();

    }, []);

    return location;
};
