import axios from 'axios';

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

const BASE_URL = 'http://localhost:5000';


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
};

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