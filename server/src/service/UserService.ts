import { User } from '../model/user';
import bcrypt from "bcrypt";
import { UserModel } from '../db/user.db';

/**
 * UserService is a service that manages users
 * UserService has methods for creating and finding users and removing users 
 */

export class UserService {

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

  async findUser(username: string, password ?: string): Promise<User | null> {
    if(! password){
      return await UserModel.findOne({ where: { username: username } });
    }
    const user : User | null = await UserModel.findOne({ where: {username}});
    if (user) {
      const isValid = await bcrypt.compareSync(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return null;
  }

  async removeUser(username: string): Promise<void> {
    await UserModel.destroy({ where: { username: username } });
  }


}