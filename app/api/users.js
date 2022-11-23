import client from './client';

const activateAccount = (email, token, clientId, password) => client.post('/api/user/activate?XDEBUG_SESSION=PHPSTORM', {email: email, token: token, clientId: clientId, password: password});
const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);
const resendactivationEmail = email => client.post('/api/user/resend-activation-email', {email: email});

export default {
    activateAccount,
    getProfile,
    register,
    resendactivationEmail
};
