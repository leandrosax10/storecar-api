import { Schema } from "mongoose";
import mongoose from "mongoose";

export const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    document: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: String,
    },
    adrees: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt:{
        type: Date,
        default: new Date(),
    }
});

export const User = mongoose.model('User', userSchema);