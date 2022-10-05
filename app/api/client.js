import { create } from 'apisauce';

import cache from '../utility/cache';
import apiSettings from '../config/settings';
import authStorage from '../auth/storage';

const clientSettings = async () => await authStorage.getClientCredentials();

const apiClient = clientSettings().then(settings => {
    if (settings === null) {
        console.log('creating registration client');
        const registrationClient = create(apiSettings);
        const state = 'xxxxxxx';
        console.log('> get access token')
        registrationClient
            .post('/oauth2/authorize', {
                response_type: 'token',
                client_id: apiSettings.registrationClientId,
                client_secret: apiSettings.registrationClientSecret,
                redirect_uri: 'bone://oauth2/callback',
                state: state,
                scope: 'register'
            })
            .then(response => {
                console.log('response', response);
                console.log('> register client')
                registrationClient.post('/oauth2/register', {
                    redirect_uris: ['bone://oauth2/callback'],
                    client_name: 'Bone Native Client',
                    logo_uri: 'https://api.mcleandigital.co.uk/img/skull_and_crossbones.png',
                    token_endpoint_auth_method: 'client_credentials'
                }).then(response => {
                    console.log('response', response);
                    console.log('> store settings');
                });
            })
    }


    console.log('settings are', settings);
    const apiClient = create(apiSettings);
    apiClient.addAsyncRequestTransform(async request => {
        const authToken = await authStorage.getToken();

        if (!authToken) {
            return;
        }

        request.headers['x-auth-token'] = authToken;
    });

    const get = apiClient.get;

    apiClient.get = async (url, params, axiosConfig) => {
        const response = await get(url, params, axiosConfig);

        if (response.ok) {
            // you can add a black/white list if you dont want everything cached
            cache.store(url, response.data);

            return response;
        }

        const data = await cache.get(url);

        return data ? {ok: true, data: data} : response;
    }

    return apiClient;
}).catch(error => console.log(error));




export default apiClient;
