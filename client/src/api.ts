import axios from 'axios';

export type Tribe = {
    id: number;
    description: string;
    posts: [];
    owner: number;
}

const BASE_URL = 'http://localhost:5173:';

export async function getTribes(): Promise<Tribe[]> {
    const response = await axios.get<Tribe[]>(`${BASE_URL}/tribe`);
    return response.data;
}