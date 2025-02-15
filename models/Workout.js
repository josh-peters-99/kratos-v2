import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    exercises: { type: Array, required: true }
}, { timestamps: true })

export default mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);