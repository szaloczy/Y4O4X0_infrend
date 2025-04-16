import { AppDataSource } from "./data-source";
import express from "express";
import env from "dotenv";

async function main() {
    await AppDataSource.initialize();

    env.config();
    const app = express();
    const PORT = process.env.PORT || '3000';

    app.use(express.json());

    app.listen(PORT, (err) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log(`Server is listening on port: ${PORT}`);
    });
}

main();