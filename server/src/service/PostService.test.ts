import { PostService } from "./PostService";
import { User } from "../model/user";
import { Tribe } from "../model/tribe";
import { TribeService } from "./TribeService";
import { UserService } from "./UserService";
import { Sequelize } from "sequelize";
import { PostModel } from "../db/post.db";
import { TribeModel } from "../db/tribe.db";
import { UserModel } from "../db/user.db";

let postService: PostService;
let tribeService: TribeService;
let userService: UserService;

const sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });

// Test user data
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
        userService = new UserService();
        tribeService = new TribeService(userService);
        postService = new PostService();

    }
    );

    test("If a post is created, it should exist in the database", async () => {

        // Create a user 
        await userService.createUser(user.username, user.email, user.password
        );
        console.log("User created");

        // Create a new tribe
        const createdTribe: Tribe = await tribeService.createTribe(
            "testtribe",
            "testdescription",
            user.username
        );
        console.log("Tribe created");
        
        // Create a new post
        const createdPost = await postService.addPost(
            "testpost",
            "testdescription",
            user.username,
            createdTribe.id,
            "testlink"
        );
        console.log("Post created");

        // Fetch the post from the DB
        const fetchedPost = await postService.getPostById(createdPost.id);
        console.log("Post fetched");

        console.log(createdPost);
        console.log(fetchedPost);
        
        // Compare objects
        expect(createdPost).toEqual(fetchedPost);
    });

    
});