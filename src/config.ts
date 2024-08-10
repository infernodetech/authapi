import swaggerjsdoc from "swagger-jsdoc";
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            description: 'API For authentication of users and apps scopes',
            version: '1.0.0',
            contact: {
                name: 'Cristian'
            },
        },
        servers: [
            {
                url: "http://localhost:300/"
            }
        ],
    },
    apis: ['./src/routes/*.ts']
}
export const swaggerDocs = swaggerjsdoc(swaggerOptions)
