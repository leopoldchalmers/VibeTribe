import { Post } from '../api';


export function TribeList({ posts }: { posts: Post[] }) {
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
