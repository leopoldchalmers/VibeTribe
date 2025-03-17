import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, LoginResult } from "../api";
import { UserContext } from "../UserContext";

export function Account() {
  
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
            className="logInButton"
            onClick={async () => {
              setErrors({});
              if (username.length === 0) {
                setErrors((prev) => ({ ...prev, username: "Username must not be empty" }));
              }
              if (password.length < 5) {
                setErrors((prev) => ({ ...prev, password: "Password must be at least 5 characters long" }));
              }
              if (!errors.password && !errors.username) {
                const loginResult = await login(username, password);
                if (loginResult === LoginResult.INVALID_CREDENTIALS) {
                  setErrors((prev) => ({ ...prev, username: "Username or password invalid" }));
                }
                if (loginResult === LoginResult.SERVER_ERROR) {
                  setErrors((prev) => ({ ...prev, serverError: "An error occurred. Please try again later." }));
                }
                if (loginResult === LoginResult.SUCCESS) {
                  userContext.setUser({ username });
                  navigate("/");
                }
              }
            }}
          >
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
  
