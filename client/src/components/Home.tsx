import { useEffect, useState } from "react";
import { getTribes } from "../api";
import { TribeList } from "../components/TribeList";
import { Tribe } from "../api";

function Home() {

    const [tribes, setTribes] = useState<Tribe[]>([]);

    useEffect(() => {
        async function fetchTribes() {
            try {
                const data = await getTribes();
                console.log("Fetched tribes:", data);
                setTribes(data);
            } catch (error) {
                console.error("Error fetching tribes:", error);
                setTribes([
                    {
                        id: Date.now(),
                        description: "Default tribe for testing",
                        posts: [],
                        owner: 1
                    }
                ]);
            }
        }
        fetchTribes();
    }, []);


    return (


        <div >
            <h1 className="pageTitle">Home</h1>
            <TribeList tribes={tribes} />
        </div>
    );

    
}

export default Home;
