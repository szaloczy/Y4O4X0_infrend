import { AppDataSource } from "./data-source";
import express from "express";
import env from "dotenv";
import cors from 'cors';
import { router } from "./rotues";
import { handleAuthorizationError } from "./middlewares/protect-routes";
import { port } from "./config/config";

async function main() {
    await AppDataSource.initialize();

    env.config();
    const app = express();
    const PORT = port || 3000;
    
    app.use(cors({
        origin: 'http://localhost:4200',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
      }));
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