import { Tribe } from "../api/api";
import "./Card.css";
import { Link } from "react-router-dom";

export function TribeCard({ tribe }: { tribe: Tribe }) {

  /**
   * The TribeCard component is a component that displays a single tribe
   * The TribeCard component takes a tribe as a prop and displays the tribe's title, description, owner, and creation date
   * The TribeCard component is used in the TribeList component
   * The TribeCard component is a clickable link that redirects the user to the tribe's page
   */
  
  return (
    <Link to={`/tribe/${tribe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div key={tribe.id} className="cardComponent">
        <h2 style={{ fontWeight: "bold" }}>{tribe.title}</h2>
        <p>{tribe.description}</p>
        <p>👥 {tribe.owner} Owner </p>
        <p>📅 {new Date(tribe.createdAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}