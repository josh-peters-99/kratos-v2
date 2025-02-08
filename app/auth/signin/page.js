"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    };

    return (
        <main className="w-full h-screen flex">
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-5 justify-center items-center px-10">
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
                <button type="submit">Sign In</button>
            </form>
        </main>
    );
}