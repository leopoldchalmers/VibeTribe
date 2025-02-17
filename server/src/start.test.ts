import * as SuperTest from "supertest";
import { app } from "./start";
import { Tribe } from "./model/tribe";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
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

