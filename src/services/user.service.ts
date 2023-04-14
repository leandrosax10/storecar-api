import userRepository from "../repository/user.repository";
import { User } from "../models/user.model";

class UserService {
    getAll() {
        return userRepository.getAll();
    }

    getByDocument(document: string) {
        return userRepository.getByDocument(document);
    }

    create(user: typeof User) {
        return userRepository.create(user);
    }

    remove(document: string) {
        return userRepository.remove(document);
    }

    update(document: string, user: Partial<typeof User>) {
        return userRepository.update(document, user);
    }
}

export default new UserService();