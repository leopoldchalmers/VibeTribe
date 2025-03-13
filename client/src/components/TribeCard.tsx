import { Tribe } from "../api";
import "./Card.css";

export function TribeCard({ tribe }: { tribe: Tribe }) {
  return (
    <div key={tribe.id} className="cardComponent">
      <h2>{tribe.title}</h2>
      <p>{tribe.description}</p>
      <p>👥 {tribe.members} members</p>
      <p>📅 {new Date(tribe.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
