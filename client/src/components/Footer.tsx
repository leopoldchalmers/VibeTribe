import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';

function Footer(){
    return (
    <footer>
        <div className="container-fluid text-center fixed-bottom footerlinks">
          <div className="row">
            <div className="col-4 text">
              <a href = "about.html">
                About
              </a>
            </div>
            <div className="col-4 text">
              <a href = "contact.html">
                Contact
              </a>
            </div>
            <div className="col-4 text">
              <a href = "help.html">
                Help
              </a>
            </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer