import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Home'
import LoginSignupPage from './login'
//import Preview from './Preview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginSignupPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
