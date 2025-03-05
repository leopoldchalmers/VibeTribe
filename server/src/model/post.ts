import { User } from './user';
import { Tribe } from './tribe';

export interface Post {
    id : number;
    title : string;
    description : string;
    author : string;
    createdAt : string;
    updatedAt : string;
    likes : number;
    tribe : Tribe;
}