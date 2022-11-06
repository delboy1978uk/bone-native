import client from './client';

const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);

export default {
    getProfile,
    register
};
