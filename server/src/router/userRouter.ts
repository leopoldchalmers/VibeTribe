import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/UserService";

declare module 'express-session' {
    interface SessionData {
        username?: string;
    }
}

export function userRouter(userService: UserService): Router {
    const userRouter = express.Router();

    interface UserRequest extends Request {
        body: { username: string, email: string, password: string },
        session: any
    }


    userRouter.post("/users", async (req: UserRequest, res: Response) => {
        try {
            await userService.createUser(req.body.username, req.body.email, req.body.password);
            res.status(201).send({ username: req.body.username });
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    });

    userRouter.post("/users/login", async (req: UserRequest, res: Response) => {
        const user: User | null = await userService.findUser(req.body.username, req.body.password);
        if (!user) {
            res.status(401).send("No such username or password");
            return;
        }
        req.session.username = req.body.username;
        res.status(200).send("Logged in");
    })

    userRouter.get("/users/session", (req: Request, res: Response) => {
        console.log("Session data:", req.session);
        let username : string | undefined = req.session.username;
        if (username) {
            res.status(200).send(`Logged in as: ${username}`);
        } else {
            res.status(401).send("No user logged in");
        }
    });

    userRouter.post("/users/logout", (req: Request, res: Response) => {
        delete req.session.username;
        console.log("LOGGED OUT (USER ROUTER)")
        res.status(200).send("blabla Logged out");
    });
    
    return userRouter;
}

