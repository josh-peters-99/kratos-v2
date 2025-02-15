"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

export default function logWorkout() {
    const [maxDate, setMaxDate] = useState("");
    const [workoutTitle, setWorkoutTitle] = useState("");


    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const localDate = today.toISOString().split("T")[0];
        setMaxDate(localDate);
    }, []);

    const updateWorkoutTitle = async (title) => {
        if (!title.trim()) return; // Prevent empty updates

        try {
            const response = await fetch("/api/log-workout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });

            if (!response.ok) {
                throw new Error("Failed to update workout title");
            }
        } catch (error) {
            console.error("Error updating workout title:", error);
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            updateWorkoutTitle(workoutTitle);
        }, 1000); // Debounce to prevent excessive API calls

        return () => clearTimeout(debounceTimeout);
    }, [workoutTitle]);

    return (
        <section className="flex flex-col bg-black px-10 py-5 h-screen w-full items-center justify-center">

            <div className="md:w-[500px]">
                <div>
                    <h1 className="text-white font-bold text-xl">Log a New Workout</h1>
                </div>

                <form>
                    <label className="text-white">Workout Title</label>
                    <input 
                        type="text"
                        id="workoutTitle"
                        placeholder="Workout Title"
                        value={workoutTitle}
                        onChange={(e) => setWorkoutTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="workoutDate" className="text-white">Workout Date</label>
                    <input 
                        type="date"
                        id="workoutDate"
                        max={maxDate}
                        required
                    />
                    <label className="text-white">Exercise 1</label>
                    <input 
                        type="text"
                        id="exercise"
                        placeholder="Exercise Name"
                        required
                    />
                    <label className="text-white">Notes</label>
                    <textarea
                        id="notes"
                        placeholder="How did it go?"
                        rows={4}
                        className="w-full rounded-md text-black p-3 border bg-white border-gray focus:border-auburn focus:ring-2 focus:ring-auburn outline-none"
                    ></textarea> 

                    <div className="w-full flex items-center justify-center">
                        <button type="submit" className="bg-red text-white px-6 py-3 rounded-md">Finish Workout</button>
                    </div>
                </form>
            </div>

        </section>
    )
}