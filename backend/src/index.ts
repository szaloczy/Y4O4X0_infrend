import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});