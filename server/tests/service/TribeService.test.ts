import { TribeService } from "../../src/service/TribeService";
import { Tribe } from "../../src/model/tribe";
import { Sequelize } from "sequelize";
import { UserService } from "../../src/service/UserService";
import { UserModel } from "../../src/db/user.db";
import { TribeModel } from "../../src/db/tribe.db";

let tribeService: TribeService;
let userService: UserService;

const sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });

const user = {
username: "testuser",
email: "user@gmail.com",
password: "password",
};

beforeAll(async () => {
await sequelize.sync({ force: true });
await UserModel.sync({ force: true });
await TribeModel.sync({ force: true });
});

beforeEach(async () => {
userService = new UserService();
tribeService = new TribeService(userService);
});

describe("TribeService Tests", () => {

test("If a tribe is created, it should exist in database", async () => {
  await userService.createUser(user.username, user.email, user.password);

  const createdTribe: Tribe = await tribeService.createTribe(
    "testtribe",
    "testdescription",
    user.username
  );

  const fetchedTribe: Tribe = await tribeService.getTribe(createdTribe.id);

  expect(createdTribe).toEqual(fetchedTribe);

  await userService.removeUser(user.username);
});

test("If a tribe is created with an invalid owner, an error should be thrown", async () => {    
  await expect(tribeService.createTribe("testtribe", "testdescription", "invalidowner")).rejects.toThrow("User not found");
});

test("If title is empty, an error should be thrown", async () => {    
  await userService.createUser(user.username, user.email, user.password);
  
  await expect(tribeService.createTribe("", "testdescription", user.username)).rejects.toThrow("All fields required");

  await userService.removeUser(user.username);
  }

  );

  test("If description is empty, an error should be thrown", async () => {        
      await userService.createUser(user.username, user.email, user.password);

      await expect(tribeService.createTribe("testtribe", "", user.username)).rejects.toThrow("All fields required");

      await userService.removeUser(user.username);
  }
  );

  test("If owner is empty, an error should be thrown", async () => {        
      await userService.createUser(user.username, user.email, user.password
      );

      await expect(tribeService.createTribe("testtribe", "testdescription", "")).rejects.toThrow("All fields required");

      await userService.removeUser(user.username);
  }
  );


  test("If a tribe is deleted, it should not exist in database", async () => {        
      await userService.createUser(user.username, user.email, user.password
      );

      const createdTribe: Tribe = await tribeService.createTribe("testtribe", "testdescription", user.username);

      await tribeService.deleteTribe(createdTribe.id);

      await expect(tribeService.getTribe(createdTribe.id)).rejects.toThrow("Tribe not found");

      await userService.removeUser(user.username);
  }
  );

  test("If a tribe is deleted with an invalid id, an error should be thrown", async () => {
      await userService.createUser(user.username, user.email, user.password
      );

      await expect(tribeService.deleteTribe(0)).rejects.toThrow("Cant delete... Tribe not found");

      await userService.removeUser(user.username);
  }
  );
});