import db from "../config/db";
import { User } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

   public async getUserById(id: number) {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length == 0) {
            throw new Error(`User with ${id} id not found`);
        }

        return result.rows[0];
    } catch (error) {
        throw new Error(`User not found`);
    }
   }

   public async registerUser(email: string, username: string, password: string): Promise<User | null> {
    try {
        const existingUser = await db.query("SELECT * FROM users WHERE email = $1", 
            [email]
        );

        if (existingUser.rows.length > 0) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 2);

        const result = await db.query(
            "INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING *", 
            [email, username, hashedPassword]
        );

        return result.rows[0] as User;
    } catch (error) {
        throw new Error("Error while creating new user");
    }
   }

   public async loginUser(username: string, password: string) {
    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length < 0) {
            throw new Error("Invalid username or password");
        }

        const user = result.rows[0] as User;

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.SECRET_KEY as string,
            { expiresIn: '5h'}
        );

        const responseObj = {
            token,
            username: username
        }

        return responseObj;
    } catch (error) {
        throw new Error("Failed to generate token");
    }
   }
}

export default new UserService();