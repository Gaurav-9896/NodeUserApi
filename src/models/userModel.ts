import { valid } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: Date;
  role: String;
  isBlocked: Boolean;
  blockedUntil?: Date | null;
  incorrectLoginAttempts: number;
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  role: {
    type: String,
    valid: ["admin", "user"],
    default: "user",
  },
  isBlocked: { type: Boolean, default: false },
  blockedUntil: { type: Date },
  incorrectLoginAttempts: { type: Number, default: 0 }
});

export default mongoose.model<IUser>("User", userSchema);
