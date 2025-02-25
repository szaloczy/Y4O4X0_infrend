import userModel, { User } from "../models/userModel";

class UserService {

    public async getUserById(id: string): Promise<User | null> {
        return await userModel.findById(id);
    }

    public async createUser(user: User): Promise<User | null> {
        return await userModel.createUser(user);
    }
}

export default new UserService();