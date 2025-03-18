import { Post } from '../api/api';


export function PostList({ posts }: { posts: Post[] }) {
    /**
     * PostList is a component that displays a list of posts
     * PostList takes a list of posts as a prop and displays each post in the list
     * PostList is used in the Home component
     */
    
    if (!posts || posts.length === 0) {
        return <div>No tribes available</div>; 
    }

    return (
        <div>
            <h1 className= "smallTitle">Post List</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.description}</li>
                ))}
            </ul>
        </div>
    );
}