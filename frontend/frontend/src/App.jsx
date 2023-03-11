import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NewStudent from './pages/NewStudent';
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />}/>
      <Route path="/new" element={<NewStudent />}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
