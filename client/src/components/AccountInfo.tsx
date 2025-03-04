// AccountInfo.js
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';
import { logout, LogoutResult } from "../api";

 

axios.defaults.withCredentials = true;

interface Errors {
  logoutError ?: string
}
export function AccountInfo() {

  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);
  const [errors, setErrors] = useState<Errors>({});

  if (!user) return <div>Please log in to view account details.</div>;

  return (
    <div>
      <h1>Account Info</h1>
      <p>Username: {user.username}</p>

    <button onClick={async () => {
      const result = await logout();
      if (result === LogoutResult.SERVER_ERROR) {
        console.log("Server error");
        setErrors((errors) => {
          return {
            ...errors,
            logoutError: "A server error was encountered. Try again later."
          }
        })
      }
      if (result === LogoutResult.SUCCESS) {
        setUser(undefined);
        navigate("/account");
      }
      
    }}>Log out</button>   
    {errors.logoutError ? 
    (<p style={{color: "red"}}>{errors.logoutError}</p>)
    : (<></>) } 
    </div>
  )
  };

export default AccountInfo;
