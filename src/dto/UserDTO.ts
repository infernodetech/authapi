import AbstractDTOConverter from "./AbstractDTOConverter";
import { User} from "@prisma/client";

 export class UserDTO {
    firstname : string
    lastname : string
    username : string
    email : string
    id : string
    administrator : boolean = false;


     constructor(firstname: string, lastname: string, username: string, email: string, id: string, administrator : boolean) {
         this.firstname = firstname;
         this.lastname = lastname;
         this.username = username;
         this.email = email;
         this.id = id;
         this.administrator = administrator;
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
           user.id,
           JSON.parse(JSON.stringify(user.permissions)).length >= 0
       )


    }

}
