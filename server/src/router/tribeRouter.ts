import express, { Request, Response } from "express";
import { Tribe } from "../model/tribe";
import { TribeService } from "../service/TribeService";

const tribeService = new TribeService();

export const tribeRouter = express.Router();

tribeRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Tribe> | String>
) => {
    try {
        const tribes = await tribeService.getTribes();
        res.status(200).send(tribes);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

tribeRouter.post("/", async (
    req: Request<{}, {}, { title : string, description : string, owner: number }>,
    res: Response<Tribe | string>
) => {


    try {
        const title = req.body.title;
        const description = req.body.description;
        const owner = req.body.owner;
        if (!title || !description) {
            res.status(400).send("All fields are required");
            return;
        }
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(description)}`);
            return;
        }
        const newTribe = await tribeService.createTribe(title, description, owner);
        res.status(201).send(newTribe);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

