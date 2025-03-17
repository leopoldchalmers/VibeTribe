import axios from 'axios';
axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:8080';

export type Tribe = {
    title: string;
    id: number;
    description: string;
    owner: string;
    createdAt: Date;
    updatedAt: Date;
}

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

export type User = {
    username: string;
}

export const getTribes = async () => {

    const response = await axios.get<Tribe[]>(`${BASE_URL}/tribes`)
    return response.data
}

export const createTribe = async (description: string, title: string) => {

    try {
        const response = await axios.post<Tribe>(`${BASE_URL}/tribes`, {title, description});
        return response.data;
      } catch (e : any) {
        console.log(e);
        return undefined;
      }
}

export const getTribeById = async (id: number) => {
    const response = await axios.get<Tribe>(`${BASE_URL}/tribes/${id}`);
    return response.data;
}
    
export async function registerUser(username: string, email: string, password: string) : Promise<void> {
    try {
        await axios.post(`${BASE_URL}/users`, {username : username, email: email, password: password});
        console.log('User registered');

    } catch (e:any) {
        throw e;
    }
}

export enum LoginResult {
    SUCCESS,
    INVALID_CREDENTIALS,
    SERVER_ERROR
}

export enum LogoutResult {
    SUCCESS,
    SERVER_ERROR
}


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


export const createPost = async (title: string, description: string, author: string, tribeId: number, songLink: string) => {
    try {
        const response = await axios.post<Post>(`${BASE_URL}/posts`, { title, description, author, tribeId, songLink });
        return response.data;
    } catch (e: any) {
        console.log(e);
        throw e;
    }
}

export const getPostsByTribeId = async (tribeId: number) => {
    const response = await axios.get<Post[]>(`${BASE_URL}/posts?tribeId=${tribeId}`);
    return response.data;
}


