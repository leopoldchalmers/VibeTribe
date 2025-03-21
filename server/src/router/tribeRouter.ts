import express, { Request, Response, Router} from "express";
import { Tribe } from "../model/tribe";
import { TribeService } from "../service/TribeService";

/**
 * tribeRouter is a Router that defines routes for tribe-related API calls
 * tribeRouter has routes for getting all tribes, getting a tribe by ID, creating a tribe, and getting tribes by owner
 */
export function tribeRouter(tribeService: TribeService): Router {
    const tribeRouter = express.Router();

    interface TribeRequest{
        session: any
    }
        
    /**
     * Handles GET requests to fetch all tribes.
     * @returns {Tribe[]} A list of all tribes.
     */
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

    /**
     * Handles POST requests to create a new tribe.
     * Requires a `title` and `description` in the request body, and verifies that the user is logged in.
     * @param {string} title - The title of the new tribe.
     * @param {string} description - The description of the new tribe.
     * @returns {Tribe | string} The newly created tribe or an error message.
     */
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

            const newTribe = await tribeService.createTribe(title, description, req.session.username);

            res.status(201).send(newTribe);

        } catch (e: any) {
            console.error(e);
            res.status(500).send(e.message);
        }
    })

    /**
     * Handles GET requests to fetch a tribe by its ID.
     * @param {string} id - The ID of the tribe to retrieve.
     * @returns {Tribe | string} The requested tribe or an error message.
     */
    
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

    /**
     * Handles GET requests to fetch all tribes owned by a specific user.
     * @param {string} user - The username of the tribe owner.
     * @returns {Tribe[] | null} A list of tribes owned by the user or an empty list if no tribes exist.
     */
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