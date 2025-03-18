import { PostService } from "../../src/service/PostService";
import { User } from "../../src/model/user";
import { Tribe } from "../../src/model/tribe";
import { TribeService } from "../../src/service/TribeService";
import { UserService } from "../../src/service/UserService";
import { Sequelize } from "sequelize";
import { PostModel } from "../../src/db/post.db";
import { TribeModel } from "../../src/db/tribe.db";
import { UserModel } from "../../src/db/user.db";
import { conn } from "../../src/db/conn";

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

      test("updatePost should update the post correctly", async () => {
        const originalPost = await postService.addPost(
          "original title",
          "original desc",
          user.username,
          createdTribe.id,
          "original link"
        );
    
        const updatedPost = await postService.updatePost(
          originalPost.id,
          "new title",
          "new desc",
          "new link"
        );
    
        expect(updatedPost).not.toBeNull();
        expect(updatedPost?.title).toBe("new title");
        expect(updatedPost?.description).toBe("new desc");
        expect(updatedPost?.songLink).toBe("new link");
    
        expect(new Date(updatedPost!.updatedAt).getTime()).toBeGreaterThan(
          new Date(originalPost.updatedAt).getTime()
        );
      });

      test("if we call updatePost with a nonexisting post, an error should be thrown", async () => {
        await expect(postService.updatePost(-1, "title", "desc", "link")).rejects.toThrow("Post not found");
      });

      test("addPost should allow an empty songLink", async () => {
        const post = await postService.addPost(
          "title",
          "desc",
          user.username,
          createdTribe.id,
          ""
        );
        expect(post.songLink).toBe("");
      });

});