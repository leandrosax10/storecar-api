import { Request, Response, Router } from "express";
import userService from "../services/user.service";

const router = Router();

//Lista os dados dos usuários
router.get('/', async (req: Request, res: Response) => {
    const user = await userService.getAll();
    res.send(user);
});

//busca por document
router.get('/:document', async (req: Request, res: Response) => {
    const user = await userService.getByDocument(req.params.document);
    if(!user) return res.status(400).send({ message: 'Usuário não encontrado!'});
    res.status(200).send(user);
});

//Cria um novo registro - create
router.post('/', async (req: Request, res: Response) => {
    if (req.body.age < 18) {
        return res.status(400).send({ message: 'Usuário não foi criado pois não tem a idade mínima(18 anos).'});
    }
    await userService.create(req.body);
    res.status(201).send({message: 'Usuário criado com sucesso!'});
});

//Deleta um registro pelo document - remove
router.delete('/remove/:document', async (req: Request, res: Response) => {
    const user = await userService.getByDocument(req.params.document);
    if(!user && user !== null && user !== undefined) 
        return res.status(400).send({ message: "Usuário não encontrado!"});

    try {
        await userService.remove(req.params.document);
        res.status(200).send({ message: 'Usuário removido com sucesso!' });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    } 
});

//Atualza um registro pelo document
router.put('/:document', async (req: Request, res: Response) => {
    const user = await userService.getByDocument(req.params.document);
    if(!user && user !== null && user !== undefined) 
        return res.status(400).send({ message: 'Usuário não encontrado!'})
    
    try{
        await userService.update(req.params.document, req.body);
        res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
    } catch(error: any) {
        res.status(400).send({ message: error.message });
    }
});

export default router;