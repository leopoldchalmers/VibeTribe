import express from "express";
import { tribeRouter } from "./router/tribeRouter";

export const app = express();

app.use(express.json());
app.use("/tribes", tribeRouter);
app.use("/posts", tribeRouter);
