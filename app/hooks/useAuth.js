import {useContext} from "react";
import jwtDecode from "jwt-decode";

import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

export default useAuth = () => {
    const {user, setUser} = useContext(AuthContext);

    const login = authToken => {
        console.log('Logging in!! token = ', authToken);
        const user = jwtDecode(authToken);
        setUser(user);
        authStorage.storeToken(authToken);
    }

    const logout = () => {
        setUser(null);
        authStorage.removeRefreshToken();
    }

    return {login, logout, user};
}
