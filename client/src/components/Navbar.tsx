import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';

import { useContext } from "react";
import { UserContext } from "../UserContext";

import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

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
                <Link to="/home">
                    <img src="logo.png" className="navbarImg" alt="VibeTribe Logo"/>
                </Link>
            </div>
            <div className="col-8 text-center">
                <h1> 
                    <Link to="/home" className="navbarTitle">VibeTribe</Link>
                    </h1>
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