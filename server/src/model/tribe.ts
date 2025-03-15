import { Post } from "./post";

export interface Tribe {
    id : number,
    title : string;
    description : string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
    //members: string[];
}



