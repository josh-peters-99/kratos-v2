import { connectDB } from "@/lib/mongodb";
import Workout from "@/models/Workout";
import Exercise from "@/models/Exercise";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { workoutId } = params;
        if (!workoutId) {
            return NextResponse.json({ error: "Workout ID is required" }, { status: 400 });
        }

        await connectDB();

        // Delete the workout
        const deletedWorkout = await Workout.findOneAndDelete(workoutId);
        if (!deletedWorkout) {
            return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }

        // Delete all exercises associated with this workout
        await Exercise.deleteMany({ workoutId });

        // Remove workoutId from the user's workouts array
        await User.findByIdAndUpdate(session.user.id, { $pull: { workouts: workoutId } });

        return NextResponse.json({ message: "Workout discarded successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error discarding workout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
