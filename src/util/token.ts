import {   SignJWT} from 'jose'

export const encoder = new TextEncoder()
const secret = encoder.encode(process.env.JWT_SECRET_KEY)
export const generateToken =  async(data : Record<string, any>) => {
    return await new SignJWT({ data: data})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setIssuer('')
        .setAudience('')
        .setExpirationTime('1h')
        .sign(secret)
}

