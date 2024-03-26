import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Rooms from './routes/Rooms.jsx'
import Bookings from './routes/Bookings.jsx'
import Intro from './routes/Intro.jsx'
import LoginRegister from './routes/LoginRegister.jsx'
import PaymentInfo from './routes/PaymentInfo.jsx'
import ShowBookings from './routes/ShowBookings.jsx'
import RoomInfo from './routes/RoomInfo.jsx'
import "./static/styles/main.css"

const App = () => {
    return <div>
        <Router> {/* Router Tag from import */}
            <Navbar />
            <Routes>
                <Route exact path='/' Component={Intro}></Route> {/* Navigate to '/' (From the server controller) and Load Component 'Home' from Home.jsx, Copy this Router Tag for each components*/}
                <Route exact path='/exploreRooms' Component={Rooms}></Route>
                <Route exact path='/bookings' Component={Bookings}></Route>
                <Route exact path='/loginRegister' Component={LoginRegister}></Route>
                <Route exact path='/roomInfo' Component={RoomInfo}></Route>
                <Route exact path='/paymentInfo' Component={PaymentInfo}></Route>
                <Route exact path='/showBookings' Component={ShowBookings}></Route>
            </Routes>
        </Router>
    </div>
}

export default App