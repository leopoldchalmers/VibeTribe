import { Post } from "../api";


export function PostComponent({ post }: { post: Post }) {

    /**
     * PostComponent is a component that displays a post
     * PostComponent takes a post as a prop and displays the post's title, description, author, and likes
     * PostComponent is used in the PostList component
     */
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>Author: {post.author}</p>
            <p>Likes: {post.likes}</p>
         </div>
    );

}   