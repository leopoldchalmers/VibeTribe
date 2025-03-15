import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

function Footer(){
    return (
    <footer>
        <div className="container-fluid text-center fixed-bottom footerlinks py-3">
          <div className="row">
          <p className="col-4 text copyright"> © VibeTribe</p>
            <div className="col-4 text">
              <Link to="/about">About</Link>
            </div>
            <div className="col-4 text">
              <Link to="/contact">Contact</Link>
            </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer