import client from './client';

// const register = pushToken => client.post('/expoPushTokens', {token: pushToken});
const register = pushToken => console.log('register ' + pushToken + ' for push tokens');

export default {
    register,
}
