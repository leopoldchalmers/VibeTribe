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

export type User = {
    username: string;
}

export const getTribes = async () => {
    /*try {
        const response = await fetch('http://localhost:8080/tribes'); 
        if (!response.ok) {
            throw new Error('Failed to fetch tribes');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Error fetching tribes:', error);
        throw error; 
    }*/
    const response = await axios.get<Tribe[]>(`${BASE_URL}/tribes`)
    return response.data
}

export const createTribe = async (description: string, title: string) => {
    /*try {
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
    }*/

    try {
        const response = await axios.post<Tribe>(`${BASE_URL}/tribes`, {title, description});
        return response.data;
      } catch (e : any) {
        console.log(e);
        return undefined;
      }
}
    
export async function registerUser(username: string, email: string, password: string) : Promise<void> {
    try {
        await axios.post(`${BASE_URL}/users`, {username : username, email: email, password: password});
        console.log('User registered');

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

