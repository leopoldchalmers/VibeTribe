import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, LoginResult } from "../api";
import { UserContext } from "../UserContext";

export function Account() {
  
  /**
   * The account page is a page that allows the user to log in to VibeTribe
   */
    interface Errors {
        username?: string;
        password?: string;
        serverError?: string;
    }
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({});
  
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    /**
     * This function handles the login process. It validates the username and password, and then logs the user in if the credentials are correct.
     * If the credentials are incorrect, the user is shown an error message. 
     * If there is a server error, the user is shown a server error message.
     * If the login is successful, the user is redirected to the home page.
     */

    const handleLogin = async () => {
      const validationErrors: Errors = {};
      if (username.trim() === "") {
        validationErrors.username = "Username must not be empty";
      }
      if (password.length < 5) {
        validationErrors.password = "Password must be at least 5 characters long";
      }
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      const loginResult = await login(username, password);
      if (loginResult === LoginResult.INVALID_CREDENTIALS) {
        setErrors({ username: "Username or password invalid" });
      } else if (loginResult === LoginResult.SERVER_ERROR) {
        setErrors({ serverError: "An error occurred. Please try again later." });
      } else if (loginResult === LoginResult.SUCCESS) {
        userContext.setUser({ username });
        navigate("/");
      }
    };
  
    return (
      <section className="sectionMargin flex justify-center items-center fixed-top">
        <div className="text-center">
          <h1 className="pageTitle">Log in to VibeTribe</h1>
  
          <div className="text-left">
            <label htmlFor="username" className="block font-medium p-3">Username: </label>
            <input
              type="text"
              id="username"
              className="forms"
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
  
          <div className="text-left">
            <label htmlFor="password" className="block font-medium p-3">Password: </label>
            <input
              type="password"
              id="password"
              className="forms"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
  
          {errors.serverError && <p className="error">{errors.serverError}</p>}
  
          <button
            className="logInButton" onClick= {handleLogin}>
            Log In
          </button>
  
          <p className="flex items-center space-x-2 mt-4">
            <span>Don't have an account?  </span>
            <Link to="/signup" className="goBack"> Sign up</Link>
          </p>

        </div>
      </section>
    );
  }