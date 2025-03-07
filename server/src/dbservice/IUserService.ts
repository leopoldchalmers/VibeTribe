import {User} from '../model/user';

export interface IUserService {
    createUser(name: string, email: string, password: string): Promise<User>;
    findUser(username: string, email: string, password: string): Promise<User | undefined>;
    getUsers(): Promise<User[]>;
}