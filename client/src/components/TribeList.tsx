import { Tribe } from "../api/api";
import { TribeCard } from "./TribeCard";
import "./Card.css"; 
import "../App.css";

export function TribeList({ tribes }: { tribes: Tribe[] }) {
  /**
   * TribeList is a component that displays a list of tribes
   * TribeList takes a list of tribes as a prop and displays each tribe in the list
   * TribeList is used in the Home component
   * TribeList checks if there are no tribes available and displays a message if there are no tribes
   * TribeList maps over the list of tribes and displays each tribe using the TribeCard component
   * TribeList uses the TribeCard component to display each tribe
   */
  if (!tribes || tribes.length === 0) {
    return <div>No tribes available</div>;
  }

  return (
    <div className="card-group scrollable-container">
      {tribes.map((tribe) => (
        <div className="card-grid" key={tribe.id}>
          <TribeCard tribe={tribe} />
        </div>
      ))}
    </div>
  );
}