import db from "../config/db";
import { Part } from "../types/parts";

class PartService {
    async getAllParts(): Promise<Part[]> {
        const result = await db.query('SELECT * FROM parts');
        return result.rows;
    }

    async addPart(part: Omit<Part, 'id'>):Promise<Part> {
        const { name, quantity, warehouse_number} = part;
        const result = await db.query('INSERT INTO parts (name, quantity, warehouse_number) VALUES ($1, $2, $3) RETURNING *',
            [name, quantity, warehouse_number]
        );
        return result.rows[0];
    }

    async updatePart(id: number, part: Partial<Part>): Promise<Part> {
        const { name, quantity, warehouse_number } = part;
        const result = await db.query(
            'UPDATE parts SET name = $1, quantity = $2, warehouse_number = $3 WHERE id = $4 RETURNING *',
            [name, quantity, warehouse_number, id]
        );
        return result.rows[0];
    }

    async getPartById(id: number): Promise<Part> {
        const result = await db.query(
        'SELECT * from parts WHERE id = $1',
        [id]
        );
        return result.rows[0];
    }

    async updateStock(id: number, quantity: number): Promise<Part> {
        const result = await db.query(
            'UPDATE Parts SET quantity $1 WHERE id = $2 RETURNING *',
            [quantity, id]
        );
        return result.rows[0];
    }
}

export default new PartService();