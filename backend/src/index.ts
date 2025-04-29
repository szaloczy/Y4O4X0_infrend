import { AppDataSource } from "./data-source";
import express from "express";
import env from "dotenv";
import cors from 'cors';
import { router } from "./rotues";
import { handleAuthorizationError } from "./middlewares/protect-routes";

async function main() {
    await AppDataSource.initialize();

    env.config();
    const app = express();
    const PORT = process.env.PORT || '3000';

    app.use(cors());
    app.use(express.json());
    app.use('/api', router, handleAuthorizationError);

    app.listen(PORT, (err) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log(`Server is listening on port: ${PORT}`);
    });
}

main();