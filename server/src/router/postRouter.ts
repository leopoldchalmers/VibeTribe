import express, { Request, Response } from "express";
import { Tribe } from "../model/tribe";
import { PostService } from "../service/PostService";
import { TribeService } from "../service/TribeService";
import { Post } from "../model/post";
import { User } from "../model/user";
import { title } from "process";

const postService = new PostService();
const tribeService = new TribeService();

export const postRouter = express.Router();

postRouter.get("/", async (
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

postRouter.get("/:id", async (
    req: Request<{ id: string }>, 
    res: Response<Post | string>
) => {
    try {
        const postId = Number(req.params.id); 
        if (isNaN(postId)) {
            res.status(400).send("Invalid ID format");
            return;
        }

        const post = await postService.getPostById(postId); 
        if (!post) {
            res.status(404).send("Post not found");
            return;
        }

        res.status(200).send(post); 
    } catch (e: any) {
        res.status(500).send(e.message); 
    }
});

postRouter.post("/", async (
    req: Request<{}, {}, { title : string, description: string, author: string, tribe: Tribe }>,
    res: Response<Post | string>
) => {
    try {
        const description = req.body.description;
        const author = req.body.author;
        const tribe = req.body.tribe;
        const title = req.body.title;
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description has type ${typeof(description)}`);
            return;
        }
        const newPost = await postService.addPost(title, description, author, tribe);
        res.status(201).send(newPost);
    
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
        

postRouter.patch("/:id", async (
    req: Request<{ id: string }, {}, {title: string, description: string}>,
    res: Response<Post | string>
) => {
    try {

        const postId = Number(req.params.id);

        if (postId == null) {
            res.status(400).send(`Missing id param`);
            return;
        }


        if (! (postId >= 0)) {
             res.status(400).send(`id number must be a non-negative integer`);
            return;
        }

        const description = req.body.description;
        const title = req.body.title;
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad PATCH call to ${req.originalUrl} --- description has type ${typeof(description)}`);
            return;
        }

        const updatedPost = await postService.updatePost(postId, title, description);
        res.status(200).send(updatedPost);
    
        
    }
    catch (e: any) {
            res.status(500).send(e.message);
    }
});