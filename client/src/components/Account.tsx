import { Form } from "react-bootstrap";
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Account() {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({ email: "", password: "" });


    useEffect(() => {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userFromLocalStorage));
      }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
      }));
  };

  const handleLogin = async () => {
      try {
          const response = await axios.post("http://localhost:8080/users/login", formData);
          localStorage.setItem("user", JSON.stringify(response.data));
          setIsLoggedIn(true);
          setUser(response.data);
      } catch (error) {
          console.error("Login failed:", error);
          alert("Invalid email or password");
      }
  };

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
                <Form.Control 
                  type="email" 
                  name = "email"
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={handleChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name = "password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}/>
              </Form.Group>
            )}
          </Form>

          {!isLoggedIn && (
            <div className="d-grid gap-2 col-6 mx-auto">
              <button type="button" className="btn btn-light loginButton" onClick={() => {
                handleLogin();
              }} >Log in</button>


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
