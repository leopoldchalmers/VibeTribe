import { Tribe } from "../api";
import "./Card.css";
import { Link } from "react-router-dom";

export function TribeCard({ tribe }: { tribe: Tribe }) {
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