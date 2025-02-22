import db from "../config/db";

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
  }

export const findById = async (id: number): Promise<User | null> => {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", 
        [id]);
    return rows.length ? rows[0] : null;
};

export const findAll = async (): Promise<User[]> => {
    try {
        const { rows } = await db.query("SELECT * FROM users ORDER BY id ASC");
        return rows;
    } catch (error) {
        console.log("Error fetching users: ", error);
        return [];
    }
}

export const createUser = async (user: User): Promise<User> => {
   const { username, email, password } = user;
   const { rows } = await db.query("INSERT INTO users ( name, email, password) VALUES ($1, $2, $3) RETURNING *", 
    [username, email, password]);

    return rows[0];
}

export const updateUser = async(id: number, user: Partial<User>): Promise<User | null> => {
    const { username, email } = user;
    const { rows } = await db.query("UPDATE TABLE users SET username = $1, email = $2 RETURNING *", 
        [username, email]);
    
    return rows.length ? rows[0] : null;
}

/* export const deleteUser = async (id: number): Promise<boolean> => {
    const { rowCount } = await db.query("DELETE FROM users WHERE id = $1", 
        [id]);
    
    return rowCount > 0;
} */