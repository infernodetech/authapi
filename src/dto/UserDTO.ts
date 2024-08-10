import AbstractDTOConverter from "./AbstractDTOConverter";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";

 export class UserDTO {
    firstname : string
    lastname : string
    username : string
    email : string
    roles : Role[]
    id : string


     constructor(firstname: string, lastname: string, username: string, email: string, roles: Role[], id: string) {
         this.firstname = firstname;
         this.lastname = lastname;
         this.username = username;
         this.email = email;
         this.roles = roles;
         this.id = id;
     }
 }

export default class UserDTOConverter extends AbstractDTOConverter<UserDTO, User> {
    constructor() {
        super();
    }
    convertToDTO(user : User & { administrator: (Administrator
            & {  administratorRoles: (AdministrationRoles & { role: Role })[] }) | null }): UserDTO {
        let roles : Role[] = []
       if(user.administrator) {
         user.administrator!.administratorRoles.map((administrationRoles : AdministrationRoles & {role : Role}) => {
                administrationRoles.role
             }
         )
       }

       return new UserDTO(
           user.firstname,
           user.lastname,
           user.username,
           user.email,
           roles,
           user.id
       )


    }

}
