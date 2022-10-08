import { create } from 'apisauce';

import cache from '../utility/cache';
import apiSettings from '../config/settings';
import authStorage from '../auth/storage';

const registrationClient = create({baseURL: apiSettings.apiUrl});

const getRegistrationClientToken = () => {
    return registrationClient.post('/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: apiSettings.registrationClientId,
        client_secret: apiSettings.registrationClientSecret,
        redirect_uri: 'bone://oauth2/callback',
        scope: 'register'
    });
}

const registerDevice = registrationClientToken => {
    const authHeader = 'Bearer ' + registrationClientToken;
    registrationClient.setHeader('Authorization', authHeader);

    return registrationClient
        .post('/oauth2/register', {
            redirect_uris: 'bone://outh2/callback',
            client_name: 'Bone Native Client',
            token_endpoint_auth_method: 'client_secret_basic',
            logo_uri: 'https://fake/image.jpg',
        })
}

export default {getRegistrationClientToken, registerDevice};
