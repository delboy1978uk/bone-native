import client from './client';



const register = (name, email, password) => client.post('/users', {name, email, password});

export default {
    register,
};
