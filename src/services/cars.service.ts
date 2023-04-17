import CarRepository from "../repository/car.repository";
import { ICar } from "../models/car.model";

class CarsService {

    getAll() {
        return CarRepository.getAll();
    }

    getById(_id: string) {
        return CarRepository.getById(_id);
    }

    create(car: ICar) {
        return CarRepository.create(car);
    }

    remove(_id: string) {
        return CarRepository.remove(_id);
    }

    update(_id: string, car: Partial<ICar>) {
        return CarRepository.update(_id, car); 
    }
}

export default new CarsService();