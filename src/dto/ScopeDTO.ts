import AbstractDTOConverter from "./AbstractDTOConverter";
import {Scope} from "@prisma/client";

export  class ScopeDTO {
    client_id : string
    token_id : string


    constructor(client_id: string, token_id: string) {
        this.client_id = client_id;
        this.token_id = token_id;
    }



}

export default class ScopeDTOConverter extends AbstractDTOConverter<ScopeDTO, Scope> {

    constructor() {
        super();
    }

    convertToDTO(scope : Scope): ScopeDTO {
        return new ScopeDTO(
            scope.clientId,
            scope.tokenId
        )
    }

}
