import { User } from '../model/user';
import bcrypt from "bcrypt";
import { UserModel } from '../db/user.db';



export class UserService {

  async createUser(name: string, email: string, password: string): Promise<UserModel | undefined> {



    // Instead of returning undefined, we should throw an error?
    // Instead of if-statements we could use case-switch?
    if (!name || !email || !password) {
      return undefined;
    }

   if (await UserModel.findOne({where: {username: name}})) {
     return undefined;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return undefined;
    }
    

  if (await UserModel.findOne({where: {email: email}})) {
    return undefined;
  }

    const salt = bcrypt.genSaltSync(10);
    return await UserModel.create({
      username: name,
      email: email,
      password: bcrypt.hashSync(password, salt),
    });
  
  }

  async findUser(username: string, password: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ where: { username: username } });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return undefined;
  }

  async removeUser(username: string): Promise<void> {
    await UserModel.destroy({ where: { username: username } });
  }


}