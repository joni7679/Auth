import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios"
axios.defaults.withCredentials = true
export const AuthContext = createContext();
function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);
    const backendApi = import.meta.env.VITE_SERVER_URL;
    // ================register logic here=============
    const userRegister = useCallback(async ({ name, email, password }) => {
        try {
            setLoading(true)
            const res = await axios.post(`${backendApi}/auth/register`, { name, email, password });
            const finalRes = res.data.data;
            console.log(finalRes)
            setUser(finalRes)
            return finalRes
        } catch (error) {
            setError(error.response?.data.message || "Internal Issu")
            console.log("register error",error.response?.data.message)
        } finally {
            setTimeout(() => {
                setError(null)
            }, 3000)
            setLoading(false)
        }
    }, [backendApi])

    // ================login logic here=============
    const userLogin = useCallback(async ({ email, password }) => {
        try {
            setLoading(true)
            const res = await axios.post(`${backendApi}/auth/login`, { email, password, });
            const finalRes = res.data.data;
            setUser(finalRes)
            return finalRes
        } catch (error) {
            setError(error.response?.data.message || "Internal Issu")
            console.log(error.response?.data.message);
            console.log(error)
        } finally {
            setTimeout(() => {
                setError(null)
            }, 3000)
            setLoading(false);
        }
    }, [backendApi])

    // ================userProfile logic here=============
    const userProfile = useCallback(async () => {
        try {
            setAuthLoading(true)
            const res = await axios.get(`${backendApi}/auth/profile`);
            const finalRes = res.data.data;
            setUser(finalRes)
            return finalRes
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                setError(null)
            }, 3000)
            setAuthLoading(false);
            setAuthLoading(false)
        }
    }, [backendApi])

    // ================logout logic here=============
    const userLogOut = useCallback(async () => {
        try {
            await axios.post(`${backendApi}/auth/logout`, {});
            setUser(null)
        } catch (error) {
            setError(error.response?.data.message || "Internal Issu")
            console.log(error)
        } finally {
            setTimeout(() => {
                setError(null)
            }, 3000)
            setAuthLoading(false);
        }
    }, [backendApi])

    let authValue = useMemo(() => {
        return {
            userRegister,
            user,
            authLoading,
            loading,
            error,
            userLogin,
            userProfile,
            userLogOut,

        }
    }, [userRegister,
        user,
        authLoading,
        loading,
        error,
        userLogin,
        userProfile,
        userLogOut,
    ])

    // ================= CHECK AUTH =================
    useEffect(() => {
        userProfile()
    }, [userProfile]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;