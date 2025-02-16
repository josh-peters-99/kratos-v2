"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Exercise from "@/components/Exercise";

export default function logWorkout() {
    const [maxDate, setMaxDate] = useState("");
    const [workoutId, setWorkoutId] = useState(null);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [workoutDate, setWorkoutDate] = useState("");
    const [exercises, setExercises] = useState([]);
    const [notes, setNotes] = useState("");
    const [isNewWorkout, setIsNewWorkout] = useState(true);

    // Persist workoutId to avoid re-creating on page reload
    useEffect(() => {
        let storedWorkoutId = localStorage.getItem("workoutId");
        if (!storedWorkoutId) {
            storedWorkoutId = uuidv4();
            localStorage.setItem("workoutId", storedWorkoutId);
        }
        setWorkoutId(storedWorkoutId);
    }, []);

    // Once workoutId is set, check if the workout exists, else create it
    useEffect(() => {
        if (workoutId) {
            checkWorkoutExists();
        }
    }, [workoutId]);

    // Setup calendar so that user can't select future dates
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const localDate = today.toISOString().split("T")[0];
        setMaxDate(localDate);
    }, []);

    // Function to check if the workout exists
    const checkWorkoutExists = async () => {
        try {
            const response = await fetch(`/api/log-workout?id=${workoutId}`);
            const data = await response.json();

            if (data.exists) {
                setIsNewWorkout(false);
                setWorkoutTitle(data.workout.title);
                setWorkoutDate(data.workout.date.split("T")[0]);
                setExercises(data.workout.exercises);
                setNotes(data.workout.notes);
            } else {
                console.log("Workout does not exist. Creating new workout...");
                await createWorkout(); // 🔥 Ensures a workout is created immediately
            }
        } catch (error) {
            console.error("Error checking workout existence:", error);
        }
    };

    // Function to create a new workout
    const createWorkout = async () => {
        try {
            const response = await fetch("/api/log-workout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    id: workoutId, 
                    title: "", // Can be omitted since default is empty string
                    date: new Date().toISOString().split("T")[0], 
                    exercises: [], 
                    notes: "", 
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create workout");
            }

            console.log("Workout sucessfully created!");
            setIsNewWorkout(false); // Mark workout as existing
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    }

    // Function to update workout
    const updateWorkout = async (updatedData) => {
        try {
            const response = await fetch("/api/log-workout", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: workoutId, ...updatedData }),
            });

            if (!response.ok) {
                throw new Error("Failed to update workout");
            }
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    // Debounce updates to prevent excessive API calls
    useEffect(() => {
        if (!isNewWorkout) {
            const debounceTimeout = setTimeout(() => {
                updateWorkout({ title: workoutTitle });
            }, 1000);
            return () => clearTimeout(debounceTimeout);
        }
    }, [workoutTitle]);

    useEffect(() => {
        if (!isNewWorkout) {
            const debounceTimeout = setTimeout(() => {
                updateWorkout({ date: workoutDate });
            }, 1000);
            return () => clearTimeout(debounceTimeout);
        }
    }, [workoutDate]);

    useEffect(() => {
        if (!isNewWorkout) {
            const debounceTimeout = setTimeout(() => {
                updateWorkout({ exercises });
            }, 1000);
            return () => clearTimeout(debounceTimeout);
        }
    }, [exercises]);

    useEffect(() => {
        if (!isNewWorkout) {
            const debounceTimeout = setTimeout(() => {
                updateWorkout({ notes });
            }, 1000);
            return () => clearTimeout(debounceTimeout);
        }
    }, [notes]);

    return (
        <section className="flex flex-col bg-white px-10 py-5 h-screen w-full items-center justify-center">

            <div className="flex flex-col md:w-[500px] h-full">
                <div>
                    <h1 className="text-black font-bold text-xl">Log a New Workout</h1>
                </div>

                <form className="flex flex-col justify-evenly flex-grow">
                    <div className="bg-red rounded-md p-3 shadow-md">
                        <label className="text-white font-bold">Workout Title</label>
                        <input 
                            type="text"
                            id="workoutTitle"
                            placeholder="Workout Title"
                            value={workoutTitle}
                            onChange={(e) => setWorkoutTitle(e.target.value)}
                            required
                        />
                        <label htmlFor="workoutDate" className="text-white font-bold">Workout Date</label>
                        <input 
                            type="date"
                            id="workoutDate"
                            max={maxDate}
                            value={workoutDate}
                            onChange={(e) => setWorkoutDate(e.target.value)}
                            required
                        />
                    </div>

                    {/* Loop through exercises array and render the index + 1 */}
                    <Exercise />

                    <div className="bg-red rounded-md p-3 shadow-md">
                        <label className="text-white font-bold">Notes</label>
                        <textarea
                            id="notes"
                            placeholder="How did it go?"
                            rows={4}
                            className="w-full rounded-md text-black p-3 border bg-white border-gray focus:border-auburn focus:ring-2 focus:ring-auburn outline-none"
                        ></textarea> 
                    </div>


                    <div className="w-full flex items-center justify-center">
                        <button type="submit" className="bg-black text-white px-6 py-3 rounded-md">Finish Workout</button>
                    </div>
                </form>
            </div>

        </section>
    )
}