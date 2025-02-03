import { User } from '../model/user';


export class UserService {

  private Users: User[] = [];

  async createUser(id: number, name: string, email: string, password: string): Promise<User> {

    const user: User = {
        id: Date.now(),
        name: name,
        email: email,
        password: password
    }

    this.Users.push(user);

    return {...user};    

  }

    async getUsers(): Promise<User[]> {
        return this.Users;
    }
}