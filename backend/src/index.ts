import express from 'express';
import env from 'dotenv';
import { AppDataSource } from './data-source';
import userRoutes from './routes/userRoutes'

env.config()

async function main() {
    await AppDataSource.initialize();

    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());
    app.use('/api', userRoutes);

    app.listen(PORT, (err) => {
        if(err) {
            console.error(err);
        }
        console.log(`Server listening on port ${PORT}`);
    });
}

main();
