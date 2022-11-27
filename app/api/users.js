import client from './client';

const activateAccount = (email, token, clientId, password) => client.post('/api/user/activate', {email: email, token: token, clientId: clientId, password: password});
const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);
const resendactivationEmail = email => client.post('/api/user/resend-activation-email', {email: email});
const validateEmailToken = (email, token) => client.post('/api/user/validate-email-token', {email: email, token: token});

export default {
    activateAccount,
    getProfile,
    register,
    resendactivationEmail,
    validateEmailToken
};
