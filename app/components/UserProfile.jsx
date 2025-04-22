'use client'
import { useEffect, useState } from "react"
import API from "../api/axios"
import { useAuth } from "../services/AuthContext"
export default function ProfilePage() {
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState("");
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated) return;
            try {
                const res = await API.get("/profile");
                setProfile(res.data)
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to load profile");
            }
        }
        fetchProfile();
    }, [isAuthenticated])

    if (!isAuthenticated) return <div className="text-danger">❌ User not logged In!</div>

    if (error) return <div className="text-danger">❌ {error}</div>;

    if (!profile) return <div>Loading profile...</div>;


    return (
        <div className="p-4">
            <h2 className="mb-3">👤 User Profile</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Email:</strong> {profile.user.email}</li>
            </ul>
        </div>
    )
}