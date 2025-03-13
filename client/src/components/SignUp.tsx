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
      <section className="sectionMargin flex text-center items-center fixed-top">
          <div className="text-center">
          <h1 className="pageTitle">Register new user</h1>
          <div className="text-left">
              <label htmlFor="username" className="block font-medium p-3">Username: </label>
              <input 
              className="forms" 
              type="text" 
              id="username" 
              onChange={(e) => {setUsername(e.target.value);
              }}></input>
          </div>
          <div className="text-left">
            <label htmlFor="email" className="block font-medium p-4">Email: </label>
            <input 
            className="forms mt-1"
            type="email" 
            id="email" 
            onChange={(e) => {setEmail(e.target.value);
            }}></input>
          </div>
          <div className="text-left">
              <label htmlFor="password" className="block font-medium p-3" >Password: </label>
              <input
              className="forms mt-1" 
              type="password" 
              id="password" 
              onChange={(e) => {setPassword(e.target.value);
              }}></input>
          </div>
          <p><button
           className="logInButton mt-5"
            onClick={async () => {
              await registerUser(username, email, password);
              navigate("/home");
          }}>Sign up </button></p>
          <NavLink to="/account" end>Back to login screen</NavLink>
          </div>
      </section>
      
  )

}
