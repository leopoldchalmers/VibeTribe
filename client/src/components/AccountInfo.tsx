import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { logout, LogoutResult } from "../api/api";

interface Errors {
  logoutError ?: string
}

/**
 * AccountInfo component that displays the user's username and a button to log out
 */

export function AccountInfo() {

  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);
  const [errors, setErrors] = useState<Errors>({});
 
  if (!user) return <div>Please log in to view account details.</div>;

  return (
    <div className='sectionMargin flex text-center items-center fixed-top'>
      <h1 className= "pageTitle">Account Info</h1>
      <h3 className='mt-4'>Username: {user.username}</h3>

    <button className="logInButton" onClick={async () => {
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
    (<p className = "error">{errors.logoutError}</p>)
    : (<></>) } 
    </div>
  )
  };

export default AccountInfo;