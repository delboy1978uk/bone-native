import {makeRedirectUri, useAuthRequest} from "expo-auth-session";

import client from './client';
import settings from "../config/settings";

const register = (name, email, password) => client.post('/users', {name, email, password});

export default {
    register,
};
