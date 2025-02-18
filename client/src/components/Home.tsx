import { getTribes } from "../api";
import { TribeList } from "../components/TribeList";
import { Tribe } from "../api";
import { useEffect, useState } from "react";




function Home() {

    const [tribes, setTribes] = useState<Tribe[]>([]);

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
            <a href = "./createtribe"><button type="button" className="btn btn-light tribeButton" > Create Tribe</button> </a>

            <TribeList tribes={tribes} />
        </div>
        </>

    );

    
}

export default Home;
