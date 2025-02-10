import express from "express";
import { tribeRouter } from "./router/tribeRouter";
import { postRouter } from "./router/postRouter";

export const app = express();

app.use(express.json());
app.use("/tribes", tribeRouter);
app.use("/posts", postRouter);
