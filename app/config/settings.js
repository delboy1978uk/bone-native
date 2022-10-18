import Constants from "expo-constants";

const settings = {
    dev: {
        // apiUrl: 'https://192.168.0.204',
        // apiUrl: 'https://api.mcleandigital.co.uk',
        apiUrl: 'https://awesome.scot',
        authCallbackURL: 'oauth2/callback',
        clientId: 'add10582a5750ebd2055e1005b65e530',
        discovery: {
            authEndpoint: '/en_GB/oauth2/authorize',
            tokenEndpoint: '/en_GB/oauth2/token',
        },
        scheme: 'bone',
        xDebugHeader: true,
    },
    staging: {
        apiUrl: 'https://awesome.scot/api',
        clientId: '',
        discovery: {
            authEndpoint: '',
            tokenEndpoint: '',
        },
        xDebugHeader: false,
    },
    prod: {
        apiUrl: 'https://awesome.scot/api',
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
