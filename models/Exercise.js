import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    sets: { type: Array, required: true }
})

export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);