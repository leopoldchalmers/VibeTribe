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

function App() {

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
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App
