import { Tribe } from "../model/tribe";
import { User } from "../model/user";
import { ITribeService } from "../iService/ITribeService";
import { UserService } from "./UserService";
import { TribeModel } from "../db/tribe.db";

/**
 * TribeService is a service that manages tribes.
 * TribeService has methods for creating tribes, deleting tribes, and getting tribes by user, ID, and all tribes.
 */
export class TribeService implements ITribeService {
    private userService: UserService;

    /**
     * Creates an instance of TribeService.
     * @param {UserService} userService - The user service instance for handling user-related operations.
     */
    constructor(userService: UserService) {
        this.userService = userService;
    }

    /**
     * Retrieves all tribes from the database.
     * @returns {Promise<Tribe[]>} A promise that returns an array of tribes.
     */
    async getTribes(): Promise<Tribe[]> {
        return TribeModel.findAll();
    }

    /**
     * Creates a new tribe and stores it in the database.
     * @param {string} name - The name of the tribe to create.
     * @param {string} description - The description of the tribe to create.
     * @param {string} owner - The username of the owner of the tribe.
     * @returns {Promise<Tribe>} A promise that returns the newly created tribe.
     */
    async createTribe(name: string, description: string, owner: string): Promise<Tribe> {

        if (!name || !description || !owner) {
            throw new Error("All fields required");
        }

        const user: User | null = await this.userService.findUser(owner);
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

    /**
     * Retrieves a tribe by its ID from the database.
     * @param {number} tribeId - The ID of the tribe to retrieve.
     * @returns {Promise<Tribe>} A promise that returns the tribe with the specified ID.
     */
    async getTribe(tribeId: number): Promise<Tribe> {
        const tribeModel = await TribeModel.findByPk(tribeId);
        if (!tribeModel) {
            throw new Error("Tribe not found");
        }
        return tribeModel.get({ plain: true }) as Tribe;
    }

    /**
     * Retrieves all tribes owned by a specific user.
     * @param {string} owner - The username of the tribe owner.
     * @returns {Promise<Tribe[] | null>} A promise that returns an array of tribes owned by the user, or null if no tribes are found.
     */
    async getTribesByUser(owner: string): Promise<Tribe[] | null> {
        return TribeModel.findAll({ where: { owner: owner } });
    }

    /**
     * Deletes a tribe by its ID from the database.
     * @param {number} tribeId - The ID of the tribe to delete.
     * @returns {Promise<void>} A promise that returns when the tribe is successfully deleted.
     */
    async deleteTribe(tribeId: number): Promise<void> {
        if (!tribeId) {
            throw new Error("Cant delete... Tribe not found");
        }
        await TribeModel.destroy({ where: { id: tribeId } });
    }
}