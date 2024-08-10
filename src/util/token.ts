import {   SignJWT} from 'jose'


const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
export const generateToken =  async(uid : string ) => {
    return await new SignJWT({ uid })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setIssuer('')
        .setAudience('')
        .setExpirationTime('1h')
        .sign(secret)
}
