import './App.css'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import {Account} from './components/Account.tsx'
import {SignUp} from './components/SignUp.tsx'
import Home from './components/Home.tsx'
import CreateTribe from './components/CreateTribe.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'


function App() {


  const [, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createTribe" element={<CreateTribe />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
