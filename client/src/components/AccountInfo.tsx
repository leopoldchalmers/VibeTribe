// AccountInfo.js
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';
import { logout } from "../api";

 

axios.defaults.withCredentials = true;


export function AccountInfo() {

  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);
  

  if (!user) return <div>Please log in to view account details.</div>;

  return (
    <div>
      <h1>Account Info</h1>
      <p>Username: {user.username}</p>

    <button onClick={async () => {
      await logout();
      //setUser(undefined);  
      
      
      navigate("/account");
    }}>Log out</button>    
    </div>
  )
  };

export default AccountInfo;
