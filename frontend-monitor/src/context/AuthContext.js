import React, { createContext } from 'react';

import useAuth from './auth';

const Context = createContext();

function AuthProvider({ children }) {
    const {
        authenticated, loading, history, handleLogin, handleLogout
    } = useAuth();

    return (
        <React.Fragment>
            <Context.Provider value={{ loading, authenticated, history, handleLogin, handleLogout }}>
                {children}
            </Context.Provider>
        </React.Fragment>
    );
}

export { Context, AuthProvider };
