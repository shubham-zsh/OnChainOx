import mongoose, { Schema, model } from "mongoose";

const Connection = mongoose.connect("")
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log("connection error: ", err));

export const userSchema = new Schema ({
    email: { type: String },
    password: {type: String},
    pubKey: {type: String}
});

export const User = model("User", userSchema);


