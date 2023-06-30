import { Request, Response, Router } from "express";
import CarsService from "../services/cars.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { ICar } from "../models/car.model";
import { bodyValidationCar } from "../utils/validations";
import * as yup from "yup";


const router = Router();

//Lista os veículos
router.get("/", async (req: Request, res: Response) => {
    const cars = await CarsService.getAll();
    res.send(cars);
});

//Adiciona um veículo, authorizationMiddleware
router.post("/", async (req: Request, res: Response) => {
    
    //Validação com yup ----------------------------
    let validateData: ICar | undefined = undefined;

    try {
        validateData = await bodyValidationCar.validate(req.body, { abortEarly: false });
    } catch(err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {}

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        });
        
        return res.status(400).json({ errors });
    }

//fim da validação ---------------------------
    
    await CarsService.create(req.body);
    res.status(201).send({ message: "Veículo registrado com sucesso!" });
});

//Deleta um veículo
router.delete("/remove/:_id",  async (req: Request, res: Response) => {
    const car = await CarsService.getById(req.params.id);
    if(!car && car !== null && car !== undefined) return res.status(400).send({ message: "Veículo não encontrado!"});

    try {
        await CarsService.remove(req.params.id);
        res.status(200).send({ message: "Veículo removido com sucesso!" });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

//Altera um veículo
router.put("/:_id",  async (req: Request, res: Response) => {
    const car = await CarsService.getById(req.params.id);
    if(!car && car !== null && car !== undefined) return res.status(400).send({ message: "Veículo não encontrado!"});

    try {
        await CarsService.update(req.params.id, req.body);
        res.status(200).send({ message: "Veículo modificado com sucesso!" });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;