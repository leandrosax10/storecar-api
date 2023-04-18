import * as yup from "yup";
import { IUserAdmin } from "../models/userAdmin.model";
import { ICar } from "../models/car.model";

//Validações do  usuário administrador
export const bodyValidationUser: yup.ObjectSchema<IUserAdmin> = yup.object().shape({
    name: yup.string().required().min(12, "Digite o nome completo!"),
    email: yup.string().required().min(15).email("Insira um e-mail válido."),
    document: yup.string().required().min(11, "O cpf deve conter 11 dígitos"),
    password: yup.string().required().min(6, "A senha deve conter pelo menos 6 caracteres."),
    age: yup.number().required().min(2),
    phone: yup.string().required().min(11, "Insira um telefone válido."),
    createdAt: yup.date(),
    updateAt: yup.date(),
});

//Validações dos veículos
export const bodyValidationCar: yup.ObjectSchema<ICar> = yup.object().shape({
    name: yup.string().required().min(5),
    make: yup.string().required().min(3),
    exchange: yup.string().required().min(3),
    color: yup.string().required().min(3),
    description: yup.string().required().min(15),
    km: yup.number().required().min(0),
    img: yup.string().required().min(20),
    price: yup.number().required().min(2),
    quantity: yup.number().required().min(1),
    year: yup.number().required().min(4),
    sold: yup.boolean().required(),
    phonecontact: yup.string().required().min(11, "Insira um telefone válido."),
    createdAt: yup.date(),
    updateAt: yup.date(),
});
