import { TribeList } from "../components/TribeList";
import { Tribe, getTribes } from "../api";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";


function Home() {

  /**
   * The home page is a page that displays all the tribes that have been created
   * The home page also has a button that allows the user to create a new tribe
   * The home page fetches the tribes from the server and displays them
   * The home page also checks if the user is logged in, and redirects the user to the login page if they are not
   */

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

  /**
   * The home page uses the UserContext to check if the user is logged in
   * The home page uses the useNavigate hook to redirect the user to the login page
   */


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
          <h1 className="pageTitle text-center mt-5">Tribes</h1>
          <h1></h1> 
          <button className="createTribeButton" onClick={handleCreateTribeButtonClick}>Create Tribe</button>
          <TribeList tribes={tribes} />
        </div>
      );
}

export default Home;
