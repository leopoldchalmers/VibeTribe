import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/UserService";

declare module 'express-session' {
    interface SessionData {
        username?: string;
    }
}
/**
 * userRouter is a Router that defines routes for user-related API calls
 * userRouter has routes for creating a user, logging in,logging out, and checking the session status 
 */
export function userRouter(userService: UserService): Router {
    const userRouter = express.Router();

    interface UserRequest extends Request {
        body: { username: string, email: string, password: string },
        session: any
    }

    /**
     * Handles POST requests to create a new user.
     * @param {string} username - The username of the new user.
     * @param {string} email - The email of the new user.
     * @param {string} password - The password of the new user.
     * @returns {Object} The created user's username.
     */
    userRouter.post("/users", async (req: UserRequest, res: Response) => {
        try {
            await userService.createUser(req.body.username, req.body.email, req.body.password);
            res.status(201).send({ username: req.body.username });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    });

    /**
     * Handles POST requests for logging in a user.
     * Verifies the username and password, and stores the username in the session.
     * @param {string} username - The username of the user attempting to log in.
     * @param {string} password - The password of the user attempting to log in.
     * @returns {string} A success message when logged in.
     */
    
    userRouter.post("/users/login", async (req: UserRequest, res: Response) => {
        const user: User | null = await userService.findUser(req.body.username, req.body.password);
        if (!user) {
            res.status(401).send("No such username or password");
            return;
        }
        req.session.username = req.body.username;
        res.status(200).send("Logged in");
    })

    /**
     * Handles GET requests to check the current session status.
     * @returns {string} The logged-in user's username if logged in, or an error message if not logged in.
     */
    userRouter.get("/users/session", (req: Request, res: Response) => {
        console.log("Session data:", req.session);
        let username : string | undefined = req.session.username;
        if (username) {
            res.status(200).send(`Logged in as: ${username}`);
        } else {
            res.status(401).send("No user logged in");
        }
    });

    /**
     * Handles POST requests to log out the current user.
     * @returns {string} A success message indicating the user has logged out.
     */
    userRouter.post("/users/logout", (req: Request, res: Response) => {
        delete req.session.username;
        console.log("LOGGED OUT (USER ROUTER)")
        res.status(200).send("Logged out");
    });
    
return userRouter;
}

