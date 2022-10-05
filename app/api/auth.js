import client from './client';


const authorize = (response_type) => client.post('/oauth2/authorize', {
    response_type: response_type
});

const login = (email, password) => client.post('/auth', {email, password});
const register = (name, email, password) => client.post('/users', {name, email, password});

export default {
    login,
    register,
};
