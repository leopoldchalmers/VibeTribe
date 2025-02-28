import axios from 'axios';
axios.defaults.withCredentials = true;

const BASE_URL = 'http://localhost:8080';

export type Tribe = {
    title: string;
    id: number;
    description: string;
    posts: [];
    owner: number;
    createdAt: string;
    updatedAt: string;
    members: [];
}

export type Post = {
    id : number;
    title : string;
    description : string;
    author : number;
    createdAt : number;
    updatedAt : number;
    likes : number;
    tribe : Tribe;
}

export const getTribes = async () => {
    try {
        const response = await fetch('http://localhost:8080/tribes'); 
        if (!response.ok) {
            throw new Error('Failed to fetch tribes');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching tribes:', error);
        throw error; 
    }
}

export const createTribe = async (description: string) => {
    try {
        const response = await fetch('http://localhost:8080/tribes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description })
        });
        if (!response.ok) {
            throw new Error('Failed to create tribe');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating tribe:', error);
        throw error;
    }
}
    
export async function registerUser(username: string, password: string) : Promise<void> {
    try {
        await axios.post(`${BASE_URL}/users`, {username : username, password: password});
    } catch (e:any) {
        console.log(e);
    }
}

export enum LoginResult {
    SUCCESS,
    INVALID_CREDENTIALS,
    SERVER_ERROR
}

export async function login(username: string, password: string) : Promise<LoginResult> {
    try {
        await axios.post(`${BASE_URL}/user/login`, {username: username, password: password});
        return LoginResult.SUCCESS;
    } catch (e : any) {
        if (e.response.status === 401) {
            return LoginResult.INVALID_CREDENTIALS;
        }
        return LoginResult.SERVER_ERROR;
    }
}

