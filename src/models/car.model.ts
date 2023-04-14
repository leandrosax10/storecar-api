import { Schema } from "mongoose";
import mongoose from "mongoose";

export const carSchema = new Schema({
    name: {
        type: String,
    },
    make: {
        type: String,
    },
    exchange: {
        type: String,
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
    km: {
        type: Number,
    },
    img: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    year: {
        type: Number,
    },
    sold: {
        type: Boolean,
    },
    phonecontact: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updateAt:{
        type: Date,
        default: new Date(),
    }
});

export const Car = mongoose.model('Car', carSchema);