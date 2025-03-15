import { Tribe } from "../api";
import "./Card.css";

export function TribeCard({ tribe }: { tribe: Tribe }) {
  return (
    <div key={tribe.id} className="cardComponent">
      <h2 style={{ fontWeight: "bold" }}>{tribe.title}</h2>
      <p>{tribe.description}</p>
      <p>👥 {tribe.owner} Owner </p>
      <p>📅 {new Date(tribe.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
