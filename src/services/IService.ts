import CustomError from "../errors/CustomError";

export default interface IService<U, T> {
    getAll() : Promise<T[]>
    getById(id : string) : Promise<T>
    create(object : U) : Promise<T>
    update(object : U) : Promise<T>
    remove(id : string) : Promise<T>
}

