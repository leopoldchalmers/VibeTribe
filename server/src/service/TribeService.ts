import { Tribe } from "../model/tribe";

export class TribeService {
    updateTribe(tribeToUpdate: any) {
        throw new Error("Method not implemented.");
    }
    private tribes : Tribe[] = [];

    async getTribes(): Promise<Tribe[]> {
        return JSON.parse(JSON.stringify(this.tribes));
    }

    async createTribe (description: string, owner: number): Promise<Tribe> {
        const tribe = {
            id: Date.now(),
            description: description,
            posts: [],
            owner: owner
            
        }
        this.tribes.push(tribe);
        return {...tribe };
    }
}