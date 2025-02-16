import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Exercise from "@/models/Exercise";

export async function GET(req) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const exerciseId = searchParams.get("exerciseId");

        const exercise = await Exercise.findOne({ exerciseId });

        if (exercise) {
            return NextResponse.json({ exists: true, exercise }, { status: 200 });
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
        const { id, name = "", sets = [] } = await req.json();

        const exisitingExercise = await Exercise.findOne({ id });
        if (exisitingExercise) {
            return NextResponse.json({ error: "A exercise with that id already exists" }, { status: 400 });
        }

        await Exercise.create({ id, name, sets });

        return NextResponse.json({ message: "Exercise saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating exercise:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        await connectDB();
        const { id, ...updates } = await req.json();

        const exercise = await Exercise.findOneAndUpdate({ id }, updates, { new: true });

        if (!exercise) {
            return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Exercise updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating exercise:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}