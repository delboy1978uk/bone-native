import client from './client';

const activateAccount = (email, token, clientId, password) => client.post('/api/user/activate?XDEBUG_SESSION=PHPSTORM', {email: email, token: token, clientId: clientId, password: password});
const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);

export default {
    activateAccount,
    getProfile,
    register
};
