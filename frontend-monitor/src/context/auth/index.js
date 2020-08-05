import { useState, useEffect } from 'react';

import graphql from '../../graphql'
import { Login } from '../../graphql/query'

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            graphql.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true)
        }
        setLoading(false);
    }, []);

    function handleLogin() {
        return {
            auth: async function (email, password) {
                try {
                    const { data: { data: { login: { token } } } } = await graphql.post("/graphql", JSON.stringify({ query: Login(email, password) }))

                    localStorage.setItem('token', JSON.stringify(token));
                    graphql.defaults.headers.Authorization = `Bearer ${token}`;

                } catch (err) {
                    return false
                }

                if (localStorage.getItem('token')) {
                    setAuthenticated(true);
                    window.location.href = "/"
                }
            }
        }
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        window.location.href = "/login"
    }

    function history() {
        return {
            push: function (url) {
                window.location.href = url
            }
        }
    }
    return { authenticated, loading, history, handleLogin, handleLogout };
}