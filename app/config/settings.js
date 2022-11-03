import Constants from "expo-constants";

const settings = {
    dev: {
        // apiUrl: 'https://172.20.10.2',
        apiUrl: 'https://awesome.scot',
        authCallbackURL: 'oauth2/callback',
        clientId: 'add10582a5750ebd2055e1005b65e530',
        discovery: {
            authEndpoint: 'https://awesome.scot/en_GB/oauth2/authorize',
            tokenEndpoint: 'https://awesome.scot/en_GB/oauth2/token',
        },
        scheme: 'bone',
        xDebugHeader: false,
    },
    staging: {
        apiUrl: 'https://awesome.scot',
        clientId: '',
        discovery: {
            authEndpoint: '',
            tokenEndpoint: '',
        },
        xDebugHeader: false,
    },
    prod: {
        apiUrl: 'https://awesome.scot',
        clientId: '',
        discovery: {
            authEndpoint: '',
            tokenEndpoint: '',
        },
        xDebugHeader: false,
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
