import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import { AuthContext } from "../../context/auth";

const apiurl = process.env.REACT_APP_API_URL;

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    name: "",
  });
  const [registerSuccess, setRegisterSuccess] = useState(false); // State to manage register success message
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false); // State to manage Google sign-up

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      dispatch({ type: "REGISTER_FAILURE", payload: { message: "Passwords do not match" } });
      return;
    }
    dispatch({ type: "REGISTER_START" }); 
    try {
      const res = await axios.post(`${apiurl}/api/auth/register`, credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      setRegisterSuccess(true); // Set registerSuccess to true
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      dispatch({ type: "REGISTER_FAILURE", payload: { message: errorMessage } });
    }
  };

  const handleGoogleSignUp = () => {
    setIsGoogleSignUp(true); // Set isGoogleSignUp to true
    window.location.href = `${apiurl}/api/auth/google`; // Ensure this points to your backend
  };

  useEffect(() => {
    if (registerSuccess) {
      setTimeout(() => {
        navigate("/login"); // Redirect to login after 1 second
      }, 1000);
    } else if (isGoogleSignUp) {
      setTimeout(() => {
        navigate("/"); // Redirect to home after 1 second
      }, 1000);
    }
  }, [registerSuccess, isGoogleSignUp, navigate]);

  const googleButtonStyles = {
    transition: 'background-color .3s, box-shadow .3s',
    padding: '12px 16px 12px 42px',
    border: 'none',
    borderRadius: '3px',
    boxShadow: '0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)',
    color: '#757575',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNIDEgMTAgNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=)',
    backgroundColor: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '12px 11px',
    cursor: 'pointer',
    marginBottom: '15px',
    display: 'inline-block',
  };

  const linkStyles = {
    color: 'black',
    textDecoration: 'none',
    margin: '0.5rem 0',
  };

  const isFormValid = credentials.name && credentials.email && credentials.password && credentials.confirmPassword;

  return (
    <div>
      <Navbar />
      <div style={{
        textAlign: 'center',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#A27707',
        backgroundColor: '#FFFFFF',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5rem',
          border: '2px solid #A27707',
          borderRadius: '10px',
          margin: '0.5rem',
          width: '500px',
          ...(window.innerWidth < 600 ? { padding: '1rem', border: 'none', width: '100%' } : {}),
        }}>
          <h2>Register</h2>
          {registerSuccess ? (
            <div style={{ color: 'green', marginBottom: '1rem' }}>Sign up successful! Redirecting to login...</div>
          ) : isGoogleSignUp ? (
            <div style={{ color: 'green', marginBottom: '1rem' }}>Sign up successful! Redirecting to home...</div>
          ) : (
            <form style={{
              display: 'flex',
              flexDirection: 'column',
            }} onSubmit={handleSubmit}>
              <label htmlFor="name" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Name</label>
              <input
                value={credentials.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                id="name"
                name="name"
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '2px solid #A27707',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#A27707',
                }}
              />
              <label htmlFor="email" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Email</label>
              <input
                value={credentials.email}
                onChange={handleChange}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '2px solid #A27707',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#A27707',
                }}
              />
              <label htmlFor="password" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Password</label>
              <input
                value={credentials.password}
                onChange={handleChange}
                type="password"
                placeholder="********"
                id="password"
                name="password"
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '2px solid #A27707',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#A27707',
                }}
              />
              <label htmlFor="confirmPassword" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Confirm Password</label>
              <input
                value={credentials.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="********"
                id="confirmPassword"
                name="confirmPassword"
                style={{
                  margin: '0.5rem 0',
                  padding: '1rem',
                  border: '2px solid #A27707',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#A27707',
                }}
              />
              <button
                type="submit"
                disabled={!isFormValid}
                style={{
                  margin: '1rem 0',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: '#A27707',
                  color: '#FFFFFF',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                }}
              >
                Register
              </button>
              {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error.message}</div>}
            </form>
          )}
          <button style={googleButtonStyles} onClick={handleGoogleSignUp}>
            Sign up with Google
          </button>
          <a href="/login" style={linkStyles}>Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
