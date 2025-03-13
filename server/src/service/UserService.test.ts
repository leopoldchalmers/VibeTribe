import { UserService } from "../service/UserService";
import { User } from "../model/user";
import bcrypt from "bcrypt";
import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('sqlite::memory:');
    
beforeAll(async () => {
    await sequelize.sync();
});


describe("UserService Tests", () => {

    //Login test start

    test("User authentication should fail with invalid password", async () => {
        console.log("Starting test for user authentication with invalid password");
        const username = "testuser";
        const email = "user@gmail.com";
        const password = "password";
        const wrongPassword = "wrongpassword";

        const userService = new UserService();
        console.log("test2");
        await userService.createUser(username, email, password);
        console.log(" Test User created");
        const foundUser = await userService.findUser(username,wrongPassword);
        console.log("4")
        expect(foundUser).toBeUndefined();
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