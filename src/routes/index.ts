import Router from "express";
import carsRouter from "./cars.router";
import userAdminRouter from "./userAdmin.router"
/* import user from "./user.router"; */

const router = Router();

router.use('/cars', carsRouter);
router.use('/users-admin', userAdminRouter);
/* router.use('/users', user); */

export default router;