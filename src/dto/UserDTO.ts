import AbstractDTOConverter from "./AbstractDTOConverter";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";

 export class UserDTO {
    firstname : string
    lastname : string
    username : string
    email : string
    id : string


     constructor(firstname: string, lastname: string, username: string, email: string, id: string) {
         this.firstname = firstname;
         this.lastname = lastname;
         this.username = username;
         this.email = email;
         this.id = id;
     }
 }

export default class UserDTOConverter extends AbstractDTOConverter<UserDTO, User> {
    constructor() {
        super();
    }
    convertToDTO(user : User): UserDTO {

       return new UserDTO(
           user.firstname,
           user.lastname,
           user.username,
           user.email,
           user.id
       )


    }

}
