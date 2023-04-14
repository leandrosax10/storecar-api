import userAdminRepository from "../repository/userAdmin.repository";
import { IUserAdmin, UserAdmin } from "../models/userAdmin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretJWT = process.env.JWT_SECRET_KEY || "";

class UserAdminService {
    getAll() {
        return userAdminRepository.getAll();
    }

    getByDocument(document: string) {
        return userAdminRepository.getByDocument(document);
    }

    async create(userAdmin:  IUserAdmin) {
        if(userAdmin.password) {
            userAdmin.password = await bcrypt.hash(userAdmin.password, 10);
        }
        return userAdminRepository.create(userAdmin);
    }

    async authorization(document: string, password: string) {
        const userAdmin = await userAdminRepository.getByDocument(document);

        if(!userAdmin) throw new Error("Administrador não encontrado!");

        const result = await bcrypt.compare(password, userAdmin.password);
        //Chave que expira em 1 hora
        if(result) {
            return jwt.sign({ document: userAdmin.document, _id: userAdmin._id}, secretJWT, {
                expiresIn: "1h"
            });
        }

        throw new Error("Falha na autenticação!");
    }

    remove(document: string) {
        return userAdminRepository.remove(document);
    }

    update(document: string, userAdmin: Partial<IUserAdmin>) {
        return userAdminRepository.update(document, userAdmin);
    }
}

export default new UserAdminService();