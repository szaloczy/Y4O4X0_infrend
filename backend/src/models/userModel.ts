import db from "../config/db";
import bcrypt from "bcrypt";

// Felhasználó típus definiálása
export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
}

class UserModel {

    public async findById(id: string): Promise<User | null> {
        try {
            const { rows } = await db.query("SELECT * FROM users WHERE id = $1", 
                [id]
            );
            return rows[0];
        } catch (error) {
            console.log(`Failed to fetch user with id: ${id}`);
            return null;
        }
    }

    /**
     * Új felhasználó létrehozása
     * @param user - Felhasználói adatok
     * @returns - A létrehozott felhasználó (jelszó nélkül)
     */
    async createUser(user: User): Promise<Omit<User, 'password'>> {
        try {
            const { username, email, password } = user;

            // Adatok validálása
            if (!username || username.length < 3) {
                throw new Error("Username must be at least 3 characters long");
            }
            if (!email || !email.includes("@")) {
                throw new Error("Invalid email format");
            }
            if (!password || password.length < 5) {
                throw new Error("Password must be at least 5 characters long");
            }

            // Ellenőrizzük, hogy a felhasználó már létezik-e
            const existingUser = await db.query(
                "SELECT * FROM users WHERE email = $1 OR username = $2", 
                [email, username]
            );

            if (existingUser.rows.length > 0) {
                throw new Error("Email or username already exists");
            }

            // Jelszó titkosítása
            const hashedPassword = await bcrypt.hash(password, 2);

            // Felhasználó beszúrása az adatbázisba
            const { rows } = await db.query(
                "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at", 
                [email, username, hashedPassword]
            );

            return rows[0];
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("User creation failed");
        }
    }
}

export default new UserModel();
