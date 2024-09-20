import UsersService from "./services/UsersService";
import UserRepository from "./repository/UserRepository";
import UserController from "./controllers/UserController";
import {container} from "tsyringe";
import {IUserRepository} from "./repository/IRepository";
import ScopeService from "./services/ScopeService";
import ScopeRepository from "./repository/ScopeRepository";
import UserMailService from "./services/UserMailService";
container.register('UsersService', { useClass: UsersService });
container.register<IUserRepository>('UserRepository', { useClass: UserRepository });
container.register('UserController', { useClass: UserController });
container.register('ScopeService', { useClass: ScopeService})
container.register('ScopeRepository', { useClass: ScopeRepository})
container.register('UserMailService', { useClass: UserMailService})
