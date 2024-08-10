export default class CustomError extends Error {
    statusCode : number;
    status?: string;
    constructor(message: string, code : number, status? : string) {
        super(message)
        this.statusCode = code
        this.status = status
    }
}

export  class NotFound extends Error {
    constructor(entityName : string) {
            super(`${entityName } was not found`);
    }
}

export class Duplicated extends Error {
    constructor(value : string ) {
        super(`Duplicated ${value}`);
    }
}

export class InvalidValue extends Error {
    constructor(type: string, value : string) {
        super(`Invalid  ${type}: ${value}`);
    }
}

export class DatabaseConnectionError extends Error {
    constructor() {
        super(`There was an error connecting to the database`)
    }
}

export class UnknownRequest extends Error {
    constructor(message : string ) {
        super(`There was an error during the request: ${message}`);
    }
}

export class ValidationError extends Error {
    constructor(field : string, message : string ) {
        super(`Invalid ${field} : ${message}`);
    }
}




