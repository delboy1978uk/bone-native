import Constants from "expo-constants";

const settings = {
    dev: {
        apiUrl: 'https://api.mcleandigital.co.uk',
        // apiUrl: 'http://192.168.0.204:9000',
        registrationClientId: 'cc52460765f08d0f29ceb0deaf37645f',
        registrationClientSecret: 'JDJ5JDEwJDNlOGZVQjdaWVl1cHl1WVZpSElLei5EcHM1MEhnWHY0dDVQNllBdzRyRGRneUdLb0RXNkFx'
    },
    staging: {
        apiUrl: 'https://awesome.scot/api',
        registrationClientId: '',
        registrationClientSecret: ''
    },
    prod: {
        apiUrl: 'https://awesome.scot/api',
        registrationClientId: '',
        registrationClientSecret: ''
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
