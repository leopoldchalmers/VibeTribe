import express, { Request, Response, Router} from "express";
import { Tribe } from "../model/tribe";
import { TribeService } from "../service/TribeService";

//const tribeService = new TribeService();

export function tribeRouter(tribeService: TribeService): Router {
    const tribeRouter = express.Router();

    tribeRouter.get("/tribes", async (
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

    tribeRouter.post("/tribes", async (
        req: Request<{}, {}, { title : string, description : string, owner: number }>, // TODO Delete owner
        res: Response<Tribe | string>
    ) => {
        try {
            //@ts-ignore
            if (!req.session.userid) {
                res.status(403).send("Not logged in");
                return;
            }
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
            //@ts-ignore
            const newTribe = await tribeService.createTribe(title, description, req.session.userid);
            res.status(201).send(newTribe);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    })

    return tribeRouter;

}
