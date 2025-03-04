import * as SuperTest from "supertest";
import { app } from "./start";
import { Tribe } from "./model/tribe";

const session = require("supertest-session");
const request = session(app);

test("End-to-end test", async () => {
    const user = await request.post("/users").send({username: "TestUser", password: "password"});
    const res3 = await request.post("/users/login").send({username: "TestUser", password: "password"});
    const desc = "Tribe description";
    const title = "Post title";
    const res1 = await request.post("/tribes").send({title: title, description : desc});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.description).toEqual(desc);
    const res2 = await request.get("/tribes");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((tribe : Tribe) => tribe.description)).toContain(desc);
});
// Kommentar: Tänk på o testa cases där det går fel. 

