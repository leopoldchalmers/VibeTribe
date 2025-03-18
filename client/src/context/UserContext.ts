import { createContext } from "react";
import { User } from '../api/api'

/**
 * The UserContext is a context that stores the user state
 * The UserContext is used to pass the user state to components that need it like SignUp and Account components 
 */

export type UserContextType = {
  user?: User
  setUser: (user: User | undefined) => void
}

export const UserContext = createContext<UserContextType>({ setUser: () => {} })