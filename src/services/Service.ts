import CustomError, {InvalidValue, UnknownRequest} from "../errors/CustomError";
import winston from 'winston';

export default class Service {
     logger: winston.Logger = winston.createLogger({
        level: 'debug',
        format: winston.format.json(),
        transports: [new winston.transports.Console()]
    });




    protected translateError(error : Error) {
        error = (error as Error)
        switch (error.constructor.name) {
            case 'NotFound':
                return new CustomError(error.message, 404);
            case 'UnknownRequest':
            case 'Duplicated':
            case 'ValidationError':
                return new CustomError(error.message, 400, error.constructor.name);
            case 'InvalidValue':
                return new CustomError(error.message, 422, error.constructor.name)
            case 'DatabaseConnectionError':
                return new CustomError(error.message, 502, error.constructor.name)
            default:
                return new CustomError(`Internal server error ${error.message}`, 500);
        }

    }
}
