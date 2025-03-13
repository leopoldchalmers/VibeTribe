import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

function Footer(){
    return (
    <footer>
        <div className="container-fluid text-center fixed-bottom footerlinks">
          <div className="row">
            <div className="col-4 text">
              <Link to="/home">About</Link>
            </div>
            <div className="col-4 text">
              <Link to="/home">contact</Link>
            </div>
            <div className="col-4 text">
              <Link to="/home">Help</Link>
            </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer