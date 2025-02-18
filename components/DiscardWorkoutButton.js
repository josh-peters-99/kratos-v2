"use client"

import { useRouter } from "next/navigation";

export default function DiscardWorkoutButton({ workoutId }) {
    const router = useRouter();

    const discardWorkout = async () => {
        if (!confirm("Are you sure you want to discard this workout?")) return;

        try {
            const response = await fetch(`/api/workout/${workoutId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to discard workout");

            console.log("Workout discarded successfully");

            // Redirect to home page after deletion
            router.push("/");
        } catch (error) {
            console.error("Error discarding workout:", error);
        }
    };

    return (
        <button
            onClick={discardWorkout}
            className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
            Discard
        </button>
    );
};