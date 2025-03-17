import { UserService } from "../service/UserService";
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
    await userService.removeUser(user.username);
})

    //sign up test start
describe("Creating User Tests", () => {

   

    test("User authentication should pass with valid credentials", async () => {
        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await userService.findUser(user.username, user.password);
        expect(foundUser).toBeDefined();
        await userService.removeUser(user.username);
    }
    );

    test("Return error if username is empty", async () => {
        expect(userService.createUser("", user.email, user.password)).rejects.toThrow("All fields required");
    }
    );

    test("Return error if email is empty", async () => {
        expect(userService.createUser(user.username, "", user.password)).rejects.toThrow("All fields required");
        

    }
    );

    test("Return error if password is empty", async () => {
        expect(userService.createUser(user.username, user.email, "")).rejects.toThrow("All fields required");   
    }
    );

    test("User cant be created with same username", async () => {
        await userService.createUser(user.username, user.email, user.password);
        await expect(userService.createUser(user.username, user.email, user.password)).rejects.toThrow("Username already exists");
        await userService.removeUser(user.username);
    });

    test("User cant be created with same email", async () => {
        await userService.createUser(user.username, user.email, user.password);
        await expect(userService.createUser("newuser", user.email, user.password)).rejects.toThrow("Email already exists");
        await userService.removeUser(user.username);
    });

    test("Check password encryption when creating user", async () => {
        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await UserModel.findOne({ where: { username: user.username } });
        expect(foundUser?.password).not.toBe(user.password);
        await userService.removeUser(user.username);
    }
    );

    test("User must have valid email format (email must contain @ and .something)", async () => {
        const invalidEmail1 = "testgmail.com";
        const invalidEmail2 = "test@gmailcom";

        //Creating user with valid email
        await userService.createUser(user.username, user.email, user.password);
        expect(await userService.findUser(user.username, user.password)).toBeDefined();
        await userService.removeUser(user.username);

        // Creating user without @
        await expect(userService.createUser(user.username, invalidEmail1, user.password)).rejects.toThrow("Invalid email format");
        await userService.removeUser(user.username);

        // Creating user without .
        await expect(userService.createUser(user.username, invalidEmail2, user.password)).rejects.toThrow("Invalid email format");
        await userService.removeUser(user.username);
    }
    );



});


     //Login test start

describe("Login User Tests", () => {

    // If user logs in with correct credentials, the session should be created/updated 
    /*test("Log in with correct credentials should update the user session", async () => {

    */
    
    test("User authentication should fail with invalid password", async () => {
        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await userService.findUser(user.username,"wrongpassword");
        expect(foundUser).toBeNull();
        await userService.removeUser(user.username);
    });

    test("User authentication should fail with invalid username", async () => {
        await userService.createUser(user.username, user.email, user.password);
        const foundUser = await userService.findUser("wrongusername", user.password);
        expect(foundUser).toBeNull;
        await userService.removeUser(user.username);
    });
    } );




// delete user tests

describe("User deletion tests", () => {
    
    test("User should be deleted from the database", async () => {
        await userService.createUser(user.username, user.email, user.password);
        await userService.removeUser(user.username);
        const foundUser = await UserModel.findOne({ where: { username: user.username } });
        expect(foundUser).toBeNull();
    }
    );

    // We must add sessions to the user model to test this (this test is not implemented correctly yet)
    test("User must be logged in to delete account", async () => {
        await userService.createUser(user.username, user.email, user.password);
        await userService.removeUser(user.username);
        const foundUser = await UserModel.findOne({ where: { username: user.username } });
        expect(foundUser).toBeNull();
    }
    );

} 
);




    

    

 
    

