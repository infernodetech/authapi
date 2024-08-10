import CustomError, {InvalidValue, UnknownRequest} from "../errors/CustomError";

export default class Service {
    protected translateError(error : Error) {
        error = (error as Error)
        switch (error.constructor.name) {
            case 'NotFound':
                return new CustomError(error.message, 404);
            case 'UnknownRequest':
            case 'Duplicated':
            case 'ValidationError':
                return new CustomError(error.message, 400);
            case 'InvalidValue':
                return new CustomError(error.message, 422)
            case 'DatabaseConnectionError':
                return new CustomError(error.message, 502)
            default:
                return new CustomError(`Internal server error ${error.message}`, 500);
        }

    }
}
