import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { toast } from "react-hot-toast";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            localStorage.setItem("isLoggedIn", "true")
            return { success: true }
        } catch (err) {
            console.error("Login error:", err)
            return { success: false, error: err.response?.data?.message || "Something went wrong." }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            localStorage.setItem("isLoggedIn", "true")
            return { success: true }
        } catch (err) {
            console.error("Registration error:", err)
            return { success: false, error: err.response?.data?.message || "Something went wrong." }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            toast.success("Logged out successfully!", { id: "logout-toast" })
        } catch (err) {
            console.error("Logout error:", err)
        } finally {
            setUser(null)
            localStorage.removeItem("isLoggedIn")
            setLoading(false)
        }
    }

    useEffect(() => {

        const getAndSetUser = async () => {
            if (localStorage.getItem("isLoggedIn") !== "true") {
                setUser(null)
                setLoading(false)
                return
            }

            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                // Quietly set user to null on 401/unauthenticated initial page loads
                setUser(null)
                localStorage.removeItem("isLoggedIn")
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}