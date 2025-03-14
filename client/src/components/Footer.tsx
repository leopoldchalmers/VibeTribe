import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

function Footer(){
    return (
    <footer>
        <div className="container-fluid text-center fixed-bottom footerlinks">
          <div className="row">
            <div className="col-4 text">
              <Link to="/about">About</Link>
            </div>
            <div className="col-4 text">
              <Link to="/contact">contact</Link>
            </div>
            <div className="col-4 text">
              <Link to="/help">Help</Link>
            </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer