"use client";

import { useState } from "react";
import Link from "next/link";

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
        <section className="w-full flex flex-col h-[850px] md:h-screen justify-center items-center px-10 bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center w-full gap-8 md:w-[500px]">
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

                <p>Already have an account? <Link href="/auth/signin" className="underline underline-offset-1">Sign In</Link></p>

                <button type="submit" className="w-full bg-red text-white px-6 py-3 rounded-full">Sign Up</button>
            </form>
        </section>
    )
}