import "../App.css"
import { Link } from "react-router-dom";

function Footer(){

  /**
   * The footer is a component that displays the links to the about and contact pages
   * The footer is fixed to the bottom of the page
   * The footer is displayed on all pages
   */
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