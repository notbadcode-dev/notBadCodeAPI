import express from "express";
import expressRateLimit from 'express-rate-limit';
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from 'cors';

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100kb' }))
app.use(bodyParser.json({ parameterLimit: '1000' }))

app.set("trust proxy", true); 
app.use("/api/", expressRateLimit({ windowMs: 5 * 60 * 1000, max: 100 }));

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use('/', AppRoutes);

export default app;
