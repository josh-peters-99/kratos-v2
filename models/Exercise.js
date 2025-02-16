import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, default: "" },
    sets: { type: Array, default: [] },
})

export default mongoose.models.Exercise || mongoose.model("Exercise", ExerciseSchema);