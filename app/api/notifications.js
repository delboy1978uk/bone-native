import client from './client';

const send = (message, data) => {
    return client.post('/api/notifications/send-notification', {message, data})
};

export default {
    send
};
