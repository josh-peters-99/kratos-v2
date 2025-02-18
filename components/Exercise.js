"use client"

import { useState } from "react"

export default function Exercise({ exerciseNum, workoutId, exerciseId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [exerciseName, setExerciseName] = useState("");

    // Toggle isOpen state when clicked
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    const updateExercise = async () => {
        try {
            const response = await fetch("/api/exercise", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ exerciseId, name: exerciseName }),
            });

            if (!response.ok) throw new Error("Failed to update exercise");
        } catch (error) {
            console.error("Error updating exercise:", error);
        }
    };

    return (
        <div className="bg-red rounded-md p-3 shadow-md">
            <div onClick={toggleOpen} className="flex items-center justify-between">
                <label className="text-white font-bold">Exercise {exerciseNum}</label>

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
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    onBlur={updateExercise}
                    placeholder="Exercise Name"
                    required
                />
            )}
        </div>
    )
}