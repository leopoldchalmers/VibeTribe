import axios from 'axios';

export type Tribe = {
    id: number;
    description: string;
    posts: [];
    owner: number;
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