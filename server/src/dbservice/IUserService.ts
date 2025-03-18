import { UserModel } from "../db/user.db";
import { User } from "../model/user";

/**
 * IUserService is an interface that represents the methods that a UserService class must implement
 * IUserService has methods for creating and finding users
 */

export interface IUserService {
    createUser(name: string, email: string, password: string): Promise<UserModel | null>;
    findUser(username: string, password: string): Promise<User | null>;
    removeUser(username: string): Promise<void>;
}