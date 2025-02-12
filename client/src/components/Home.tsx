import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';

interface Home {
    title: string
    logopath: string
    links: string[]
}

function Home(){
    return (
        <>
       <div>
            <h1>Home</h1>
       </div>
       </>
    );
}

export default Home