import { User } from './user';
import { Tribe } from './tribe';

export interface Post {
    id : number;
    title : string;
    description : string;
    author : string;
    createdAt : Date;
    updatedAt : Date;
    likes : number;
    tribe : number;
    songLink : string;
}