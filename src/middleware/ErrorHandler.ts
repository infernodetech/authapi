import CustomError from "../errors/CustomError";
import { Request, Response, NextFunction } from "express";

const handleJWTError = () => new CustomError('Invalid token please login again', 400);

const handleJWTExpiredError = () => new CustomError('Token has expired please login again', 400);

const sendErrorProd = (err: Error, req: Request, res: Response) => {
    return res.status((err as  CustomError).statusCode ?? 500).json({
        status: (err as CustomError).status ?? 'error',
        message: err.message
    })

}

const sendErrorDev = (err: Error, req: Request, res: Response) => {
    res.status((err as CustomError).statusCode ?? 500).json({
        status: (err as CustomError).status ?? 'error',
        errors: err,
        message: err.message,
        stack: err.stack,
    });

};
 const errorHandler = async  (err : Error, req  : Request,  res : Response, next : NextFunction) => {
    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else if(process.env.NODE_ENV === 'production') {
        let error = {...err}
        error.message = err.message
        sendErrorProd(error, req, res)
    }
}
export default errorHandler
