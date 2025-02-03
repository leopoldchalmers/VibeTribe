import { User } from './user';

export interface Post {
    id : number;
    title : string;
    description : string;
    author : User;
    createdAt : number;
    updatedAt : number;
    likes : number;
}

