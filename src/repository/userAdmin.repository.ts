import { IUserAdmin, UserAdmin } from "../models/userAdmin.model";

class UserAdminRepository {
    getAll() {
        return UserAdmin.find();
    }

    getByDocument(document: string) {
        return UserAdmin.findOne({ document: document});
    }

    create(userAdmin:  IUserAdmin) {
        return UserAdmin.create(userAdmin);
    }

    update(document: string, userAdmin: Partial<IUserAdmin>) {
        return UserAdmin.updateOne({ document: document }, { $set: userAdmin });

    }

    remove(document: string) {
        return UserAdmin.deleteOne({ document: document }); 
    }

}

export default new UserAdminRepository();