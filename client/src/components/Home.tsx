import { getTribes } from "../api";
import { TribeList } from "../components/TribeList";
import { Tribe } from "../api";
import { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


function Home() {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    

    const [tribes, setTribes] = useState<Tribe[]>([]);

    useEffect(() => {
        async function fetchTribes() {
        const data = await getTribes();
        console.log("Fetched tribes:", data);
        setTribes(data);
        }
        fetchTribes();
    }, []);


    async function handleCreateTribeButtonClick() {
      if (userContext.user) {
        console.log("User is logged in, redirecting to create tribe page");
        navigate("/createtribe");
      } else {
        console.log("User is not logged in, redirecting to login page");
        navigate("/Account");

      }
    }


    return (
        <div>
          <h1 className="pageTitle">Home</h1>
          <h1></h1> 
          <button onClick={handleCreateTribeButtonClick}>Create Tribe</button>
          <TribeList tribes={tribes} />
        </div>
      );
}

export default Home;
