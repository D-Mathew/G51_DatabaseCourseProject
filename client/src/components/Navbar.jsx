import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import loginicon from "../static//images/login-icon.png"
import { useAuth } from '../AuthContext'; 
import '../static/styles/navbar.css'

const Navbar = () => {
    const { isLoggedIn, userEmail, userRole, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Logout function from AuthContext
        navigate('/home');
        // Add any additional logout logic here, e.g., redirecting the user
    };

    // return (
    //     <nav>
    //         {/* <img id="hotel" src={tennislogo} alt="" /> */}
    //         <Link to="/" className='navlink'>Home</Link>
    //         <Link to="/bookings" className='navlink'>Bookings</Link>
    //         <Link to="/abouts" className='navlink'>About Us</Link>
    //         {
    //             isLoggedIn ? (
    //                 <div className="navlink login">
    //                 <div className="dropdown">
    //                 <button className="dropbtn">{userEmail} <img id="loginicon" src={loginicon} alt="" /></button>
    //                 <div className="dropdown-content">
    //                     <Link to="/profile">Edit Profile</Link>
    //                     <button onClick={handleLogout}>Logout</button>
    //                 </div>
    //             </div>
    //             </div>
    //             ) : (
    //                 <Link to="/loginRegister" className='navlink login'>Login/Signup</Link>
    //             )
    //         }
    //     </nav>
    return (
        <nav>
            <Link to="/home" className='navlink'>Home</Link>
            {isLoggedIn && userRole === 'employee' && <Link to="/employeeSearchPage" className='navlink'>Customer Bookings</Link>}
            {isLoggedIn && userRole === 'customer' && <Link to="/bookings" className='navlink'>Customer Bookings</Link>}
            <Link to="/abouts" className='navlink'>About Us</Link>
            {
                isLoggedIn ? (
                    <div className="navlink login">
                    <div className="dropdown">
                        <button className="dropbtn">{userEmail} <img id="loginicon" src={loginicon} alt="" /></button>
                        <div className="dropdown-content">
                            <Link to={userRole === 'customer' ? "/customerProfile" : "/employeeProfile"}>Edit Profile</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    </div>
                ) : (
                    <Link to="/loginRegister" className='navlink login'>Login/Signup</Link>
                )
            }
        </nav>
    );
};

export default Navbar;