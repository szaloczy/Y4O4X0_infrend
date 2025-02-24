import userModel, { User } from "../models/userModel";

class UserService {

    public async getUserById(id: string): Promise<User | null> {
        return await userModel.findById(id);
    }
}

export default new UserService();