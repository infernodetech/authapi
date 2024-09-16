import {inject, injectable} from "tsyringe";
import Service from "./Service";
import IService from "./IService";
import {Scope, User} from "@prisma/client";
import ScopeDTOConverter, {ScopeDTO} from "../dto/ScopeDTO";
import UserRepository from "../repository/UserRepository";
import ScopeRepository from "../repository/ScopeRepository";
import CustomError from "../errors/CustomError";
import UserDTOConverter from "../dto/UserDTO";
import {generateToken} from "../util/token";

@injectable()
export default class ScopeService extends Service implements IService<Scope, ScopeDTO> {

    constructor(
        @inject('ScopeRepository') private _repository: ScopeRepository
    ) {
        super()
    }
    async getAll(): Promise<ScopeDTO[]> {
        let scopes : Scope[] = []
        try {
            scopes   = await this._repository.findAll()
        } catch(e) {
            throw this.translateError((e as Error) )
        }
        if(scopes.length <= 0) throw new CustomError('There are no scopes', 404)
        return ScopeDTOConverter.getConverter().convertListToDTO(scopes)
    }
    async getById(id: string): Promise<ScopeDTO> {
        let scope: Scope | null = null
        try {
            scope = await this._repository.findById(id);
        }  catch(e) {
            throw this.translateError((e as Error))
        }
        if(scope === null) throw new CustomError(`The scope with id ${id} does not exists`, 404)
        return ScopeDTOConverter.getConverter().convertToDTO(scope);
    }

    async checkScope(scope : object) {
        if('name' in scope && 'clientId' in scope && 'userId' in scope) {
            if(typeof scope.name !== 'string') {
                throw new CustomError('The scope name needs to be a string', 400)
            }
            if(typeof scope.clientId !== 'string') {
                throw new CustomError('The scope clientId needs to be a string', 400)
            }
            if(typeof scope.userId !== 'string') {
                throw new CustomError('The scope userId needs to be a string', 400)
            }
        } else {
            throw new CustomError('name , clientId and userId must be specified', 400)
        }
    }

    async create(scope: Scope): Promise<ScopeDTO> {
        await this.checkScope(scope)

        try {
            scope.tokenId = await generateToken({
                clientId: scope.clientId,
                userId: scope.userId
            })
        } catch(e) {
            new CustomError('There is been an error generating the token', 500)
        }
        let createdScope :   Scope | null = null
        try {
            createdScope = await this._repository.save(scope)
        } catch (e) {
            throw this.translateError((e as Error))
        }
        return ScopeDTOConverter.getConverter().convertToDTO(createdScope)
    }
    async update(scope: Scope): Promise<ScopeDTO> {
        let updatedScope :   Scope | null = null
        try {
            updatedScope = await this._repository.update(scope)
        } catch(e) {
            throw this.translateError((e as Error))
        }
        return ScopeDTOConverter.getConverter().convertToDTO(updatedScope)
    }
    async remove(id: string): Promise<ScopeDTO> {
        let scope : Scope | null = null;
        try {
            scope = await this._repository.delete(id)
        } catch(e) {
            throw this.translateError((e as Error))
        }
        return ScopeDTOConverter.getConverter().convertToDTO(scope);
    }

    async checkToken(tokenId : string, clientId : string) : Promise<boolean> {
        try {
            let token = await this._repository.findScopeByTokenandClientId(tokenId, clientId)
            return token !== null;
        } catch(e) {
            throw this.translateError((e as Error))
        }
    }


}
