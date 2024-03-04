import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./routes/Home.jsx" 

const App = () => {
    return <div>
        <Router> {/* Router Tag from import */}
            <Routes>
                <Route exact path='/' Component={Home}></Route> {/* Navigate to '/' (From the server controller) and Load Component 'Home' from Home.jsx, Copy this Router Tag for each components*/}
            </Routes>
        </Router>
    </div>
}

export default App