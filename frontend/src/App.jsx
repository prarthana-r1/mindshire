import { useState } from 'react'
import './App.css'
import ELearningLandingPage from './Home.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginSignupPage from './Login.jsx'
import UserDashboard from './MindShireDashboard.jsx'
import BlueCurriculumApp from './Learning.jsx'
import GuidedMeditation from './Meditation.jsx'
import AboutPage from './About.jsx'
import ChatbotHelpPage from './chatbot.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ELearningLandingPage/>}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginSignupPage/>}/>
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/learning" element={<BlueCurriculumApp/>}/>
        <Route path="/meditation" element={<GuidedMeditation/>}/>
        <Route path="/chat" element={<ChatbotHelpPage />} />
      </Routes>
    </Router>
  )
}

export default App
