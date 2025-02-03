import { Post } from "./post";

export interface Tribe {
    id : number;
    description : string;
    posts: Post[];
    owner: number;
}



