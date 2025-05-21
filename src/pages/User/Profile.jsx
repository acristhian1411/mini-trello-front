import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
    const { user, logout } = useAuth();
    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}