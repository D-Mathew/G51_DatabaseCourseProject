import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import loginicon from "../static//images/login-icon.png"
import '../static/styles/navbar.css'

const Navbar = () => {
    return (
        <nav>
            {/* <img id="hotel" src={tennislogo} alt="" /> */}
            <Link to="/" className='navlink'>Home</Link>
            <Link to="/bookings" className='navlink'>Bookings</Link>
            <Link to="/abouts" className='navlink'>About Us</Link>
            <Link to="/loginRegister" className='navlink login'>Login/Signup</Link>
            <img id="loginicon" src={loginicon} alt="" />
        </nav>
    );
};

export default Navbar;