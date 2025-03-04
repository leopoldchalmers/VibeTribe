import { PostService } from "./PostService";
import { User } from "../model/user";
import { Tribe } from "../model/tribe";

test("If a post is created, it should be returned to list", async () => {
    const title = "Post title";
    const description = "Post description";
    const author: User = {
        username: "Author name",
        email: "author@gmail.com",
        password: "authorpassword"
    }
    const tribe: Tribe = {
        title: "Tribe title",
        id: 0,
        description: "Tribe description",
        posts: [],
        owner: 0,
        createdAt: new Date(Date.now()).toLocaleDateString(),
        updatedAt: new Date(Date.now()).toLocaleDateString()
    };
    const postService = new PostService();
    
    await postService.addPost(title, description, author, tribe);
    const posts = await postService.getPosts();
    expect(posts.some(post => post.title === title)).toBeTruthy();
})