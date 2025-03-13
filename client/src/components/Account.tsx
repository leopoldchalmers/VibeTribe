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


