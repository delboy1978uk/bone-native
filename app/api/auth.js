import client from './client';

const login = (email, password, clientSettings) => client.post('/oauth2/authorize', {
    response_type: 'code',
    client_id: clientSettings.client_id,
    client_secret: clientSettings.client_secret,
    redirect_uri: 'bone://outh2/redirect',
    state: 'code',
    scope: 'basic',
    code_challenge: 'xxxx',
    email: email,
    password: password
});

const register = (name, email, password) => client.post('/users', {name, email, password});

export default {
    login,
    register,
};
