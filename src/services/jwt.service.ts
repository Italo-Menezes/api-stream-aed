import jwt from 'jsonwebtoken'
const secret =  'secret'


export const jwtService = {
  singToken: (payload: string | Buffer | object , expitation: string ) => {
    return jwt.sign(payload,  secret ,   {
      expiresIn: expitation
    })
  },
   
  verifyToken: (token: string,  callbackfn: jwt.VerifyCallback ) => {
   jwt.verify(token,  secret , callbackfn)
    }
  }


