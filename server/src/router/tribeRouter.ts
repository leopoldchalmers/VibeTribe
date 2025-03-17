import express, { Request, Response, Router} from "express";
import { Tribe } from "../model/tribe";
import { TribeService } from "../service/TribeService";

export function tribeRouter(tribeService: TribeService): Router {
    const tribeRouter = express.Router();

    interface TribeRequest{
        session: any
    }

    tribeRouter.get("/tribes", async (req, res) => {
        try {
          const tribes = await tribeService.getTribes();
          res.status(200).send(tribes);
        } catch (e: any) {
          res.status(500).send(e.message);
        }
      });
      


    interface CreateTribeRequest extends Request {
        body: { title : string, description : string, owner: string },
        session: any
    }

    tribeRouter.post("/tribes", async (
        req: CreateTribeRequest, 
        res: Response<Tribe | string>
    ) => {
        try {
            //@ts-ignore
            if (!req.session.username) {
                res.status(403).send("Not logged in");
                return;
            }
            const title = req.body.title;
            const description = req.body.description;
            if (!title || !description) {
                res.status(400).send("All fields are required");
                return;
            }
            if (typeof(description) !== "string") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(description)}`);
                return;
            }
            console.log("Creating tribe for user:", req.session.username);
            const newTribe = await tribeService.createTribe(title, description, req.session.username);
            console.log("Tribe created:", newTribe);
            res.status(201).send(newTribe);
        } catch (e: any) {
            console.error(e);
            res.status(500).send(e.message);
        }
    })

    tribeRouter.get("/tribes/:id", async (
        req: Request<{id: string}, {}, {}>,
        res: Response<Tribe | string>
    ) => {
        try {
            const tribeId = Number(req.params.id);
            if (isNaN(tribeId)) {
                res.status(400).send("Invalid ID format");
                return;
            }
            const tribe = await tribeService.getTribe(tribeId);
            res.status(200).send(tribe);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    tribeRouter.get("/tribes/owner/:user", async (
        req: Request<{user: string}, {}, {}>,
        res: Response<Tribe[] | null>
    ) => {
        try {
            const owner = req.params.user;
            const tribes = await tribeService.getTribesByUser(owner);
            res.status(200).send(tribes);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    return tribeRouter;
    

}
