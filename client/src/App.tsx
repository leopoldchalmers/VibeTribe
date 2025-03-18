import './App.css'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import {Account} from './components/Account.tsx'
import {SignUp} from './components/SignUp.tsx'
import Home from './components/Home.tsx'
import CreateTribe from './components/CreateTribe.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import {UserContext} from './UserContext.ts'
import { User } from './api.ts'
import AccountInfo from './components/AccountInfo.tsx'
import { About } from './components/About.tsx'
import { Contact } from './components/Contact.tsx'
import { TribeInfo } from './components/TribeInfo.tsx'

function App() {
  /**
   * The App component is the main component of the application
   * The App component uses the UserContext to store the user state
   * The App component uses the UserContext to pass the user state to the Navbar and AccountInfo components
   * The App component uses the BrowserRouter to enable routing in the application
   * The App component uses the Navbar, Footer, Home, Account, SignUp, CreateTribe, and AccountInfo components to display the application
   */

  const [user, setUser] = useState<User | undefined>(undefined)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/accountinfo" element={<AccountInfo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createTribe" element={<CreateTribe />} /> 
          <Route path= "/about" element={<About />} />
          <Route path= "/contact" element={<Contact />} />
          <Route path="/tribe/:id" element={<TribeInfo />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App