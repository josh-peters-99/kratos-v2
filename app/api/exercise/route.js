import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Exercise from "@/models/Exercise";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const exerciseId = searchParams.get("exerciseId");
        const workoutId = searchParams.get("workoutId");

        if (exerciseId) {
            // Fetch a single exercise by exerciseId
            const exercise = await Exercise.findOne({ exerciseId });
            return NextResponse.json({ exists: !!exercise, exercise }, { status: 200 });
        } else if (workoutId) {
            // Fetch all exercises associated with a workoutId
            const exercises = await Exercise.find({ workoutId });
            return NextResponse.json({ exists: exercises.length > 0, exercises }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Missing query parameter (exerciseId or workoutId required" }, { status: 400 });
        }
    } catch (error) {
        console.error("Error fetching exercise(s):", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { workoutId, exerciseId, name = "", sets = [] } = await req.json();

        const exisitingExercise = await Exercise.findOne({ exerciseId });
        if (exisitingExercise) {
            return NextResponse.json({ error: "A exercise with that id already exists" }, { status: 400 });
        }

        await Exercise.create({ workoutId, exerciseId, name, sets });

        return NextResponse.json({ message: "Exercise saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating exercise:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectDB();
        const { exerciseId, ...updates } = await req.json();

        const exercise = await Exercise.findOneAndUpdate({ exerciseId }, updates, { new: true });

        if (!exercise) {
            return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Exercise updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating exercise:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}