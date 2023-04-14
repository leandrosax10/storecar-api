import { Request, Response, Router } from "express";
import userAdminService  from "../services/userAdmin.service";
import { authorizationMiddleware } from "../middlewares/authorization.middlewares";

const router = Router();

//Lista os dados dos administradores
router.get('/', authorizationMiddleware ,async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getAll();
    res.send(userAdmin);
});

//busca por document
router.get('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getByDocument(req.params.document);
    if(!userAdmin) return res.status(400).send({ message: 'Administrador não encontrado!'});
    res.status(200).send(userAdmin);
});

//Cria um novo registro - create
router.post('/', authorizationMiddleware, async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Administrador não foi criado pois não tem a idade mínima(18 anos).'});
    }
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

//Atualza um registro pelo document
router.put('/:document', authorizationMiddleware, async (req: Request, res: Response) => {
    const userAdmin = await userAdminService.getByDocument(req.params.document);
    if(!userAdmin && userAdmin !== null && userAdmin !== undefined) 
        return res.status(400).send({ message: 'Administrador não encontrado!'})
    
    try{
        await userAdminService.update(req.params.document, req.body);
        res.status(200).send({ message: 'Administrador atualizado com sucesso!' });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;