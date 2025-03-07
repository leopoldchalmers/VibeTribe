import { Tribe } from "../model/tribe";
import { ITribeService } from "../dbservice/ITribeService";
import { User } from "../model/user";
import { TribeModel } from "../db/tribe.db";
import { ARRAY } from "sequelize";


export class TribeService implements ITribeService{

    async getTribes(): Promise<Tribe[]> {
        return TribeModel.findAll()
    }
    async createTribe(name: string, description: string, owner: string): Promise<Tribe> {
        console.log("TEST TEST TEST")
        console.log(owner)
        const tribe = await TribeModel.create({
            title: name, 
            description: description, 
            owner: owner, 
            createdAt: new Date(Date.now()), 
            updatedAt: new Date(Date.now()),
            id: new Date().getTime(),
            members: [owner]
        }
        )
        return tribe
    }

    async getTribe(tribeId: number): Promise<Tribe | null> {
        return TribeModel.findByPk(tribeId)
    }

    async deleteTribe(tribeId: number): Promise<void> {
        await TribeModel.destroy({where: {id: tribeId}})
    }

    async addUserToTribe(username: string, tribeId: number): Promise<void> {
        const tribe = await TribeModel.findByPk(tribeId)
        if(tribe && tribe.members.find(member => member === username) === undefined){
            tribe.members.push(username)
            await tribe.save()
        }
    }

    async removeUserFromTribe(username: string, tribeId: number): Promise<void> {
        const tribe = await TribeModel.findByPk(tribeId)
        if(tribe && tribe.members.find(member => member === username) !== undefined){
            tribe.members = tribe.members.filter(member => member !== username)
            await tribe.save()
        }
    }



}