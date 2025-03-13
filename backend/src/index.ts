import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import dashboardRoutes from "./routes/dashboardRoutes";
import partRoutes from "./routes/partRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api", userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/parts', partRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});