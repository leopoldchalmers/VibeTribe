import { Tribe } from "../model/tribe";
import { User } from "../model/user";

export interface ITribeService {
    createTribe(name: string, description: string, owner: string): Promise<Tribe>;
    getTribe(tribeId: number): Promise<Tribe | null>;
    deleteTribe(tribeId: number): Promise<void>;
    getTribes(): Promise<Tribe[]>;
    addUserToTribe(username: string, tribeId: number): Promise<void>;
    removeUserFromTribe(username: string, tribeId: number): Promise<void>;
}