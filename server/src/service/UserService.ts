import { User } from '../model/user';

export class UserService {

  private users: User[] = [];

  async createUser(name: string, email: string, password: string): Promise<User> {

    const user: User = {
        username: name,
        email: email,
        password: password
    }

    this.users.push(user);

    return {...user};    
  }

  async findUser(username: string, email: string, password : string): Promise<User | undefined> {
    if (! password) {
        return this.users.find((user) => user.username === username);
    }
    
    return this.users.find((user) => user.username === username && user.password === password);
}

// We should remove this method in the future, since it can be a security issue
  async getUsers(): Promise<User[]> {
      return JSON.parse(JSON.stringify(this.users));
  }
}