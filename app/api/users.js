import client from './client';

const getProfile = () => client.get('/api/user/profile', {});

export default {
    getProfile,
};
