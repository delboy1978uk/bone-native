import {useContext} from "react";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import useApi from "./useApi";
import usersApi from "../api/users";

export default useAuth = () => {
    const profileApi = useApi(usersApi.getProfile);
    const {user, setUser} = useContext(AuthContext);

    const login = async authToken => {
        await authStorage.storeAuthToken(authToken).then(async () => {
            const user = await profileApi.request();
            authStorage.storeUser(user.data);
            setUser(user.data);
        });
    }

    const logout = () => {
        setUser(null);
        authStorage.removeAuthToken();
        authStorage.removeUser();
    }

    return {login, logout, user};
}
