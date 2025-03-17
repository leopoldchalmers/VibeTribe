import { Post } from '../model/post';
import { PostModel } from '../db/post.db';
import { TribeModel } from '../db/tribe.db';

export class PostService {

  async getPosts(): Promise<Post[]> {
    const posts = await PostModel.findAll({
      include: [{ model: TribeModel, as: 'tribeModel' }]
    });  
    return posts.map(post => post.get({ plain: true }) as Post);
  }

  async getPostById(id: number): Promise<Post | null> {
    const post = await PostModel.findByPk(id, {
      include: [{ model: TribeModel, as: 'tribeModel' }]
    });
    return post ? post.get({ plain: true }) as Post : null;
  }

  async getPostsByTribeId(tribeId: number): Promise<Post[]> {
    const posts = await PostModel.findAll({
      where: { tribe: tribeId }, 
      include: [{
        model: TribeModel,
        as: 'tribeModel',
        required: true 
      }]
    });

    return posts.map(post => post.get({ plain: true }) as Post);
  }


   async addPost(title: string, description: string, author: string, tribeId: number, songLink: string) : Promise<Post> {
    const post= await PostModel.create({
          title: title,
          description: description,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          author: author,
          likes: 0,
          tribe: tribeId,
          songLink: songLink
    });
    return post.get({ plain: true }) as Post;

    
  }
      
  async updatePost(id: number, title: string, description: string, songLink: string): Promise<Post | null> {
    const post = await PostModel.findByPk(id);
    if (post) {
      post.title = title;
      post.description = description;
      post.songLink = songLink;
      post.updatedAt = new Date();
      await post.save();
      return post.get({ plain: true }) as Post;
    }
    return null;

}   

}
