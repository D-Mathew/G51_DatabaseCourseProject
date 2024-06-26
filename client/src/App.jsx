import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Rooms from './routes/Rooms.jsx'
import Bookings from './routes/Bookings.jsx'
import Home from './routes/Home.jsx'
import LoginRegister from './routes/LoginRegister.jsx'
import PaymentInfo from './routes/PaymentInfo.jsx'
import ShowBookings from './routes/ShowBookings.jsx'
import BookingDetailsPage from './routes/BookingDetailsPage.jsx'
import EmployeeSearchPage from './routes/EmployeeSearchPage.jsx'
import Profile from './routes/Profile.jsx'
import "./static/styles/main.css"
import Hotels from './routes/Hotels.jsx'
import { AuthProvider } from './AuthContext.js';
import { DateProvider } from './DateContext.js'



const App = () => {
    return <div>
        <AuthProvider>
            <DateProvider>
                <Router> {/* Router Tag from import */}
                    <Navbar />
                    <Routes>
                        <Route exact path='/' Component={Home}></Route> {/* Navigate to '/' (From the server controller) and Load Component 'Home' from Home.jsx, Copy this Router Tag for each components*/}
                        <Route exact path='/home' Component={Home}></Route> 
                        <Route exact path='/loginRegister' Component={LoginRegister}></Route>
                        <Route exact path='/hotels' Component={Hotels}></Route>
                        <Route exact path='/hotels/:id' Component={Rooms}></Route>
                        <Route exact path='/bookings' Component={Bookings}></Route>
                        <Route exact path='/paymentInfo/:id' Component={PaymentInfo}></Route>
                        <Route exact path='/showBookings' Component={ShowBookings}></Route>
                        <Route exact path='/booking/:bookingId' Component={BookingDetailsPage}></Route>
                        <Route exact path='/employeeSearchPage' Component={EmployeeSearchPage}></Route>
                    </Routes>
                </Router>
            </DateProvider>
        </AuthProvider>
    </div>
}

export default App