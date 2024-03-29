import {useContext} from "react";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import useApi from "./useApi";
import usersApi from "../api/users";

export default useAuth = () => {
    const profileApi = useApi(usersApi.getProfile);
    const {user, setUser} = useContext(AuthContext);

    const login = async authToken => {
        // possibly don't wait here?
        await authStorage.storeAuthToken(authToken).then(async () => {
            const user = await profileApi.request(authToken);
            authStorage.storeUser(user.data);
            user.data.authToken = authToken;
            setUser(user.data);
        });
    }

    const updateUser = async user => {
        const authToken = user.authToken;
        await delete user.authToken;
        authStorage.storeUser(user);
        user.authToken = authToken;
        setUser({...user});
    }

    const logout = () => {
        setUser(null);
        authStorage.removeAuthToken();
        authStorage.removeUser();
    }

    return {login, logout, updateUser, user};
}
