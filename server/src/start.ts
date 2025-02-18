import express from "express";
import { tribeRouter } from "./router/tribeRouter";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";
import cors from "cors";

export const app = express();

app.use(cors());

app.use(express.json());


app.use("/tribes", tribeRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
