import { Model, Optional } from "sequelize";
import { EpisodeInstance } from "./Episode";
declare type checkPasswordCallback = (err?: Error, isSame?: boolean) => void;
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    birth: Date;
    email: string;
    password: string;
    role: "admin" | "user";
}
export interface UserCreationAttributes extends Optional<User, "id"> {
}
export interface UserInstance extends Model<User, UserCreationAttributes>, User {
    Episodes?: EpisodeInstance[];
    checkPassword: (password: string, callbackfn: checkPasswordCallback) => void;
}
export declare const User: import("sequelize").ModelCtor<UserInstance>;
export {};
