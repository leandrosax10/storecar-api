import { Request, Response, Router } from "express";
import userAdminService  from "../services/userAdmin.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";
import { IUserAdmin, UserAdmin } from "../models/userAdmin.model";
import { bodyValidationUser } from "../utils/validations";
import * as yup from "yup";

const router = Router();

//Lista os dados dos administradores
router.get('/', authorizationMiddleware , async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getAll();
    res.send(userAdmin);
});

//busca por document
router.get('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getByDocument(req.params.document);
    if(!userAdmin) return res.status(400).send({ message: 'Administrador não encontrado!'});
    res.status(200).send(userAdmin);
});

//Cria um novo registro - CREATE
router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Administrador não foi criado pois não tem a idade mínima(18 anos).'});
    }  

    //Validação para evitar duplicidade de cadastro
    UserAdmin.findOne({ document: req.body.document}).then((UserAdmin) => {
        if(UserAdmin){
            res.status(400).send({ message: 'Admnistrador já existe!'});
        }
    }).catch((err: any)=> {
        res.status(400).send({ message: 'Erro interno!'});
    });

 //Validação com yup ----------------------------
    let validateData: IUserAdmin | undefined = undefined;

    try {
        validateData = await bodyValidationUser.validate(req.body, { abortEarly: false });
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

    await userAdminService.create(req.body);
    res.status(201).send({message: 'Administrador criado com sucesso!'});
});


//Autenticação
router.post("/authorization", async (req: Request, res: Response) => {
    try{
        const token =  await userAdminService.authorization(req.body.document, req.body.password);
        res.status(200).send({ token });
    } catch (error: any) {
        res.status(401).send({ message: error.message });
    }
});


//Deleta um registro pelo document - remove
router.delete('/remove/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getByDocument(req.params.document);
    if(!userAdmin && userAdmin !== null && userAdmin !== undefined) 
        return res.status(400).send({ message: "Administrador não encontrado!"});

    try {
        await userAdminService.remove(req.params.document);
        res.status(200).send({ message: 'Administrador removido com sucesso!' });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    } 
});

//Atualiza um registro pelo document
router.put('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getByDocument(req.params.document);
    if(!userAdmin && userAdmin !== null && userAdmin !== undefined) 
        return res.status(400).send({ message: 'Administrador não encontrado!'})


        if (req.body.age < 18) {
            return res.status(400).send({ message: 'Insira a idade correta, mínima(18 anos).'});
        }  

        //Validação com yup ----------------------------
    let validateData: IUserAdmin | undefined = undefined;

    try {
        validateData = await bodyValidationUser.validate(req.body, { abortEarly: false });
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

    try{
        await userAdminService.update(req.params.document, req.body);
        res.status(200).send({ message: 'Administrador atualizado com sucesso!' });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});


export default router;