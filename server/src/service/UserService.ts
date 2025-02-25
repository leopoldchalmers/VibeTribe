import { User } from '../model/user';


export class UserService {

  private users: User[] = [];

  async createUser(name: string, email: string, password: string): Promise<User> {

    const user: User = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    }

    this.users.push(user);

    return {...user};    
  }

  async findUser(name: string, email: string, password : string): Promise<User | undefined> {
    if (! password) {
        return this.users.find((user) => user.name === name);
    }
    return this.users.find((user) => user.name === name && user.password === password);
}

  async getUsers(): Promise<User[]> {
      return JSON.parse(JSON.stringify(this.users));
  }
}