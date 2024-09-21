import {NextFunction} from "express";
import Service from "../services/Service";

export default class Controller {
    public static getController<T extends Controller>(this: new () => T) : T {
        if((this as any)._controller) {
            (this as any)._controller = new this()
        }
        return (this as any)._controller
    }
 }

