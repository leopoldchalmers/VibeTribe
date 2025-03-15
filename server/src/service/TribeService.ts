import { Tribe } from "../model/tribe";
import { User } from "../model/user";
import { ITribeService } from "../dbservice/ITribeService";
import { UserService } from "./UserService";
import { TribeModel } from "../db/tribe.db";

export class TribeService implements ITribeService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getTribes(): Promise<Tribe[]> {
        return TribeModel.findAll();
    }

    async createTribe(name: string, description: string, owner: string): Promise<Tribe> {
        console.log("TEST TEST TEST");
        console.log(owner);
        const user : User | null = await this.userService.findUser(owner);
        if (!user) {
            throw new Error("User not found");
        }
        const tribe = await TribeModel.create({
            title: name,
            description: description,
            owner: owner,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            members: [owner]
        });
        return tribe;
    }

    async getTribe(tribeId: number): Promise<Tribe | null> {
        return TribeModel.findByPk(tribeId);
    }

    async getTribesByUser(owner: string): Promise<Tribe[] | null> {
        return TribeModel.findAll({ where: { owner: owner } });
    }

    async deleteTribe(tribeId: number): Promise<void> {
        await TribeModel.destroy({ where: { id: tribeId } });
    }

    async addUserToTribe(username: string, tribeId: number): Promise<void> {
        const tribe = await TribeModel.findByPk(tribeId);
        if (tribe && tribe.members.find(member => member === username) === undefined) {
            tribe.members.push(username);
            await tribe.save();
        }
    }

    async removeUserFromTribe(username: string, tribeId: number): Promise<void> {
        const tribe = await TribeModel.findByPk(tribeId);
        if (tribe && tribe.members.find(member => member === username) !== undefined) {
            tribe.members = tribe.members.filter(member => member !== username);
            await tribe.save();
        }
    }
}