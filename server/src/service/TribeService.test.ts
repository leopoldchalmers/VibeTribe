import { TribeService } from "../service/TribeService";
import { Tribe } from "../model/tribe";
import { Sequelize } from "sequelize";
import { TribeModel } from "../db/tribe.db";
import { UserService } from "./UserService";
import { UserModel } from "../db/user.db";

let tribeService: TribeService;
let userService: UserService;

const sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });

// Test user data
const user = {
  username: "testuser",
  email: "user@gmail.com",
  password: "password",
};

beforeAll(async () => {
  // Sync database before all tests
  await sequelize.sync({ force: true });
  await UserModel.sync({ force: true });
  await TribeModel.sync({ force: true });
});

beforeEach(async () => {
  // Create service instances before each test
  userService = new UserService();
  tribeService = new TribeService(userService);
});

describe("TribeService Tests", () => {


  test("If a tribe is created, it should exist in database", async () => {
    console.log("Testing: if a tribe is created, it should exist in database");

    // Create a user 
    await userService.createUser(user.username, user.email, user.password);
    console.log("User created");

    // Create a new tribe
    const createdTribe: Tribe = await tribeService.createTribe(
      "testtribe",
      "testdescription",
      user.username
    );

    // Fetch the tribe from the DB
    const fetchedTribe: Tribe = await tribeService.getTribe(createdTribe.id);

    // Compare objects
    expect(createdTribe).toEqual(fetchedTribe);

    // Cleaning up
    await userService.removeUser(user.username);
  });

  test("If a tribe is created with an invalid owner, an error should be thrown", async () => {
    console.log("Testing: if a tribe is created with an invalid owner, an error should be thrown");
    
    // Create
    await expect(tribeService.createTribe("testtribe", "testdescription", "invalidowner")).rejects.toThrow("User not found");
  });

  test("If title is empty, an error should be thrown", async () => {
    console.log("Testing: if title is empty, an error should be thrown");
    
    // Create a user
    await userService.createUser(user.username, user.email, user.password
    );
    console.log("User created");

    // Create
    await expect(tribeService.createTribe("", "testdescription", user.username)).rejects.toThrow("All fields required");


    // Cleaning up
    await userService.removeUser(user.username);
    }

    );

    test("If description is empty, an error should be thrown", async () => {
        console.log("Testing: if description is empty, an error should be thrown");
        
        // Create a user
        await userService.createUser(user.username, user.email, user.password
        );
        console.log("User created");

        // Create
        await expect(tribeService.createTribe("testtribe", "", user.username)).rejects.toThrow("All fields required");

        // Cleaning up
        await userService.removeUser(user.username);
    }
    );

    test("If owner is empty, an error should be thrown", async () => {
        console.log("Testing: if owner is empty, an error should be thrown");
        
        // Create a user
        await userService.createUser(user.username, user.email, user.password
        );
        console.log("User created");

        // Create
        await expect(tribeService.createTribe("testtribe", "testdescription", "")).rejects.toThrow("All fields required");

        // Cleaning up
        await userService.removeUser(user.username);
    }
    );

    


});
