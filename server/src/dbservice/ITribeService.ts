import { Tribe } from "../model/tribe";

/**
 * ITribeService is an interface that represents a service that manages tribes 
 * ITribeService has methods for creating, getting, and deleting tribes
 */

export interface ITribeService {
    createTribe(name: string, description: string, owner: string): Promise<Tribe>;
    getTribe(tribeId: number): Promise<Tribe | null>;
    deleteTribe(tribeId: number): Promise<void>;
    getTribes(): Promise<Tribe[]>;
    getTribesByUser(username: string): Promise<Tribe[] | null>;
}