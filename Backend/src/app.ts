import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";

import { requestLogger } from "./middleware/logger.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(requestLogger);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Swagger Documentation
|--------------------------------------------------------------------------
*/

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api", routes);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "🚀 Campus Buddy Backend Running",
  });
});

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;