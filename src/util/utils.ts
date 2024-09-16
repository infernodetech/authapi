import {genSalt, hash} from "bcrypt";
import CustomError from "../errors/CustomError";

 export const hashString =  async (text : string, errorCb: Function) : Promise<string> =>{
    let salt = await genSalt(10)
    return await new Promise<string>((resolve, reject) => {
        hash(text, salt, (error, result) => {
            if(error) {
                reject(errorCb(error))
            } else {
                resolve(result)
            }
        })
    })
}
