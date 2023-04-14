import { User } from "../models/user.model";

class UserRepository {
    getAll() {
        return User.find();
    }

    getByDocument(document: string) {
        return User.findOne({ document: document});
    }

    create(user: typeof User) {
        return User.create(user);
    }

    update(document: string, user: Partial<typeof User>) {
        return User.updateOne({ document: document }, { $set: user });

    }

    remove(document: string) {
        return User.deleteOne({ document: document }); 
    }

}

export default new UserRepository();