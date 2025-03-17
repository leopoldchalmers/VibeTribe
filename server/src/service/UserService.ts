import { User } from '../model/user';
import bcrypt from "bcrypt";
import { UserModel } from '../db/user.db';

/**
 * UserService is a service that manages users.
 * UserService has methods for creating, finding, and removing users.
 */
export class UserService {

  /**
   * Creates a new user with the given details and stores it in the database.
   * @param {string} name - The username of the new user.
   * @param {string} email - The email of the new user.
   * @param {string} password - The password of the new user.
   * @returns {Promise<UserModel | null>} A promise that returns the created user model or null if the user could not be created.
   */
  async createUser(name: string, email: string, password: string): Promise<UserModel | null> {

    if (!name || !email || !password) {
      throw new Error("All fields required");
    }

    if (await UserModel.findOne({where: {username: name}})) {
      throw new Error("Username already exists");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    if (await UserModel.findOne({where: {email: email}})) {
      throw new Error("Email already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    return await UserModel.create({
      username: name,
      email: email,
      password: bcrypt.hashSync(password, salt),
    });
  }

  /**
   * Finds a user by their username and optionally validates the password.
   * @param {string} username - The username of the user to find.
   * @param {string} [password] - The optional password to validate.
   * @returns {Promise<User | null>} A promise that returns the user if found, or null if the user does not exist or the password is invalid.
   */
  async findUser(username: string, password?: string): Promise<User | null> {
    if(!password) {
      return await UserModel.findOne({ where: { username: username } });
    }

    const user: User | null = await UserModel.findOne({ where: { username } });
    if (user) {
      const isValid = await bcrypt.compareSync(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  /**
   * Removes a user from the database by their username.
   * @param {string} username - The username of the user to remove.
   * @returns {Promise<void>} A promise that returns when the user is successfully removed.
   */
  async removeUser(username: string): Promise<void> {
    await UserModel.destroy({ where: { username: username } });
  }
}
