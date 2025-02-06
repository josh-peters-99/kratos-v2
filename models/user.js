import mongoose, { models, Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, unique: true, required: true },
    workouts: { type: [String], required: true},
}, { timestamps: true })

const User = models.User || mongoose.model('User', userSchema);
export default User;