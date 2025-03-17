import { Tribe } from "../model/tribe";

export interface ITribeService {
    createTribe(name: string, description: string, owner: string): Promise<Tribe>;
    getTribe(tribeId: number): Promise<Tribe | null>;
    deleteTribe(tribeId: number): Promise<void>;
    getTribes(): Promise<Tribe[]>;
}