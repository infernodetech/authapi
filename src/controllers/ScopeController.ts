import {inject, injectable} from "tsyringe";
import Controller from "./Controller";
import UsersService from "../services/UsersService";
import ScopeService from "../services/ScopeService";
import {NextFunction, Request, Response} from "express";
import {ScopeDTO} from "../dto/ScopeDTO";
import CustomError from "../errors/CustomError";

@injectable()
export default class ScopeController extends Controller {
    constructor(
        @inject("ScopeService") private _service: ScopeService
    ) {
        super();
    }


    obtainAll = async (req : Request, res : Response, next : NextFunction) => {
        try {
            res.status(200).send({scopes: [...await this._service.getAll()]})
        } catch(e) {
            next(e);
        }
    }

    obtainById = async (req : Request, res : Response, next : NextFunction) => {
        try {
            if(!req.params.id) res.send('An id should be provided')
            res.status(200).json(await this._service.getById(req.params.id))
        } catch (e) {
            next(e)
        }
    }

    checkToken = async(req : Request, res : Response , next : NextFunction) => {
        try {
            if(!req.body.tokenId || !req.body.clientId ) throw new CustomError('You need to specify a clientId and a tokenId ', 400)
            let success : boolean = await this._service.checkToken(req.body.tokenId , req.body.clientId)
            if(success) return res.status(200).json({status: true})
            return res.status(401).json({status: false})
        } catch(e) {
            next(e)
        }
    }

    createScope = async(req: Request, res : Response, next : NextFunction) => {
        try {
            if(!req.body.scope) throw new CustomError('You need to provide a scope', 400)
            let scope = await this._service.create(req.body.scope)
            return res.status(200).json({scope: {...scope}})
        } catch(e) {
            next(e)
        }
    }
}
