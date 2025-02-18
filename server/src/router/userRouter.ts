import express, { Request, Response } from "express";
import { User } from "../model/user";
import { UserService } from "../service/UserService";

const userService = new UserService();

export const userRouter = express.Router();

userRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<User> | String>
) => {
    try {
        const users = await userService.getUsers();
        res.status(200).send(users);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

userRouter.post("/", async (
    req: Request<{}, {}, { name : string, email: string, password: string }>,
    res: Response<User | string>
) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password) {
            res.status(400).send("All fields are required");
            return;
        }
        
        if (typeof(name) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- name has type ${typeof(name)}`);
            return;
        }
        
        if (typeof(email) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- email has type ${typeof(email)}`);
            return;
        }

        if (typeof(password) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- password has type ${typeof(password)}`);
            return;
        }
        
        const newUser = await userService.createUser(name, email, password)
            res.status(201).send(newUser);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})


userRouter.post("/login", async (
    req : Request<{}, {}, { email: string, password: string }>,
    res : Response<User | string>
) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            res.status(400).send("All fields are required");
            return;
        }

        const users = await userService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            res.status(401).send("Invalid email or password");
            return;
        }
        res.status(200).send(user);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}
)

