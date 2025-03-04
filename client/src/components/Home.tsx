import { getTribes } from "../api";
import { TribeList } from "../components/TribeList";
import { Tribe } from "../api";
import { useEffect, useState } from "react";
import { UserContext } from '../UserContext'
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function Home() {

    const [tribes, setTribes] = useState<Tribe[]>([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        async function fetchTribes() {
        const data = await getTribes();
        console.log("Fetched tribes:", data);
        setTribes(data);
        }
        fetchTribes();
    }, []);

    return (
        <div>
          <h1 className="pageTitle">Home</h1>
          <Link to="/createtribe">
            <button type="button" className="btn btn-light tribeButton">
              Create Tribe
            </button>
          </Link>
          <TribeList tribes={tribes} />
        </div>
      );
}

export default Home;
