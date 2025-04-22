import { useAuth } from "../services/AuthContext";




const Logout = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <>
            {isAuthenticated && <button className="btn btn-outline-dark ms-3" onClick={logout}>
                🚪 Logout
            </button>}
        </>
    )

}
export default Logout