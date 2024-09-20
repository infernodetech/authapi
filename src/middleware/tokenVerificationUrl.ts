import UserController from "../controllers/UserController";
import {Request, Response, NextFunction} from "express";
import CustomError from "../errors/CustomError";
import {jwtVerify} from "jose";
import {encoder} from "../util/token";


const tokenVerificationUrl = async (req: Request, res : Response, next : NextFunction) => {
    if(!req.params.verificationToken) throw new CustomError('A valid token must be provided', 401)
   try {
       const { payload } = await jwtVerify(req.params.verificationToken, encoder.encode(process.env.JWT_SECRET_TOKEN));
       req.body.data = payload.data
       next()
   } catch(e) {
       return res.status(401).json('Invalid token');
   }

}
export default tokenVerificationUrl
