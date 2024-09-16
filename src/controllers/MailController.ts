import Controller from "./Controller";
import {inject, injectable} from "tsyringe";
import CustomError from "../errors/CustomError";
import { Request, Response, NextFunction } from "express";
import MailService from "../services/MailService";
@injectable()
export default class MailController extends Controller {
    constructor(
        @inject("MailService") private _service: MailService
    ) {
        super();
    }
    sendNewEmail = async (req: Request, res: Response, next : NextFunction) => {
        try {
            if(!req.body.email ) throw new CustomError('An email object must be specified', 400)
            await this._service.validateEmailObject(req.body.email);
            await this._service.sendMail(req.body.email.from, req.body.email.to, req.body.email.subject, req.body.email.html)
        } catch(e) {
            next(e)
        }
    }

    sendEmailVerification = async(req : Request, res : Response, next : NextFunction) => {
        try {
            if(!req.body.email) throw new CustomError('An email object must be specified', 400);
            if(!req.body.userid) throw new CustomError('An userid property must be specified', 400)
            await this._service.validateEmailObject(req.body.email);
            await this._service.sendEmailVerification(req.body.email.from, req.body.email.to, req.body.email.subject,
                                                      req.body.email.html, req.body.userid
                                                     )
            res.status(200).send()
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}
