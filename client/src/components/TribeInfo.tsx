import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tribe } from "../api";
import axios from "axios";

export function TribeInfo() {
  const { id } = useParams<{ id: string }>();
  const [tribe, setTribe] = useState<Tribe | null>(null);

  useEffect(() => {
    const fetchTribe = async () => {
      try {
        const response = await axios.get<Tribe>(`http://localhost:8080/tribes/${id}`);
        setTribe(response.data);
      } catch (error) {
        console.error("Error fetching tribe:", error);
      }
    };

    fetchTribe();
  }, [id]);

  if (!tribe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{tribe.title}</h1>
      <p>{tribe.description}</p>
      <p>Owner: {tribe.owner}</p>
      <p>Created At: {new Date(tribe.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(tribe.updatedAt).toLocaleDateString()}</p>
    </div>
  );
}