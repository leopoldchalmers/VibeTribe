import dotenv from "dotenv";
dotenv.config();

console.log("Starting server...");

import express from "express";
import { tribeRouter } from "./router/tribeRouter";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";
import cors from "cors";
import session from "express-session";
import { TribeService } from "./service/TribeService";
import { UserService } from "./service/UserService";


export const app = express();

console.log("SESSION_SECRET: ", process.env.SESSION_SECRET);

if (!process.env.SESSION_SECRET) {
  console.log("Could not find SESSION_SECRET in .env file");
  process.exit();
}

app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true
}));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

const userService = new UserService();
const tribeService = new TribeService(userService);

app.use(tribeRouter(tribeService));
app.use(userRouter(userService));
app.use("/posts", postRouter);
