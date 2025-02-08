"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    };

    return (
        <section className="w-full flex flex-col h-[800px] justify-center items-center px-10 bg-white">
            <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center w-full gap-8">
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
                <p>Don't have an account? <Link href="/auth/signup" className="underline underline-offset-1">Sign Up</Link></p>
                <button type="submit" className="w-full bg-red text-white px-6 py-3 rounded-full">Sign In</button>
            </form>
        </section>
    );
}