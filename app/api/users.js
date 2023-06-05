import client from './client';

const activateAccount = (email, token, clientId, password) => client.post('/api/user/activate', {email: email, token: token, clientId: clientId, password: password});
const getProfile = () => client.get('/api/user/profile', {});
const register = userInfo => client.post('/api/user/register', userInfo);
const resendactivationEmail = email => client.post('/api/user/resend-activation-email', {email: email});
const updateProfile = profileInfo => client.put('/api/user/profile', profileInfo);
const validateEmailToken = (email, token) => client.post('/api/user/validate-email-token', {email: email, token: token});
const uploadUserImage = formData => client.post('/api/user/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    // transformRequest: formData => formData,
});
const userImage = () => client.get('/api/user/image');

export default {
    activateAccount,
    getProfile,
    register,
    resendactivationEmail,
    updateProfile,
    uploadUserImage,
    userImage,
    validateEmailToken
};
