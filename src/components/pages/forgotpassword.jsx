import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";

const apiurl = process.env.REACT_APP_API_URL;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending request with email:", email);
            const response = await axios.post(`${apiurl}/api/auth/forgot-password`, { email });
            console.log("Password reset email sent:", response.data);
            navigate("/");  // Redirect on successful request
        } catch (error) {
            console.error("Password reset request failed:", error.response ? error.response.data : error.message);
        }
    };

    const isFormValid = email;

    return (
        <div>
            <Navbar />
            <div style={{ textAlign: 'center', display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', color: '#A27707', backgroundColor: '#FFFFFF' }}>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '5rem', border: '2px solid #A27707', borderRadius: '10px', margin: '0.5rem', width: '500px', ...(window.innerWidth < 600 && { padding: '1rem', border: 'none', width: '100%' }) }}>
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="email" style={{ textAlign: 'left', padding: '0.25rem 0' }}>Email</label>
                        <input
                            value={email}
                            onChange={handleChange}
                            type="email"
                            placeholder="youremail@gmail.com"
                            id="email"
                            name="email"
                            style={{ margin: '0.5rem 0', padding: '1rem', border: '2px solid #A27707', borderRadius: '10px', backgroundColor: '#FFFFFF', color: '#A27707' }}
                        />
                        <button
                            disabled={!isFormValid}
                            type="submit"
                            style={{ margin: '1rem 0', padding: '1rem', border: 'none', borderRadius: '10px', backgroundColor: '#A27707', color: '#FFFFFF', cursor: 'pointer' }}
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;