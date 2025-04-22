import { useState } from "react";
import LoginForm from "./LoginForm";
import Registration from "./Registration";
import { useAuth } from "../services/AuthContext";


const LoginRegistration = () => {
    const {showLoginModal, setShowLoginModal } = useAuth();

    return (
        <div className="auth-modal">
            <h3 className="text-center mb-3">
                {showLoginModal === true ? "Login" : "Register"}
            </h3>
            {showLoginModal === true? (
                <LoginForm setShowLoginModal={setShowLoginModal}  />
            ) : (
                <Registration setShowLoginModal={setShowLoginModal} />
            )}
        </div>
    )
}

export default LoginRegistration