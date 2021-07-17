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
var allowedOrigins = ['http://localhost:4200', 'http://192.168.1.102:4200'];
app.use(cors('*', {
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  exposedHeaders: ['X-Auth'],
}));

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
  res.json({ message: "Notbadcode API" });
});

app.use('/', AppRoutes);

export default app;
