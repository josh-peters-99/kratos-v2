import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workouts: { type: [String], required: true},
}, { timestamps: true })

export default mongoose.models.User || mongoose.model("User", UserSchema);
