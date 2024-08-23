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


// Initialize Express app
const app = express();

// Middleware
app.use(helmet.xssFilter())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(logger(process.env.NODE_ENV!));
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
