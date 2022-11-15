import client from './client';

const activateAccount = (email, token, newPassword) => client.get('/api/user/activate', {email, token, newPassword});
const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);

export default {
    activateAccount,
    getProfile,
    register
};
