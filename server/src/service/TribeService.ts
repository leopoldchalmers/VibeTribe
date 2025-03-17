import { Tribe } from "../model/tribe";
import { User } from "../model/user";
import { ITribeService } from "../dbservice/ITribeService";
import { UserService } from "./UserService";
import { TribeModel } from "../db/tribe.db";

/**
 * TribeService is a service that manages tribes
 * TribeService has methods for creating tribes, deleting tribes, and getting tribes by user, id, and all tribes
 */

export class TribeService implements ITribeService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getTribes(): Promise<Tribe[]> {
        return TribeModel.findAll();
    }

    async createTribe(name: string, description: string, owner: string): Promise<Tribe> {

        if (!name || !description || !owner) {
            throw new Error("All fields required");
        }

        console.log("TEST TEST TEST");
        console.log(owner);
        const user : User | null = await this.userService.findUser(owner);
        if (!user) {
            throw new Error("User not found");
        }
        const tribeModel = await TribeModel.create({
            title: name,
            description: description,
            owner: owner,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
        });
        return tribeModel.get({ plain: true }) as Tribe;
    }

    async getTribe(tribeId: number): Promise<Tribe> {

        const tribeModel = await TribeModel.findByPk(tribeId);
        if (!tribeModel) {
            throw new Error("Tribe not found");
    }
        return tribeModel.get({ plain: true }) as Tribe;
    }

    async getTribesByUser(owner: string): Promise<Tribe[] | null> {
        return TribeModel.findAll({ where: { owner: owner } });
    }

    async deleteTribe(tribeId: number): Promise<void> {

        if (!tribeId) {
            throw new Error("Cant delete... Tribe not found");
        }
        await TribeModel.destroy({ where: { id: tribeId } });
    }
}