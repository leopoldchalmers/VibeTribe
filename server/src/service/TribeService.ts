import { Tribe } from "../model/tribe";

export class TribeService {
    updateTribe(tribeToUpdate: any) {
        throw new Error("Method not implemented.");
    }
    private tribes : Tribe[] = [];

    async getTribes(): Promise<Tribe[]> {
        return JSON.parse(JSON.stringify(this.tribes));
    }

    async createTribe (title: string, description : string): Promise<Tribe> {
        const tribe = {
            title: title,
            id: Date.now(),
            description: description,
            posts: [],
            createdAt : new Date(Date.now()).toLocaleDateString(),
            updatedAt : new Date(Date.now()).toLocaleDateString()
        }
        this.tribes.push(tribe);
        return {...tribe };
    }
}