import { User } from '../model/user';
import bcrypt from "bcrypt";


export class UserService {

  private users: User[] = [];

  async createUser(name: string, email: string, password: string): Promise<User> {

    const salt = bcrypt.genSaltSync(10);
    
    const user: User = {
        username: name,
        email: email,
        password: bcrypt.hashSync(password, salt),
      }

    this.users.push(user);

    return {...user};    
  }
  async findUser(username: string, email: string, password: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    return undefined;
  }
  

// We should remove this method in the future, since it can be a security issue
  async getUsers(): Promise<User[]> {
      return JSON.parse(JSON.stringify(this.users));
  }
}