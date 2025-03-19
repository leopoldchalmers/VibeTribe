import { Post } from "../model/post";

/**
 * IPostService is an interface that represents a service that manages posts 
 * IPostService has methods for creating, getting, deleting, and updating posts
 */

export interface IPostService {
    getPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
    getPostsByTribeId(tribeId: number): Promise<Post[]>;
    addPost(title: string, description: string, author: string, tribeId: number, songLink: string): Promise<Post>;
    deletePost(postId: number): Promise<void>;
    updatePost(postId: number, title: string, description: string, songLink: string): Promise<Post>;
}