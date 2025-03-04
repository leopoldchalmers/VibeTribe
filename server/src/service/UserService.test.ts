import { UserService } from "../service/UserService";
import { User } from "../model/user";
import bcrypt from "bcrypt";

describe("UserService Tests", () => {
    
    test("If a user is created, it should be returned in the list", async () => {
        const userService = new UserService();
        const user = await userService.createUser("TestUser", "test@example.com", "password");

        const users = await userService.getUsers();
        expect(users.some(u => u.username === user.username)).toBeTruthy();
    });



test("User authentication should fail with invalid password", async () => {
    const username = "user";
    const email = "user@gmail.com";
    const password = "password";
    const wrongPassword = "wrongpassword";

    const userService = new UserService();

    await userService.createUser(username, email, password);
    const foundUser = await userService.findUser(username, email, wrongPassword);
    expect(foundUser).toBeUndefined();
});
});