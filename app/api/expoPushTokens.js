import client from './client';

const register = pushToken => client.post('/api/notifications/register-token', {token: pushToken});

export default {
    register,
}
