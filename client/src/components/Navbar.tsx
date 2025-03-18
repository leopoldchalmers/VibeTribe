import "../App.css"
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import profileIcon from "../assets/Profile_icon.webp";

function Navbar(){

    /**
     * The navbar is a component that displays the VibeTribe logo, the title of the app, and a button to navigate to the account page
     * The navbar is fixed to the top of the page
     * The navbar is displayed on all pages
     * The navbar checks if the user is logged in, and changes the Account-button to navigate to the account page if the user is logged in
     * The navbar uses the UserContext to check if the user is logged in
     */

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
        <nav className="container-fluid text-center custom-navbar fixed-top">
            <div className="row">
            <div className="col-2 text-start">
                <Link to="/">
                    <img src={logo} className="navbarImg" alt="Logo"/>
                </Link>
            </div>
            <div className="col-8 text-center">
                <h1> 
                    <Link to="/" className="navbarTitle">VibeTribe</Link>
                    </h1>
            </div>
            <div className="col-2 text-end">
                <button 
                onClick={handleAccountClick} 
                className="btn btn-link p-0 border-0 account-btn"
                
            >
                <img src={profileIcon} className="navbarImg" alt="Profile Icon"/>
            </button>
            </div>
            </div>
        </nav>
    )
}

export default Navbar