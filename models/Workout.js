import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, default: "" },
    date: { type: Date, default: () => new Date() },
    notes: { type: String, default: "" }
}, { timestamps: true })

export default mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);