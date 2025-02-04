import { PostService } from "./PostService";
import { User } from "../model/user";

test("If a post is created, it should be returned to list", async () => {
    const title = "Post title";
    const description = "Post description";
    const author: User = {
        id: 0,
        name: "Author name",
        email: "author@gmail.com",
        password: "authorpassword"
    }
    const tribe = 0;
    const postService = new PostService();
    await postService.addPost(title, description, author, tribe);
    const posts = await postService.getPosts();
    expect(posts.some(post => post.title === title)).toBeTruthy();
})