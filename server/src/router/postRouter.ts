import express, { Request, Response, Router } from "express";
import { PostService } from "../service/PostService";
import { Post } from "../model/post";

const postService = new PostService();

export const postRouter = express.Router();

/**
 * postRouter is a Router that defines routes for post-related API calls 
 * postRouter has routes for getting all posts, getting a post by ID, creating a post, and updating a post 
*/

    /**
     * Handles GET requests to fetch all posts or posts by tribe ID.
     * If a `tribeId` query parameter is provided, it will fetch posts for that specific tribe.
     * Otherwise, it will fetch all posts.
     * @returns {void} Responds with a list of posts or an error message.
     */

    postRouter.get("/", async (req: Request, res: Response): Promise<void> => {
        try {
            const tribeIdParam = req.query.tribeId;
            if (tribeIdParam) {
                const tribeId = Number(tribeIdParam);
                if (isNaN(tribeId)) {
                    res.status(400).send("Invalid tribeId format");
                    return;
                }
                const posts = await postService.getPostsByTribeId(tribeId);
                res.status(200).json(posts);
                return;
            }
            const posts = await postService.getPosts();
            res.status(200).json(posts);
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });

    /**
     * Handles GET requests to fetch a single post by its ID.
     * If the ID is invalid or the post does not exist, an error message is returned.
     * @param {string} id - The ID of the post to retrieve.
     * @returns {Post | string} A single post or an error message.
     */
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

    /**
     * Handles POST requests to create a new post.
     * @param {string} title - The title of the post.
     * @param {string} description - The description of the post.
     * @param {string} author - The author of the post.
     * @param {number} tribeId - The ID of the tribe the post belongs to.
     * @param {string} songLink - A link to the song associated with the post.
     * @returns {Post | string} The newly created post or an error message.
     */

    postRouter.post("/", async (
        req: Request<{}, {}, { title : string, description: string, author: string, tribeId: number, songLink: string }>,
        res: Response<Post | string>
    ) => {
        try {
            const { title, description, author, tribeId, songLink } = req.body;
            if (typeof(description) !== "string") {
                res.status(400).send(`Bad POST call to ${req.originalUrl} --- description has type ${typeof(description)}`);
                return;
            }
            const newPost = await postService.addPost(title, description, author, tribeId, songLink);
            res.status(201).send(newPost);
        
        } catch (e: any) {
            res.status(500).send(e.message);
        }
    });
            
    /**
    * Handles PATCH requests to update an existing post by its ID.
    * Requires a valid `id` parameter in the URL and a `title`, `description`, and `songLink` in the request body.
    * @param {string} id - The ID of the post to update.
    * @param {string} title - The new title of the post.
    * @param {string} description - The new description of the post.
    * @param {string} songLink - The new song link of the post.
    * @returns {Post | string} The updated post or an error message.
    */
    postRouter.patch("/:id", async (
        req: Request<{ id: string }, {}, {title: string, description: string, songLink: string}>,
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

            const { title, description, songLink } = req.body;
            if (typeof(description) !== "string") {
                res.status(400).send(`Bad PATCH call to ${req.originalUrl} --- description has type ${typeof(description)}`);
                return;
            }

            const updatedPost = await postService.updatePost(postId, title, description, songLink);
            if (!updatedPost) {
                res.status(404).send("Post not found");
                return;
            }
            res.status(200).send(updatedPost);
        
            
        }
        catch (e: any) {
                res.status(500).send(e.message);
        }
});