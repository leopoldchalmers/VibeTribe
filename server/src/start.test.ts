import * as SuperTest from "supertest";
import { app } from "./start";
import { Tribe } from "./model/tribe";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const desc = "Tribe description";
    const res1 = await request.post("/tribe").send({description : desc});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.description).toEqual(desc);
    const res2 = await request.get("/tribe");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((tribe : Tribe) => tribe.description)).toContain(desc);
});
