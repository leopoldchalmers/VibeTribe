import express, { Request, Response } from "express";
import { User } from "../model/user";
import { UserService } from "../service/UserService";

const userService = new UserService();

export const userRouter = express.Router();



userRouter.post("/", async (
    req: Request<{}, {}, { name : string, email: string, password: string }>,
    res: Response<{name: string, email:string} | string>
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
        //något här
        const newUser = await userService.createUser(name, email, password)
            res.status(201).send({name: name, email: email});
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

interface LoginRequest extends Request {
    body: {email: string, password: string},
    session : any
}

userRouter.post("/login", async (
    req : LoginRequest,
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
        req.session.userid = user.id;
        res.status(200).send(user); // TODO Edit this

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}
)

