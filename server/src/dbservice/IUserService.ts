import {User} from '../model/user';

export interface IUserService {
    createUser(name: string, email: string, password: string): Promise<User>;
    findUser(username: string, password: string): Promise<User | undefined>;
}