import { Post } from '../model/post';
import { User } from '../model/user';
import { Tribe } from '../model/tribe';

export class PostService {
  private posts : Post[] = [];

  async getPosts() : Promise<Post[]> { // Async function means that it will return a promise of Post[] sometime, it does not freeze the code, thats why we use. Async requires a Promise
      return JSON.parse(JSON.stringify(this.posts));
  }

  async getPostById(id: number) : Promise<Post | undefined> {
      return this.posts.find(post => post.id === id);
  }


   async addPost(title: string, description: string, author: User, tribe: Tribe) : Promise<Post> {
    const post: Post = {
          id: Date.now(),
          title: title,
          description: description,
          createdAt:  new Date(Date.now()).toLocaleDateString(),
          updatedAt: new Date(Date.now()).toLocaleDateString(),
          author: author,
          likes: 0,
          tribe: tribe
      };
      this.posts.push(post);

      return { ...post };
    }
      
    async updatePost(id: number, title: string, description: string) : Promise<Post | undefined> {
      const post = this.posts.find(post => post.id === id);
      if(post) {
        post.title = title;
        post.description = description;
        post.updatedAt = new Date(Date.now()).toLocaleDateString();
        return { ...post };
      }
      return undefined;

}   

}
