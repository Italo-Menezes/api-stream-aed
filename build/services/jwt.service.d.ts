/// <reference types="node" />
import jwt from 'jsonwebtoken';
export declare const jwtService: {
    singToken: (payload: string | Buffer | object, expitation: string) => string;
    verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => void;
};
