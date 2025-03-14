import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { registerUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  interface Errors {
    username?: string;
    email?: string;
    password?: string;
    serverError?: string;
  }

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  return (
    <section className="sectionMargin flex text-center items-center fixed-top">
      <div className="text-center">
        <h1 className="pageTitle">Register new user</h1>

        <div className="text-left">
          <label htmlFor="username" className="block font-medium p-3">
            Username:
          </label>
          <input
            className="forms"
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="text-left">
          <label htmlFor="email" className="block font-medium p-4">
            Email:
          </label>
          <input
            className="forms mt-1"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="text-left">
          <label htmlFor="password" className="block font-medium p-3">
            Password:
          </label>
          <input
            className="forms mt-1"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <p>
          <button
            className="logInButton mt-4"
            onClick={async () => {
              setErrors({});
              let valid = true;

              if (username.length === 0) {
                setErrors((prev) => ({
                  ...prev,
                  username: "Username must not be empty",
                }));
                valid = false;
              }

              if (email.length === 0) {
                setErrors((prev) => ({
                  ...prev,
                  email: "Email must not be empty",
                }));
                valid = false;
              }

              if (password.length < 5) {
                setErrors((prev) => ({
                  ...prev,
                  password: "Password must be at least 5 characters long",
                }));
                valid = false;
              }
              if (valid) {
                try {
                  await registerUser(username, email, password);
                  navigate("/");
                } catch (error: any) {
                  if (error.response && error.response.status === 400) {
                    const serverErrorMsg = error.response.data;
                    if (serverErrorMsg.includes("Username")) {
                      setErrors((prev) => ({
                        ...prev,
                        username: serverErrorMsg,
                      }));
                    } else if (serverErrorMsg.includes("Email already exists")) {
                      setErrors((prev) => ({
                        ...prev,
                        email: serverErrorMsg,
                      }));
                    } else if(serverErrorMsg.includes("Invalid email format")) {
                      setErrors((prev) => ({
                        ...prev,
                        email: serverErrorMsg,
                      }));
                    } 
                    else {
                      setErrors((prev) => ({
                        ...prev,
                        serverError: serverErrorMsg,
                      }));
                    }
                  } else {
                    setErrors((prev) => ({
                      ...prev,
                      serverError: "An unexpected error occurred",
                    }));
                  }
                }
              }
            }}
          >
            Sign up
          </button>
        </p>

        <p className="flex items-center space-x-2">
          <span>Already have an account? </span>
          <Link to="/account" className="goBack text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
