import express, { Request, Response } from "express";
import { Tribe } from "../model/tribe";
import { PostService } from "../service/PostService";
import { TribeService } from "../service/TribeService";
import { Post } from "../model/post";
import { User } from "../model/user";

const postService = new PostService();
const tribeService = new TribeService();

export const postRouter = express.Router();

postRouter.get("/posts", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Post> | String>
) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).send(posts);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

postRouter.get("/posts/:id", async (
    req: Request<{id: number}, {}, {}>,
    res: Response<Array<Post> | String>
) => {
    try {
        const posts = await postService.getPostById(req.params.id);
        res.status(200).send(JSON.stringify(posts));
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

postRouter.patch("/", async (
    req: Request<{}, {}, { title : string, description: number, author: User, tribe: number }>,
    res: Response<Post | string>
) => {
    try {
        const description = req.body.description;
        const author = req.body.author;
        const tribe = req.body.tribe;
        const title = req.body.title;
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- description has type ${typeof(description)}`);
            return;
        }
        const newPost = await postService.addPost(title, description, author, tribe);
        res.status(201).send(newPost);
    
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})
        

postRouter.patch("/:id", async (
    req: Request<{ id: number }, {}, {}>,
    res: Response<Post | string>
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Missing id param`);
            return;
        }

        const index = req.params.id;
        if (! (index >= 0)) {
             res.status(400).send(`id number must be a non-negative integer`);
            return;
        }
    }
    catch (e: any) {
            res.status(500).send(e.message);
    }
});