import Router from "express";
import carsRouter from "./cars.router";
import userAdminRouter from "./userAdmin.router"

const router = Router();

router.use('/cars', carsRouter);
router.use('/users-admin', userAdminRouter);

export default router;