import express from "express";
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

// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application" });
});

app.use('/', AppRoutes);

export default app;
