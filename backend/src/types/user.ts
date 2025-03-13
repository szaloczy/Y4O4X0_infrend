export interface User {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    created_at: Date;
}