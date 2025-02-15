import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Workout from "@/models/Workout";

export async function POST(req) {
    try {
        await connectDB();
        const { id, title, date, exercises } = await req.json();

        const existingWorkout = await Workout.findOne({ id });
        if (existingWorkout) {
            return Response.json({ error: "A workout with that id already exists" }, { status: 400 });
        }

        await Workout.create({ id, title, date, exercises });

        return NextResponse.json({ message: "Workout saved successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}