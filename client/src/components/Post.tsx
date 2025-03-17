import { Post } from "../api";


export function PostComponent({ post }: { post: Post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
         </div>
    );

}   