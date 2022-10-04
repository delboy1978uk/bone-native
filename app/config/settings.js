import Constants from "expo-constants";

const settings = {
    dev: {
        apiUrl: 'https://awesome.scot/api'
    },
    staging: {
        apiUrl: 'https://awesome.scot/api'
    },
    prod: {
        apiUrl: 'https://awesome.scot/api'
    }
}

const getCurrentSettings = () => {
    if (__DEV__) {
        return settings.dev;
    }

    if (Constants.manifest.releaseChannel === 'staging') {
        return settings.staging;
    }

    return settings.prod;
};

export default getCurrentSettings();
