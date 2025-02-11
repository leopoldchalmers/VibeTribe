import { User } from './user';
import { Tribe } from './tribe';

export interface Post {
    id : number;
    title : string;
    description : string;
    author : User;
    createdAt : number;
    updatedAt : number;
    likes : number;
    tribe : Tribe;
}