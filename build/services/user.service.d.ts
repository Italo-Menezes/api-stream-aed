import { EpisodeInstance } from "../models/Episode";
import { UserCreationAttributes } from "../models/User";
export declare const UserService: {
    findByEmail: (email: string) => Promise<import("../models/User").UserInstance | null>;
    create: (attributes: UserCreationAttributes) => Promise<import("../models/User").UserInstance>;
    getKeepWatchList: (id: number) => Promise<EpisodeInstance[]>;
    upudate: (id: number, attributes: {
        firstName: string;
        lastName: string;
        phone: string;
        birth: Date;
        email: string;
    }) => Promise<import("../models/User").UserInstance>;
    upudateSenha: (id: number, password: string) => Promise<import("../models/User").UserInstance>;
};
