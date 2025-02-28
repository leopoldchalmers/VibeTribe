import express, { Request, Response, Router } from "express";
import { User } from "../model/user";
import { UserService } from "../service/UserService";

export function userRouter(userService: UserService): Router {

    const userRouter = express.Router();

    interface LoginRequest extends Request {
        body: {email: string, password: string},
        session : any
    }

    interface LoginResponse extends Response {
        body: {name: string, email: string},
        session : any
    }

    userRouter.post("/users", async (
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


    userRouter.post("/users/login", async (
        req : LoginRequest,
        res : LoginResponse | Response
    ) => {
        try {
        
            const email = req.body.email;
            const password = req.body.password;

            console.log("Email: ", email);
            console.log("Password: ", password
            );

            if (!email || !password) {
                res.status(400).send("All fields are required");
                return;
            }

            const users = await userService.getUsers();
            console.log("Users: ", users);
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                res.status(401).send("Invalid email or password");
                return;
            }
            req.session.userid = user.id;
            console.log("User logged in:", user);
            res.status(200).send({name: user.name, email: user.email}); // R. Adams told us to remove this, but it doesnt seem to work without it, users are not saved in local storage without this and we use this in order to login

        } catch (e: any) {
            res.status(500).send(e.message);
        }
    }
    )

    return userRouter;
 
}