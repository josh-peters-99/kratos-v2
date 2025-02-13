"use client"

import Link from "next/link";
import { Caesar_Dressing } from "next/font/google";
import { Skranji } from "next/font/google";
import { Metal_Mania } from "next/font/google";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";


export const caesar_dressing = Caesar_Dressing({
    weight: ["400"],
    subsets: ["latin"],
})

export const skranji = Skranji({
    weight: ["400"],
    substes: ["latin"],
})

export const metal_mania = Metal_Mania({
    weight: ["400"],
    substes: ["latin"],
})

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session } = useSession();

    // Toggle menu state
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (!menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    return (
        <nav className="h-[84px] flex w-full justify-between bg-white px-6 items-center shadow-md fixed top-0 left-0 right-0 z-50">
            {/* Logo */}
            <div className="h-full flex justify-center items-center z-50">
                <img src="/black-logo.png" width={60} height={60} />
                <h1 className={`${metal_mania.className} text-xl text-black ml-3`}>Company Name</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 text-lg font-bold items-center">
                <Link href="/" className="hover:text-auburn transition">Home</Link>
                <Link href="/about" className="hover:text-auburn transition">About</Link>
                <Link href="/log-workout" className="hover:text-auburn transition">Log Workout</Link>
                <Link href="/contact" className="hover:text-auburn transition">Contact</Link>
                {session ? (
                    <button onClick={() => signOut()} className="bg-auburn rounded-md px-6 py-3 text-white">Sign Out</button>
                ) : (
                    <Link href="/auth/signin" className="bg-auburn rounded-md px-6 py-3 text-white">Sign In</Link>
                )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden z-50" onClick={toggleMenu}>
                {menuOpen ? (
                    // Close Icon
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-8 h-8 text-black fill-current absolute top-6 right-6 z-50">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                    </svg>
                ) : (
                    // Menu Icon
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-black fill-current">
                        <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                    </svg>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="fixed top-0 right-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 text-black font-bold text-2xl z-40">
                    <Link href="/" onClick={toggleMenu} className="hover:text-auburn transition">Home</Link>
                    <Link href="/about" onClick={toggleMenu} className="hover:text-auburn transition">About</Link>
                    <Link href="/log-workout" onClick={toggleMenu} className="hover:text-auburn transition">Log Workout</Link>
                    <Link href="/contact" onClick={toggleMenu} className="hover:text-auburn transition">Contact</Link>

                    {session ? (
                        // If user is signed in, show Sign Out button
                        <button
                            onClick={() => {
                                signOut();
                                toggleMenu();
                            }}
                            className="bg-auburn rounded-full px-6 py-3 text-white"
                        >
                            Sign Out
                        </button>
                    ) : (
                        // If no user session, show Sign In link
                        <Link href="/auth/signin" onClick={toggleMenu} className="bg-auburn rounded-md px-6 py-3 text-white">Sign In</Link>
                    )}

                </div>
            )}
        </nav>
    )
}