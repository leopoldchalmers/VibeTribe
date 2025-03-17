import axios from 'axios';

/**
 * This file contains the functions that interact with the backend API.
 * The functions in this file are used by the components to fetch data from the backend.
 * The functions in this file are used to fetch data from the backend and return it to the components.
 */

axios.defaults.withCredentials = true;


const BASE_URL = 'http://localhost:8080';


/**
 * Represents a Tribe object.
 * 
 * @typedef {Object} Tribe
 * @property {string} title - The title of the tribe.
 * @property {number} id - The unique identifier of the tribe.
 * @property {string} description - The description of the tribe.
 * @property {string} owner - The owner of the tribe.
 * @property {Date} createdAt - The creation date of the tribe.
 * @property {Date} updatedAt - The last update date of the tribe.
 */

export type Tribe = {
    title: string;
    id: number;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @typedef {Object} Post
 * @property {number} id - The unique identifier of the post.
 * @property {string} title - The title of the post.
 * @property {string} description - The description of the post.
 * @property {number} author - The author ID of the post.
 * @property {number} createdAt - The timestamp when the post was created.
 * @property {number} updatedAt - The timestamp when the post was last updated.
 * @property {number} likes - The number of likes the post has.
 * @property {number} tribeId - The ID of the tribe to which the post belongs.
 * @property {string} songLink - The link to the song related to the post.
 */

export type Post = {
    id : number;
    title : string;
    description : string;
    author : number;
    createdAt : number;
    updatedAt : number;
    likes : number;
    tribeId : number;
    songLink : string;
}

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 */

export type User = {
    username: string;
}

/**
 * Fetches all tribes from the backend.
 * @returns {Promise<Tribe[]>} A promise that returns an array of tribes.
 */
export const getTribes = async () => {
    const response = await axios.get<Tribe[]>(`${BASE_URL}/tribes`)
    return response.data
}

/**
 * Creates a new tribe with the given description and title.
 * @param {string} description - The description of the new tribe.
 * @param {string} title - The title of the new tribe.
 * @returns {Promise<Tribe | undefined>} A promise that returns the created tribe or `undefined` if an error occurs.
 */
export const createTribe = async (description: string, title: string) => {
    try {
        const response = await axios.post<Tribe>(`${BASE_URL}/tribes`, {title, description});
        return response.data;
      } catch (e : any) {
        console.log(e);
        return undefined;
      }
}

/**
 * Fetches the list of all tribes.
 * 
 * @returns {Promise<Tribe[]>} A promise that returns an array of tribes.
 */
export const getTribeById = async (id: number) => {
    const response = await axios.get<Tribe>(`${BASE_URL}/tribes/${id}`);
    return response.data;
}

/**
 * Registers a new user by sending the provided username, email, and password to the API.
 * 
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<void>} A promise that returns when the user is successfully registered.
 * @throws {any} Throws an error if the registration fails.
 */
export async function registerUser(username: string, email: string, password: string) : Promise<void> {
    try {
        await axios.post(`${BASE_URL}/users`, {username : username, email: email, password: password});
        console.log('User registered');

    } catch (e:any) {
        throw e;
    }
}

/**
 * Enum representing possible login results.
 * 
 * @readonly
 * @enum {number}
 */
export enum LoginResult {
    SUCCESS,
    INVALID_CREDENTIALS,
    SERVER_ERROR
}

/**
 * Enum representing possible logout results.
 * 
 * @readonly
 * @enum {number}
 */
export enum LogoutResult {
    SUCCESS,
    SERVER_ERROR
}

/**
 * Logs in a user by sending the username and password to the API.
 * 
 * @param {string} username - The username of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<LoginResult>} A promise that returns the result of the login.
 */
export async function login(username: string, password: string) : Promise<LoginResult> {
    try {
        await axios.post(`${BASE_URL}/users/login`, {username: username, password: password});
        console.log('Login successful');
        return LoginResult.SUCCESS;
    } catch (e : any) {
        if (e.response.status === 401) {
            return LoginResult.INVALID_CREDENTIALS;
        }
        return LoginResult.SERVER_ERROR;
    }
}

/**
 * Logs out the current user.
 * @returns {Promise<LogoutResult>} A promise that returns the result of the logout.
 */
export async function logout() : Promise<LogoutResult> {
    try {
        await axios.post(`${BASE_URL}/users/logout`);
        console.log('Logged out');
        return LogoutResult.SUCCESS;
    } catch (e : any) {
        console.log(e);
        return LogoutResult.SERVER_ERROR;
    }
}

/**
 * Creates a new post by sending the post details to the API.
 * 
 * @param {string} title - The title of the new post.
 * @param {string} description - The description of the new post.
 * @param {string} author - The author ID of the post.
 * @param {number} tribeId - The ID of the tribe the post belongs to.
 * @param {string} songLink - The link to the song associated with the post.
 * @returns {Promise<Post>} A promise that returns the created post.
 * @throws {any} Throws an error if the post creation fails.
 */
export const createPost = async (title: string, description: string, author: string, tribeId: number, songLink: string) => {
    try {
        const response = await axios.post<Post>(`${BASE_URL}/posts`, { title, description, author, tribeId, songLink });
        return response.data;
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

/**
 * Fetches all posts related to a specific tribe by its ID.
 * 
 * @param {number} tribeId - The ID of the tribe to fetch posts for.
 * @returns {Promise<Post[]>} A promise that returns an array of posts.
 */
export const getPostsByTribeId = async (tribeId: number) => {
    const response = await axios.get<Post[]>(`${BASE_URL}/posts?tribeId=${tribeId}`);
    return response.data;
}


