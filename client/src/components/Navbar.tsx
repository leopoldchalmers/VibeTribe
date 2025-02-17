import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";


function Navbar(){

    const navigate = useNavigate();
    
    return (
        <nav className="container-fluid text-center custom-navbar">
            <div className="row">
            <div className="col-2 text-start">
                <a onClick={()=> navigate("/home")}>
                <img src="logo.png" className= "navbarImg" alt="VibeTribe Logo"/>
                </a>
            </div>
            <div className="col-8 text-center">
                <h1> <a onClick={()=> navigate("/home")} className="navbarTitle">VibeTribe</a> </h1>
            </div>
            <div className="col-2 text-end">
                <a onClick={()=> navigate("/account")}>
                <img src="src\assets\Profile_icon.webp" className="navbarImg" alt="Profile Icon"/>
                </a>
            </div>
            </div>
        </nav>
    )
}

export default Navbar