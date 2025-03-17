import { PostService } from "./PostService";
import { User } from "../model/user";
import { Tribe } from "../model/tribe";
import { TribeService } from "./TribeService";
import { UserService } from "./UserService";
import { Sequelize } from "sequelize";
import { PostModel } from "../db/post.db";
import { TribeModel } from "../db/tribe.db";
import { UserModel } from "../db/user.db";
import { conn } from "../db/conn";

let postService: PostService;
let tribeService: TribeService;
let userService: UserService;
let createdTribe: Tribe;

const sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });

const user = {
    username: "testuser",
    email: "user@gmail.com",
    password: "password",
  };

describe("PostService Tests", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await UserModel.sync({ force: true });
        await TribeModel.sync({ force: true });
        await PostModel.sync({ force: true });
});
    beforeEach(async () => {

        await conn.sync({ force: true });

        userService = new UserService();
        tribeService = new TribeService(userService);
        postService = new PostService();

        await userService.createUser(user.username, user.email, user.password);
        createdTribe = await tribeService.createTribe(
        "testtribe",
        "testdescription",
        user.username
        );
    });

    test("If a post is created, it should exist in the database", async () => {
        const createdPost = await postService.addPost(
            "testpost",
            "testdescription",
            user.username,
            createdTribe.id,
            "testlink"
        );

        const fetchedPost = await postService.getPostById(createdPost.id);
        
        expect(createdPost).toEqual(fetchedPost);
    });

    test("If a post is created with an invalid author, an error should be thrown", async () => {      
        await expect(
          postService.addPost("testpost", "testdescription", "invalidauthor", createdTribe.id, "testlink")
        ).rejects.toThrow("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
      
        await userService.removeUser(user.username);
      });
      

    test("If title is empty, an error should be thrown", async () => {      
        await expect(
          postService.addPost("", "testdescription", user.username, createdTribe.id, "testlink")
        ).rejects.toThrow("All fields required");
      });
      

    test("If description is empty, an error should be thrown", async () => {
        await expect(postService.addPost("testpost", "", user.username, createdTribe.id, "testlink")).rejects.toThrow("All fields required");
    }
    );

    test("getting a post should return empty array if no posts exist", async () => {
        const posts = await postService.getPosts();
        expect(posts).toEqual([]);
    }
    );

    test("getPostById should return null if post does not exist", async () => {
        const post = await postService.getPostById(-1);
        expect(post).toBeNull();
    }
    );
    test("getPostsByTribeId should return all posts for a given tribe", async () => {
        await postService.addPost(
          "post1",
          "desc1",
          user.username,
          createdTribe.id,
          "link1"
        );
        await postService.addPost(
          "post2",
          "desc2",
          user.username,
          createdTribe.id,
          "link2"
        );
    
        const posts = await postService.getPostsByTribeId(createdTribe.id);
        expect(posts.length).toBe(2);
        const titles = posts.map((p) => p.title);
        expect(titles).toContain("post1");
        expect(titles).toContain("post2");
      });

});