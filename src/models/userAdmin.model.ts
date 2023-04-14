import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IUserAdmin {
    name: string;
    email: string;
    document: string;
    password: string;
    age: number;
    phone: string;
    createdAt: string | Date;
    updateAt: string | Date;
}

export const userAdminSchema = new Schema<IUserAdmin>({
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
    createdAt: {
        type: Date,
        default: new Date()
    },
    updateAt:{
        type: Date,
        default: new Date(),
    }
});

export const UserAdmin = mongoose.model<IUserAdmin>('UserAdmin', userAdminSchema);