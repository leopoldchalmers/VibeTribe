import { UserService } from "../service/UserService";
import { User } from "../model/user";
import bcrypt from "bcrypt";
import { UserModel } from "../db/user.db";
import { Sequelize } from 'sequelize';

let userService: UserService;

const sequelize = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });


//test user
const user = {
    username: "testuser",
    email: "user@gmail.com",
    password: "password",
}

beforeAll(async () => {
    await sequelize.sync({ force: true });
    await UserModel.sync({ force: true });
  });


  
  beforeEach(async () => {
    userService = new UserService();
})


describe("UserService Tests", () => {

    //Login test start

    test("User authentication should pass with valid credentials", async () => {
        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await userService.findUser(user.username, user.password);
        expect(foundUser).toBeDefined();
        await userService.removeUser(user.username);
    }
    );

    test("User authentication should fail with invalid password", async () => {
        

        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await userService.findUser(user.username,"wrongpassword");
        expect(foundUser).toBeUndefined();
        await userService.removeUser(user.username);
    });
});

    

    // login test end



    //sign up test start

  /*      
test("User registration should fail with invalid email", async () => {
    const username = "user";
    const email = "user@gmail.com";
    const password = "password";
    const wrongEmail = "wrongemail";

    const userService = new UserService();

    await userService.createUser(username, email, password);
    const foundUser = await userService.findUser(username, password);
    expect(foundUser).toBeUndefined();
});
    
*/

    //sign up test end