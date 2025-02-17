import { PostComponent } from "../components/post";
import { Post } from "../api";

export function PostList({ posts }: { posts: Post[] }) {
    return (
        <div>
            {posts.map((post) => (
                <PostComponent post={post} key={post.id} />
            ))}
        </div>
    );
}