import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { workoutId } = await req.json();
        if (!workoutId) {
            return NextResponse.json({ error: "Workout ID is required" }, { status: 400 });
        }

        await connectDB();
        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Add workoutId only if it's not already in the array
        if (!user.workouts.includes(workoutId)) {
            user.workouts.push(workoutId);
            await user.save();
        }

        return NextResponse.json({ message: "Workout added successfully", workouts: user.workouts }, { status: 200 });
    } catch (error) {
        console.error("Error adding workout to user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}