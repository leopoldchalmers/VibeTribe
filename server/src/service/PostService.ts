import { Post } from '../model/post';
import { User } from '../model/user';
import { Tribe } from '../model/tribe';

export class PostService {
  private posts : Post[] = [];

  async getPosts() : Promise<Post[]> { // Async function means that it will return a promise of Post[] sometime, it does not freeze the code, thats why we use. Async requires a Promise
      return JSON.parse(JSON.stringify(this.posts));
  }

  async addPost(title: string, description: string, author: User, tribe: number) : Promise<Post> {
    
    const post: Post = {
          id: Date.now(),
          title: title,
          description: description,
          createdAt:  Date.now(),
          updatedAt: Date.now(),
          author: author,
          likes: 0,
          tribe: tribe
      };
      this.posts.push(post);

      return { ...post };

      }

}
  

