import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login, LoginResult } from "../api";
import { UserContext } from "../UserContext";


axios.defaults.withCredentials = true;

export function Account() {
  interface Errors {
      username ?: string,
      password ?: string,
      serverError ?: string
  }

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const userContext = useContext(UserContext)

  return (
      <section>
          <h1>Log in to VibeTribe</h1>
              <p>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e) => {
                  setUsername(e.target.value);
              }}></input>
              {errors.username ? 
              (<p style={{color: "red"}}>{errors.username}</p>)
              : (<></>) }
          </p>
          <p>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => {
                  setPassword(e.target.value);
              }}></input>
              {errors.password ? 
              (<p style={{color: "red"}}>{errors.password}</p>)
              : (<></>) }
              </p>
              {errors.serverError ? 
              (<p style={{color: "red"}}>{errors.serverError}</p>)
              : (<></>) }
              <p><button onClick={async () => {
                  setErrors({});
                  if (username.length === 0) {
                      setErrors((errors) => {
                          return {
                              ...errors,
                              username : "Username must not be empty"
                          }
                      });
                  }
                  if (password.length < 5) {
                      setErrors((errors) => {
                          return {
                              ...errors,
                              password : "Password must be at least 5 characters long"
                          }
                      });
                  }
                  if (!errors.password && !errors.username) {
                      const loginResult = await login(username, password);
                      if (loginResult === LoginResult.INVALID_CREDENTIALS) {
                          setErrors((errors) => {
                              return {
                                  ...errors,
                                  username : "Username or password invalid"
                              }
                          });    
                      }
                      if (loginResult === LoginResult.SERVER_ERROR) {
                          setErrors((errors) => {
                              return {
                                  ...errors,
                                  serverError: "An error occurred while processing your request. Please try again later."
                              }
                          })
                      }
                      if (loginResult === LoginResult.SUCCESS) {
                          userContext.setUser({ username});
                          navigate("/home");
                      }
                  }
              }}>Log In</button></p>
          <Link to="/SignUp" >Sign up</Link>
      </section>
  );
}



/*function Account() {

    //Add custom error handlign, ternary expressions, and conditional rendering, boolean expression med ?, sant renderar en del "":"" renderar en annan del (en if or else statement)
    // Cases som är undefined eller tomma, hur ska användaren få feedback på det?

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

          console.log("Logging in with", formData);
          const response = await axios.post("http://localhost:8080/users/login", formData);
          console.log("User logged in:", response.data);
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
              <h1 className="pageTitle">Welcome back, {user.name}!</h1>
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
              <a href = "./signup">
                <button type="button" className="btn btn-light signUpButton" >Sign up</button>
                </a>
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
*/
