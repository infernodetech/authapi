import Repository from "./Repository";
import IRepository, {IScopeRepository} from "./IRepository";
import {Scope} from "@prisma/client";
import 'reflect-metadata'
import {injectable, singleton} from "tsyringe";
@injectable()
@singleton()
export default class ScopeRepository extends Repository implements IScopeRepository {
    async findAll(): Promise<Scope[]> {
        try {
            return await Repository.getPrismaClient().scope.findMany({
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async findById(id: string): Promise<Scope> {
        try {
            let scope = await  Repository.getPrismaClient().scope.findUnique({
                where: {
                    id: id
                }
            })
            return scope!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async save(scope: Scope): Promise<Scope> {
        try {
            let createdScope = await Repository.getPrismaClient().scope.create({
                data: scope
            })
            return createdScope!
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async update(scope: Scope): Promise<Scope> {
        try {
            let updatedScope = await Repository.getPrismaClient().scope.update({
                where: {
                    id: scope.id
                },
                data: scope
            })
            return updatedScope!
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
   async  delete(id: string): Promise<Scope> {
        try{
            return await Repository.getPrismaClient().scope.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }


   async findScopeByTokenandClientId(tokenId : string, clientId : string) : Promise<Scope> {
        try {
            let scope = await Repository.getPrismaClient().scope.findFirst({
                where: {
                    tokenId: tokenId,
                    clientId: clientId
                }
            })
            return scope!
        }catch (e) {
            throw this.handlePrismaErrors(e)
        }
   }

}
