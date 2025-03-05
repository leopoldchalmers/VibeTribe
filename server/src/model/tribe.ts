import { Post } from "./post";

export interface Tribe {
    title : string;
    id : number;
    description : string;
    posts: Post[];
    createdAt: string;
    updatedAt: string;
}



