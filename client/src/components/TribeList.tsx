import { Tribe } from "../api";
import { TribeCard } from "./TribeCard";
import "./Card.css"; 
import "../App.css";

export function TribeList({ tribes }: { tribes: Tribe[] }) {
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
