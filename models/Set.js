import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
    id: { type: String, required: true },
    exerciseId: { type: String, required: true },
    count: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true }
})

export default mongoose.models.Set || mongoose.model("Set", SetSchema);