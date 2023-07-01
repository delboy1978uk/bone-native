import client from './client';

const activateAccount = (email, token, clientId, password) => client.post('/api/user/activate', {email: email, token: token, clientId: clientId, password: password});
const getProfile = token => client.get('/api/user/profile', {}, {
    headers: { 'Authorization': 'Bearer ' + token},
});
const register = userInfo => client.post('/api/user/register', userInfo);
const resendactivationEmail = email => client.post('/api/user/resend-activation-email', {email: email});
const updateProfile = profileInfo => client.put('/api/user/profile', profileInfo);
const validateEmailToken = (email, token) => client.post('/api/user/validate-email-token', {email: email, token: token});
const uploadUserImage = formData => client.post('/api/user/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data'},
});
const userImage = () => client.get('/api/user/image');
const userSettings = () => client.get('/api/user/settings');
const updateUserSettings = settings => client.put('/api/user/settings', settings);
const uploadUserBackgroundImage = formData => client.post('/api/user/background-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
const userBackgroundImage = () => client.get('/api/user/background-image');

export default {
    activateAccount,
    getProfile,
    register,
    resendactivationEmail,
    updateProfile,
    uploadUserImage,
    uploadUserBackgroundImage,
    userBackgroundImage,
    userImage,
    userSettings,
    updateUserSettings,
    validateEmailToken
};
