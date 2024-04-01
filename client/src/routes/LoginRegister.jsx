import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../AuthContext'; 
import apis from '../apis';

export const LoginRegister = () => {
  const [error, setError] = useState(''); // State to store error message
  const [loginType, setLoginType] = useState('customer');
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
//   const { login } = useAuth();
  const [registerInfo, setRegisterInfo] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    fullName: '',
    city: '',
    state: '',
    streetNum: '',
    streetName: '',
    aptNum: '',
    zipcode: '',
    idType: '',
    idNum: '',
  });

  const { login, isLoggedIn, userEmail, userRole, customerID } = useAuth();

  // Logging the context values to see if they are updated
  useEffect(() => {
    console.log('Is Logged In:', isLoggedIn);
    console.log('User Email:', userEmail);
    console.log('User Role:', userRole);
    console.log('Customer ID:', customerID);
  }, [isLoggedIn, userEmail, userRole, customerID]); // Dependency array to re-run this effect whenever these values change

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleRegisterChange = (e) => {
      const { name, value } = e.target;
      setRegisterInfo({ ...registerInfo, [name]: value });
  };
  
    // const handleLoginSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:4000/api/login', loginInfo);
    //         if (response.status === 200) {
    //             login(response.data.email, response.data.role); // Use the role from the response
    //             navigate('/');
    //         } else {
    //             console.error('Login failed with status:', response.status);
    //         }
    //     } catch (err) {
    //         console.error('Login error:', err);
    //         setError(err.response?.data?.message || 'Failed to log in');
    //     }
    // };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = `/login/${loginType}`; // Use loginType in the endpoint
            const response = await apis.post(`${endpoint}`, loginInfo);
                console.log(response.data.data.id);
                login(loginInfo.email, loginType, response.data.data.id); // Optionally, handle roles if needed
                console.log('After Login - Context Values:');
                console.log('Is Logged In:', isLoggedIn);
                console.log('User Email:', userEmail);
                console.log('User Role:', userRole);
                console.log('Customer ID:', customerID);
                navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Failed to log in');
        }
    };
    


  const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      console.log('Registering new customer');
      try {
        const response = await apis.post('/register', registerInfo);
        console.log(response);
        if (response) {
          window.location.reload();
        }
      } catch (err) {
          setError(err.response?.data?.message || 'Fail to register user');
      }
  };
  return (
    <div className="container mt-5">
      <div className="row">
          <div className="col">
              <div className="card mb-3">
                  <div className="card-body">
                      <h2 className="card-title text-center">Login</h2>
                      <div className="btn-group" role="group" aria-label="User type">
                          <input type="radio" className="btn-check" name="loginType" id="customer" autoComplete="off" checked={loginType === 'customer'} onChange={() => setLoginType('customer')} />
                          <label className="btn btn-outline-secondary" htmlFor="customer">Customer</label>

                          <input type="radio" className="btn-check" name="loginType" id="employee" autoComplete="off" checked={loginType === 'employee'} onChange={() => setLoginType('employee')} />
                          <label className="btn btn-outline-secondary" htmlFor="employee">Employee</label>
                      </div>
                      <form onSubmit={handleLoginSubmit}>
                          <div className="mb-3">
                              <label htmlFor="username" className="form-label">Email</label>
                              <input type="text" className="form-control" id="username" name="email" value={loginInfo.email} onChange={handleLoginChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="password" className="form-label">Password</label>
                              <input type="password" className="form-control" id="password" name="password" value={loginInfo.password} onChange={handleLoginChange} required />
                          </div>
                          <button type="submit" className="btn btn-primary w-100">Log In</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col">
              <div className="card">
                  <div className="card-body">
                      <h2 className="card-title text-center">Register</h2>
                      <form onSubmit={handleRegisterSubmit}>
                          <div className="mb-3">
                              <label htmlFor="email" className="form-label">Email address</label>
                              <input type="email" className="form-control" id="email" name="email" value={registerInfo.email} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="registerPassword" className="form-label">Password</label>
                              <input type="password" className="form-control" id="registerPassword" name="password" value={registerInfo.password} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={registerInfo.confirmPassword} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="fullName" className="form-label">Full Name</label>
                              <input type="text" className="form-control" id="fullName" name="fullName" value={registerInfo.fullName} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="city" className="form-label">City</label>
                              <input type="text" className="form-control" id="city" name="city" value={registerInfo.city} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="state" className="form-label">State</label>
                              <input type="text" className="form-control" id="state" name="state" value={registerInfo.state} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="streetNum" className="form-label">Street Number</label>
                              <input type="text" className="form-control" id="streetNum" name="streetNum" value={registerInfo.streetNum} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="streetName" className="form-label">Street Name</label>
                              <input type="text" className="form-control" id="streetName" name="streetName" value={registerInfo.streetName} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="aptNum" className="form-label">Apartment Number</label>
                              <input type="text" className="form-control" id="aptNum" name="aptNum" value={registerInfo.aptNum} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="zipcode" className="form-label">Zipcode</label>
                              <input type="text" className="form-control" id="zipcode" name="zipcode" value={registerInfo.zipcode} onChange={handleRegisterChange} required />
                          </div>
                          <div className="mb-3">
                              <label htmlFor="idType" className="form-label">ID Type</label>
                              <select className="form-control" id="idType" name="idType" value={registerInfo.idType} onChange={handleRegisterChange} required >
                                <option value="Passport">Passport</option>
                                <option value="Driving License">Driving License</option>
                              </select>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="idNum" className="form-label">ID Number</label>
                              <input type="text" className="form-control" id="idNum" name="idNum" value={registerInfo.idNum} onChange={handleRegisterChange} required />
                          </div>
                          <button type="submit" className="btn btn-success w-100">Register</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default LoginRegister
