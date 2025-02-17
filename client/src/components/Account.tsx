import { Form } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Account() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userFromLocalStorage));
      }
    }, []);

    return (
        <>
          <div className="d-grid gap-2 col-6 mx-auto">
            {isLoggedIn ? (
              <h1 className="pageTitle">Welcome back, {user?.name}!</h1>
            ) : (
              <h1 className="pageTitle">Log in to VibeTribe</h1>
            )}
          </div>

          <Form className="form-container">
            {isLoggedIn ? null : (
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            )}
          </Form>

          {isLoggedIn ? null : (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="button" className="btn btn-light loginButton">Log in</button>
              <p className="signUptext">Don't have an account?</p>
              <button type="button" className="btn btn-light signUpButton" onClick={() => navigate("/signup")}>Sign up</button>
            </div>
          )}

          {isLoggedIn && (
            <button className="btn btn-light logoutButton" onClick={() => {
              localStorage.removeItem("user");
              setIsLoggedIn(false);
              setUser(null);
            }}>
              Logout
            </button>
          )}
        </>
    );
}

export default Account;
