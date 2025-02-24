import db from "../config/db";
import bcrypt from "bcrypt";

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
  }

/**
 * Class for handling User
*/ 
class UserModel {
    /**
     * Create a new User
     * @param user data of the created user
     * @returns object of the created user (without password)
     */

    async createUser(user: User): Promise<Omit<User, 'password'>> {
        
        try {
            const { username, email, password } = user;            
            if( !username || username.length < 3 ) {
                throw new Error("Username must be at least 3 character long");
            }
            if ( !email || !email.includes("@")) {
                throw new Error("Invalid email format");
            }
            if ( !password || password.length < 5) {
                throw new Error("Password must be at least 5 character long");
            }

            const existingUser = await db.query("SELECT * FROM users WHERE email LIKE $1 OR username LIKE = $2", 
                [email, username]
            );

            if ( existingUser.rows.length > 0 ) {
                throw new Error("Email or username already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 2);

            const { rows } = await db.query(
                "INSERT INTO users ( email, username, password ) VALUES ( $1, $2, $3 ) RETURNING *", 
                [ email, username, hashedPassword]
            );

            return rows[0];

        } catch (error) {
            console.error("Error with the creation of the user", error);
            throw new Error("User creation failed");
        }

    }
}