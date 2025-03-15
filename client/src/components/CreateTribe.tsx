import { Tribe } from '../api';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from '../UserContext';
import "../App.css";

axios.defaults.withCredentials = true;

function CreateTribe() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [tribe, setTribe] = useState<Omit<Tribe, "id">>({
    owner: "",
    title: "",
    description: "",
    members: ["test"],
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTribe(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in");
      return;
    }
    tribe.owner = user.username;
    try {
      console.log("Creating tribe:", tribe);
      const response = await axios.post("http://localhost:8080/tribes", tribe);
      console.log("Tribe created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error caught creating tribe:", error);
    }
  };

  return (
    <>
    <Link to="/" className="goBack fixed-top">Go back</Link>
    <section className="sectionMargin flex text-center items-center fixed-top">
      <div className="text-center">
        <h1 className="pageTitle">Create Tribe</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-left mt-3">
            <label htmlFor="title" className="block font-medium p-3">Tribe Name:</label>
            <input
              className="forms"
              type="text"
              id="title"
              name="title"
              placeholder="  name"
              value={tribe.title}
              onChange={handleChange}
            />
          </div>
          <div className="text-left">
            <label htmlFor="description" className="block font-medium p-3">Tribe Description:</label>
            <input
              className="forms"
              type="text"
              id="description"
              name="description"
              placeholder="  description"
              value={tribe.description}
              onChange={handleChange}
            />
          </div>
          <div className="mt-1">
            <button type="submit" className="logInButton">
              Create Tribe
            </button>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

export default CreateTribe;
