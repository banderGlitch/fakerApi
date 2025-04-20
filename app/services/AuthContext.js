"use client"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        setIsAuthenticated(!!token)
    }, [])

    const login = (accessToken, refreshToken) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
        setShowLoginModal(false);
    }

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
      };

      return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated, login, logout, showLoginModal, setShowLoginModal}}>
            {children}
        </AuthContext.Provider>
      )

}

export const useAuth = () => useContext(AuthContext)  // custom hooks