import { createContext } from "react"
import { User } from './api'

export type UserContextType = {
  user?: User
  setUser: (user: User) => void
}

export const UserContext = createContext<UserContextType>({ setUser: () => {} })
