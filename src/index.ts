import express, { Request, Response } from "express";
import connectDB from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";
import config from "./config/config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import SwaggerDocument from "../swagger.json";
import { globalErrorHandler } from "./Middleware/globalErrorHandler";
import { checkRoutes } from "./Middleware/checkRoutes";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocument));
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("APi for user REgistration");
});
app.use("/api", userRoutes);
app.use(checkRoutes);

app.use(globalErrorHandler)
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
