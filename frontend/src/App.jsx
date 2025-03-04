import { useState } from 'react'
import './App.css'
import Home from './Home.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginSignupPage from './Login.jsx'
import MindShireDashboard from './MindShireDashboard.jsx'
import BlueCurriculumApp from './Learning.jsx'
import GuidedMeditation from './Meditation.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginSignupPage/>}/>
        <Route path="/dashboard" element={<MindShireDashboard/>}/>
        <Route path="/learning" element={<BlueCurriculumApp/>}/>
        <Route path="/meditation" element={<GuidedMeditation/>}/>
      </Routes>
    </Router>
  )
}

export default App
