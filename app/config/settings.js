import Constants from "expo-constants";

const settings = {
    dev: {
        // apiUrl: 'https://192.168.0.204',
        // apiUrl: 'https://api.mcleandigital.co.uk',
        apiUrl: 'https://awesome.scot',
        registrationClientId: 'cc52460765f08d0f29ceb0deaf37645f',
        registrationClientSecret: 'JDJ5JDEwJDNlOGZVQjdaWVl1cHl1WVZpSElLei5EcHM1MEhnWHY0dDVQNllBdzRyRGRneUdLb0RXNkFx',
        xDebugHeader: true,
    },
    staging: {
        apiUrl: 'https://awesome.scot/api',
        registrationClientId: '',
        registrationClientSecret: '',
        xDebugHeader: false,
    },
    prod: {
        apiUrl: 'https://awesome.scot/api',
        registrationClientId: '',
        registrationClientSecret: '',
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
