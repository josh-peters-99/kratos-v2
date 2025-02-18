import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Workout from "@/models/Workout";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const workout = await Workout.findOne({ id });

        if (workout) {
            return NextResponse.json({ exists: true, workout }, { status: 200 });
        } else {
            return NextResponse.json({ exists: false }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const { id, title = "", date, notes = "" } = await req.json();

        const existingWorkout = await Workout.findOne({ id });
        if (existingWorkout) {
            return NextResponse.json({ error: "A workout with that id already exists" }, { status: 400 });
        }

        await Workout.create({ 
            id, 
            title, 
            date: date ? new Date(date) : new Date(), // Default to today's date if missing
            notes 
        });

        return NextResponse.json({ message: "Workout saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating workout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectDB();
        const { id, ...updates } = await req.json();

        const workout = await Workout.findOneAndUpdate({ id }, updates, { new: true });

        if (!workout) {
            return NextResponse.json({ error: "Workout not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Workout updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating workout:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}