import Repository from "./Repository";
import IRepository from "./IRepository";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";
import 'reflect-metadata'
import {injectable} from "tsyringe";

@injectable()
export default class UserRepository extends Repository implements IRepository<User> {
   async  findAll(): Promise<User[]> {
        try {
            return await Repository.getPrismaClient().user.findMany({
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async findByUsername(username: string): Promise<User> {
        try {
            let user = await Repository.getPrismaClient().user.findUnique({
                where: {
                    username: username
                },
                include: {
                    administrator: {
                        include: {
                            administratorRoles: {
                                include: {
                                    role: true
                                }
                            }
                        }
                    }
                }
            })
            return user!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async findById(id: string): Promise<User> {
        try {
            let user = await Repository.getPrismaClient().user.findUnique({
                where: {
                    id: id
                },
            });

            return user!
        } catch (e) {
            throw this.handlePrismaErrors(e);
        }
    }
    async save(user: User): Promise<User> {
        try {
            let createdUser = await Repository.getPrismaClient().user.create({
                data: user,
            })
            return createdUser!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async update(user: User): Promise<User> {
        try {
            return await Repository.getPrismaClient().user.update({
                where: {
                    id: user.id
                },

                data: user
            })
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async delete(id: string): Promise<User> {
        try {
            return await Repository.getPrismaClient().user.delete({
                where: {
                    id: id
                },
            })
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }



}
