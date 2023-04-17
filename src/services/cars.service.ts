import CarRepository from "../repository/car.repository";
import { Car } from "../models/car.model";
import carRepository from "../repository/car.repository";

class CarsService {

    getAll() {
        return CarRepository.getAll();
    }

    getById(_id: string) {
        return CarRepository.getById(_id);
    }

    create(car: typeof Car) {
        return CarRepository.create(car);
    }

    remove(_id: string) {
        return CarRepository.remove(_id);
    }

    update(_id: string, car: Partial<typeof Car>) {
        return CarRepository.update(_id, car); 
    }
}

export default new CarsService();