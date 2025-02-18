import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    exerciseId: { type: String, required: true},
    workoutId: { type: String, required: true },
    name: { type: String, default: "" },
})

export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);