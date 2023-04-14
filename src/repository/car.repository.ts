import { Car } from "../models/car.model";

class CarRepository {
    getAll() {
        return Car.find();
    }

    getById(_id: string) {
        return Car.findOne({ id: _id});
    }

    create(car: typeof Car) {
        return Car.create(car);
    }

    update(_id: string, car: Partial<typeof Car>) {
        return Car.updateOne({ id: _id }, { $set: car });
    }

    remove(_id: string) {
        return Car.deleteOne({ id: _id });
    }
}

export default new CarRepository();