import { Tribe } from '../api';


export function TribeList({ tribes }: { tribes: Tribe[] }) {
    if (!tribes || tribes.length === 0) {
        return <div>No tribes available</div>; 
    }

    return (
        <div>
            <h1>Tribe List</h1>
            <ul>
                {tribes.map(tribe => (
                    <li key={tribe.id}>{tribe.description}</li>
                ))}
            </ul>
        </div>
    );
}
