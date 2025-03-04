import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';

import { useContext } from "react";
import { UserContext } from "../UserContext";

import { useNavigate } from "react-router-dom";

function Navbar(){

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const handleAccountClick = () => {
        if(user){
            navigate("/accountinfo");
        } else {
            navigate("/account");
        }
    }

    return (
        <nav className="container-fluid text-center custom-navbar">
            <div className="row">
            <div className="col-2 text-start">
                <a href= "./home">
                <img src="logo.png" className= "navbarImg" alt="VibeTribe Logo"/>
                </a>
            </div>
            <div className="col-8 text-center">
                <h1> <a href= "./home" className="navbarTitle">VibeTribe</a> </h1>
            </div>
            <div className="col-2 text-end">
                <button 
                onClick={handleAccountClick} 
                className="btn btn-link p-0 border-0"
                style={{ background: 'none' }}
            >
                <img src="src/assets/Profile_icon.webp" className="navbarImg" alt="Profile Icon"/>
            </button>
            </div>
            </div>
        </nav>
    )
}

export default Navbar