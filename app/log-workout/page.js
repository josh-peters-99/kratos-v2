"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation";

import Exercise from "@/components/Exercise";
import DiscardWorkoutButton from "@/components/DiscardWorkoutButton";

export default function logWorkout() {
    const [maxDate, setMaxDate] = useState("");
    const [workoutId, setWorkoutId] = useState(null);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [workoutDate, setWorkoutDate] = useState("");
    const [notes, setNotes] = useState("");
    const [isNewWorkout, setIsNewWorkout] = useState(true);
    const [exercises, setExercise] = useState([]);

    // WORKOUT METHODS
    // Set workoutId from localStorage or create a new one if not found
    useEffect(() => {
        const storedWorkoutId = localStorage.getItem("workoutId") || uuidv4();
        localStorage.setItem("workoutId", storedWorkoutId);
        setWorkoutId(storedWorkoutId);
    }, []);

    // Check if the workout exists in the database when workoutId is set
    useEffect(() => {
        if (workoutId) {
            checkWorkoutExists();
            fetchExercises(); // Fetch exercises when workoutId is set
        }
    }, [workoutId]);

    // Set maxDate to prevent future dates from being selected
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setMaxDate(today.toISOString().split("T")[0]);
    }, []);

    // Check if the workout exists and populate the form or create a new workout
    const checkWorkoutExists = async () => {
        try {
            const response = await fetch(`/api/log-workout?id=${workoutId}`);
            const data = await response.json();

            if (data.exists) {
                setIsNewWorkout(false);
                setWorkoutTitle(data.workout.title);
                setWorkoutDate(data.workout.date.split("T")[0]);
                setNotes(data.workout.notes);
            } else {
                await createWorkout(); // Create the workout
                await addWorkoutToUser(workoutId); // Add to user's workouts array
            }
        } catch (error) {
            console.error("Error checking workout existence:", error);
        }
    };

    // Create a new workout in the database
    const createWorkout = async () => {
        try {
            const response = await fetch("/api/log-workout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    id: workoutId, 
                    date: new Date().toISOString().split("T")[0], 
                    notes: "", 
                }),
            });

            if (!response.ok) throw new Error("Failed to create workout");
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: workoutId, ...updatedData }),
            });

            if (!response.ok) {
                throw new Error("Failed to update workout");
            }
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    const addWorkoutToUser = async (workoutId) => {
        try {
            const response = await fetch("/api/user/workout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workoutId }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to add workout");

            console.log("Workout added:", data.workouts);
        } catch (error) {
            console.error("Error updating user workouts:", error);
        }
    }

    const discardWorkout = async (workoutId) => {
        const router = useRouter();

        try {
            const response = await fetch(`/api/workout/${workoutId}`, {
                method: "DELETE",
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to discard workout");
    
            console.log("Workout discarded successfully");
            // Redirect to the home page
            router.push("/");
        } catch (error) {
            console.error("Error discarding workout:", error);
        }
    };

    // Update workout details with debounce to prevent excessive API calls
    const debounceUpdate = (field, value) => {
        if (isNewWorkout) return; // Skip updating if it's a new workout
        const debounceTimeout = setTimeout(() => {
            updateWorkout({ [field]: value });
        }, 1000);
        return () => clearTimeout(debounceTimeout);
    }

    // Debounce updates for workoutTitle, workoutDate, and notes
    useEffect(() => debounceUpdate("title", workoutTitle), [workoutTitle]);
    useEffect(() => debounceUpdate("date", workoutDate), [workoutDate]);
    useEffect(() => debounceUpdate("notes", notes), [notes]);

    // EXERCISE METHODS
    const fetchExercises = async () => {
        try {
            const response = await fetch(`api/exercise?workoutId=${workoutId}`);
            const data = await response.json();
            if (data.exists) setExercise(data.exercises);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    const addExercise = async () => {
        try {
            const newExercise = {
                workoutId,
                exerciseId: uuidv4(),
                name: "" // Default empty name
            };
            const response = await fetch("/api/exercise", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newExercise),
            });

            if (!response.ok) throw new Error("Failed to add exercise");
            fetchExercises(); // Fetch updated exercises list
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

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

                    {/* Display existing exercises */}
                    {exercises.map((exercise, index) => (
                        <Exercise 
                            key={exercise.exerciseId}
                            exerciseNum={index + 1}
                            workoutId={exercise.workoutId}
                            exerciseId={exercise.exerciseId}
                        />
                    ))}

                    <div className="w-full flex items-center justify-center">
                        <button type="button" onClick={addExercise} className="bg-black text-white px-6 py-3 rounded-md">Add Exercise</button>
                    </div>

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
                        <button type="submit" className="bg-black text-white font-bold px-6 py-3 rounded-md">Finish Workout</button>
                    </div>
                </form>

                <DiscardWorkoutButton workoutId={workoutId} />

            </div>

        </section>
    )
}