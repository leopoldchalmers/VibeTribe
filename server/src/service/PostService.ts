import { Post } from '../model/post';
import { PostModel } from '../db/post.db';
import { TribeModel } from '../db/tribe.db';

/**
 * PostService is a service that manages posts.
 * PostService has methods for getting all posts, getting a post by ID, creating a post, and updating a post.
 */
export class PostService {

  /**
   * Retrieves all posts from the database, including their associated tribe.
   * @returns {Promise<Post[]>} A promise that returns an array of posts.
   */
  async getPosts(): Promise<Post[]> {
    const posts = await PostModel.findAll({
      include: [{ model: TribeModel, as: 'tribeModel' }]
    });  
    return posts.map(post => post.get({ plain: true }) as Post);
  }

  /**
   * Retrieves a specific post by its ID from the database, including its associated tribe.
   * @param {number} id - The ID of the post to retrieve.
   * @returns {Promise<Post | null>} A promise that returns a post if found, or null if not found.
   */
  async getPostById(id: number): Promise<Post | null> {
    const post = await PostModel.findByPk(id);
    return post ? post.get({ plain: true }) as Post : null;
  }

  /**
   * Retrieves all posts associated with a specific tribe by the tribe's ID.
   * @param {number} tribeId - The ID of the tribe to retrieve posts for.
   * @returns {Promise<Post[]>} A promise that returns an array of posts associated with the given tribe.
   */
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

  /**
   * Creates a new post and stores it in the database.
   * @param {string} title - The title of the new post.
   * @param {string} description - The description of the new post.
   * @param {string} author - The author of the new post.
   * @param {number} tribeId - The ID of the tribe that the post belongs to.
   * @param {string} songLink - The link to the song associated with the post.
   * @returns {Promise<Post>} A promise that returns the created post.
   */
  async addPost(title: string, description: string, author: string, tribeId: number, songLink: string): Promise<Post> {
    const post = await PostModel.create({
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

  /**
   * Updates an existing post in the database by its ID.
   * @param {number} id - The ID of the post to update.
   * @param {string} title - The new title of the post.
   * @param {string} description - The new description of the post.
   * @param {string} songLink - The new song link associated with the post.
   * @returns {Promise<Post | null>} A promise that returns the updated post, or null if the post was not found.
   */
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
