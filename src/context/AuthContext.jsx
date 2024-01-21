import React, { createContext, useContext, useState } from "react";

let AuthContext = createContext({
    loggedIn: false,
    user: undefined,
    token: undefined,
});

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const [token, setToken] = useState();

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => useContext(AuthContext);
export { useAuthContext, AuthContextProvider };