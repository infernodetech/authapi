import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config';
import errorHandler  from './middleware/ErrorHandler';
import * as indexRouter from './routes/index';
require('dotenv').config();
import * as scopesRouter from './routes/scopes'
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import ejs from 'ejs'
import path from "node:path";

// Initialize Express app
const app = express();

app.set('view_engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware

app.use(cors({origin: '*'}))
app.use(helmet.xssFilter())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(logger(process.env.NODE_ENV!));
app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Routes
app.use('/api/users', indexRouter.default);
app.use('/api/scopes', scopesRouter.default)

// Error handler
app.use(errorHandler);


// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server is up on PORT: ${process.env.PORT}`);
});

export default app;
