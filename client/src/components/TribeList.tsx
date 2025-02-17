import { Tribe } from '../api';


export function TribeList({ tribes }: { tribes: Tribe[] }) {
    if (!tribes || tribes.length === 0) {
        return <div>No tribes available</div>; 
    }

    return (
        <div>
            <h1 className= "smallTitle">Tribe List</h1>
            <ul>
                {tribes.map(tribe => (
                    <li 
                    key={tribe.id}>{"Title: " + tribe.title} <br/>{"Description: " + tribe.description} <br/>{"Members: " + tribe.members} <br/>{"Created At: " + tribe.createdAt} <br/>{"Updated At: " + tribe.updatedAt}
                    </li>
                ))}
            </ul>
        </div>
    );
}
