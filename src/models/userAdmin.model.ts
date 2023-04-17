import { Schema } from "mongoose";
import mongoose from "mongoose";

import * as yup from "yup";

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

const bodyValidation: yup.ObjectSchema<IUserAdmin> = yup.object().shape({
    name: yup.string().required().min(45),
    email: yup.string().required().min(25),
    document: yup.string().required().min(11),
    password: yup.string().required().min(6),
    age: yup.number().required().min(2),
    phone: yup.string().required().min(12),
    createdAt: yup.date().required(),
    updateAt: yup.date().required(),

});

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