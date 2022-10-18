import {makeRedirectUri, useAuthRequest} from "expo-auth-session";

import client from './client';
import settings from "../config/settings";

const redirectUri = makeRedirectUri({
    scheme: settings.scheme,
    path: settings.authCallbackURL
});

const [request, response, promptAsync] = useAuthRequest(
    {
        clientId: settings.clientId,
        response_type: 'code',
        scopes: ['basic'],
        usePKCE: true,
        redirectUri: redirectUri,
    },
    settings.discovery
);

const login = (email, password) => {

}

const register = (name, email, password) => client.post('/users', {name, email, password});

export default {
    register,
};
