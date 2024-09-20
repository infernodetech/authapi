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
import cors from 'cors'
// Initialize Express app
const app = express();
app.use(cors({
    origin: '*'
}))
// Middleware
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
if(process.env.PORT === undefined) throw new Error("There is no PORT specified")
app.listen(process.env.PORT, () => {
    console.log(`Server is up on PORT: ${process.env.PORT}`);

});


export default app;
