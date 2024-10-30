import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Navbar } from './assets/components/navbar';
import { Home } from './assets/pages/home';
import { CreateProduct } from './assets/pages/createproduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div class="w-screen h-screen bg-green-950">     
        <Router>
          
          <Navbar />
          <Routes>
            <Route path="/creatProduct" element = {<CreateProduct />}/>      
            <Route path="/" element = {<Home />}/>      
          </Routes>
      
        </Router>
        <ToastContainer />
        

      </div>
    
    
     
    </>
  )
}

export default App
