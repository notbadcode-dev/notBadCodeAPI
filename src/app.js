import express from "express";
import expressRateLimit from 'express-rate-limit';
import morgan from "morgan";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';

import config from './config';

import AppRoutes from "./routes";

const app = express();

// settings
app.set("port", config.PORT);
app.set("strict routing", true);
app.enable('strict routing')

// middlewares
const corsOptions = {};
app.use(cors(corsOptions))

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '100kb' }))
app.use(express.json({ parameterLimit: '1000' }))

app.set("trust proxy", true);

app.use("/api/",expressRateLimit({ windowMs: 5 * 60 * 1000, max: 100 }));

// Swagger
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }'

}
app.use("/api/notbadcode/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));


// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use('/', AppRoutes);

export default app;
