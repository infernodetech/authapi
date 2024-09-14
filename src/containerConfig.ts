import UsersService from "./services/UsersService";
import UserRepository from "./repository/UserRepository";
import UserController from "./controllers/UserController";
import {container} from "tsyringe";
import {IScopeRepository, IUserRepository} from "./repository/IRepository";
import ScopeService from "./services/ScopeService";
import ScopeRepository from "./repository/ScopeRepository";
import MailService from "./services/MailService";
import MailController from "./controllers/MailController";
container.register('UsersService', { useClass: UsersService });
container.register<IUserRepository>('UserRepository', { useClass: UserRepository });
container.register('UserController', { useClass: UserController });
container.register('ScopeService', { useClass: ScopeService})
container.register('ScopeRepository', { useClass: ScopeRepository})
container.register('MailService', { useClass: MailService})
container.register('MailController', {useClass: MailController})
