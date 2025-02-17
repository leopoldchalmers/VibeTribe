import { getTribes } from "../api";
import { createTribe } from "../api";
import { TribeList } from "../components/TribeList";
import { Tribe } from "../api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";




function Home() {

    const [tribes, setTribes] = useState<Tribe[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTribes() {
        const data = await getTribes();
        console.log("Fetched tribes:", data);
        setTribes(data);
        }
        fetchTribes();
    }, []);


    return (

        <>

        <div>
            <h1 className="pageTitle">Home</h1>
            <button type="button" className="btn btn-light tribeButton" onClick={() => navigate("/createTribe")}> Create Tribe</button>

            <TribeList tribes={tribes} />
        </div>
        </>

    );

    
}

export default Home;
