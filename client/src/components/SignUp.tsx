import "../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

export function SignUp() {
  
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  return (
      <section>
          <h1>Register New User</h1>
          <p>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e) => {
                  setUsername(e.target.value);
              }}></input>
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={(e) => {
                setEmail(e.target.value);
            }}></input>
          </p>
          <p>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => {
                  setPassword(e.target.value);
              }}></input>
          </p>
          <p><button onClick={async () => {
              await registerUser(username, email, password);
              navigate("/home");
          }}>Sign up </button></p>
          <NavLink to="/account" end>Back to login screen</NavLink>
      </section>
  )

}


