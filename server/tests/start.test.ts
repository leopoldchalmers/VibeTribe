import { app } from "../src/start";
import { Tribe } from "../src/model/tribe";
import { Post } from "../src/model/post";
import { conn } from "../src/db/conn";

const session = require("supertest-session");
    describe("End-to-end Tests", () => {
        let request: any;

        beforeAll(async () => {
            await conn.sync({ force: true });
            request = session(app);
        });

        test("should create a user, log in, create a tribe, create a post, and verify that its is as we expected", async () => {
            const createUser = await request.post("/users").send({
                username: "TestUser",
                email: "test@user.com",
                password: "password",
        });
        expect(createUser.statusCode).toBe(201);
        expect(createUser.body).toHaveProperty("username", "TestUser");

        const loginUser = await request.post("/users/login").send({
            username: "TestUser",
            password: "password",
        });
        expect(loginUser.statusCode).toBe(200);

        const tribeDesc = "Test Tribe Description";
        const tribeTitle = "Test Tribe Title";

        const createTribe = await request.post("/tribes").send({
            title: tribeTitle,
            description: tribeDesc,
        });
        expect(createTribe.statusCode).toBe(201);
        expect(createTribe.body).toHaveProperty("description", tribeDesc);
        expect(createTribe.body).toHaveProperty("title", tribeTitle);

        const tribeId = createTribe.body.id;

        const getTribes = await request.get("/tribes");
        expect(getTribes.statusCode).toBe(200);
        expect(Array.isArray(getTribes.body)).toBe(true);

        const tribeIds = getTribes.body.map((t: Tribe) => t.id);
        expect(tribeIds).toContain(tribeId);

        const postTitle = "Test Post";
        const postDesc = "Test Post Description";
        const songLink = "http://example.com/testtesttest";

        const createPost = await request.post("/posts").send({
            title: postTitle,
            description: postDesc,
            author: "TestUser", 
            tribeId: tribeId,     
            songLink: songLink,
        });
        expect(createPost.statusCode).toBe(201);
        expect(createPost.body).toHaveProperty("title", postTitle);
        expect(createPost.body).toHaveProperty("description", postDesc);
        expect(createPost.body).toHaveProperty("songLink", songLink);

        const getPostsByTribe = await request.get(`/posts?tribeId=${tribeId}`);
        expect(getPostsByTribe.statusCode).toBe(200);
        expect(Array.isArray(getPostsByTribe.body)).toBe(true);

        const postTitles = getPostsByTribe.body.map((p: Post) => p.title);
        expect(postTitles).toContain(postTitle);

        const logoutUser = await request.post("/users/logout");
        expect(logoutUser.statusCode).toBe(200);

        const createTribeAfterLogout = await request.post("/tribes").send({
            title: "Should Fail",
            description: "No session, should fail",
        });
        expect(createTribeAfterLogout.statusCode).toBe(403);
        expect(createTribeAfterLogout.text).toContain("Not logged in");
    });
});

