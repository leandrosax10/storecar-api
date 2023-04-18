import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface ICar {
    name: string;
    make: string;
    exchange: string;
    color: string;
    description: string;
    km: number;
    img: string;
    price: number;
    quantity: number;
    year: number;
    sold: boolean;
    phonecontact: string;
    createdAt?: Date;
    updateAt?: Date;
}

export const carSchema = new Schema<ICar>({
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
        unique: true
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

export const Car = mongoose.model<ICar>('Car', carSchema);