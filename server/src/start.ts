import express from "express";
import { tribeRouter } from "./router/tribeRouter";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

export const app = express();

//app.use(cors());

dotenv.config();
if (! process.env.SESSION_SECRET) {
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


app.use("/tribes", tribeRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
