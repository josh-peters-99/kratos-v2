"use client";

import { useState } from "react";

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const workouts = [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ username, email, password, workouts }),
        });

        if (res.ok) {
            alert("Signup successful. You can now sign in.");
        } else {
            alert("Signup failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
                required 
            />
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Sign Up</button>
        </form>
    )
}