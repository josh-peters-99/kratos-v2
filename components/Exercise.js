"use client"

import { useState, useEffect } from "react"

export default function Exercise() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle isOpen state when clicked
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="bg-red rounded-md p-3 shadow-md">
            <div onClick={toggleOpen} className="flex items-center justify-between">
                <label className="text-white font-bold">Exercise 1</label>

                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-7 h-7 fill-current text-white hover:cursor-pointer">
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-7 h-7 fill-current text-white hover:cursor-pointer">
                        <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                    </svg>
                )}
            </div>

            {isOpen && (
                <input 
                    type="text"
                    id="exercise"
                    placeholder="Exercise Name"
                    required
                />
            )}
        </div>
    )
}