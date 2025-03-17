import { Tribe, createTribe } from '../api';
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from '../UserContext';

function CreateTribe() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [tribe, setTribe] = useState<Omit<Tribe, "id" | "createdAt" | "updatedAt">>({
    owner: "",
    title: "",
    description: ""
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
      const createdTribe = await createTribe(tribe.description, tribe.title);
      console.log("Created tribe:", createdTribe)
    if (createdTribe) {
      setTribe(createdTribe);
      navigate("/");
    }
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
