import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import Sidebar from "../sidebar/sidebar"; // Assuming you have a Sidebar component
import { AuthContext } from "../../context/auth";

const apiurl = process.env.REACT_APP_API_URL;

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    googleId: null,
  });
  const { user } = useContext(AuthContext); // Assuming AuthContext provides the user
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to home if user is null
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/users/${user._id}`);
        setUserDetails(res.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user details");
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.put(`${apiurl}/api/users/${user._id}`, userDetails, {
        withCredentials: true, // Include cookies in the request
      });
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update user details");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            color: "#A27707",
            backgroundColor: "#FFFFFF",
            padding: "2rem",
            flexGrow: 1,
          }}
        >
          <h2>Account Details</h2>
          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "4rem", // Increased padding
              border: "2px solid #A27707",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              color: "#A27707",
              width: "60%",
              marginBottom: "2rem", // Increased margin-bottom
            }}
            onSubmit={handleSave}
          >
            <label
              htmlFor="name"
              style={{ textAlign: "left", padding: "1rem 0" }} // Increased padding
            >
              Name
            </label>
            <input
              value={userDetails.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              id="name"
              name="name"
              disabled={!isEditing}
              style={{
                margin: "1rem 0", // Increased margin
                padding: "1.5rem", // Increased padding
                border: "2px solid #A27707",
                borderRadius: "10px",
                backgroundColor: isEditing ? "#FFFFFF" : "#E0E0E0",
                color: "#A27707",
                fontSize: "1rem",
              }}
            />
            <label
              htmlFor="email"
              style={{ textAlign: "left", padding: "1rem 0" }} // Increased padding
            >
              Email
            </label>
            <input
              value={userDetails.email}
              onChange={handleChange}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              disabled={!isEditing}
              style={{
                margin: "1rem 0", // Increased margin
                padding: "1.5rem", // Increased padding
                border: "2px solid #A27707",
                borderRadius: "10px",
                backgroundColor: isEditing ? "#FFFFFF" : "#E0E0E0",
                color: "#A27707",
                fontSize: "1rem",
              }}
            />
            {userDetails.googleId ? (
              <div style={{ margin: "1rem 0", color: "#A27707" }}>
                Go to your Google account to change details
              </div>
            ) : (
              <>
                <label
                  htmlFor="password"
                  style={{ textAlign: "left", padding: "1rem 0" }} // Increased padding
                >
                  Password
                </label>
                <input
                  value={userDetails.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                  disabled={!isEditing}
                  style={{
                    margin: "1rem 0", // Increased margin
                    padding: "1.5rem", // Increased padding
                    border: "2px solid #A27707",
                    borderRadius: "10px",
                    backgroundColor: isEditing ? "#FFFFFF" : "#E0E0E0",
                    color: "#A27707",
                    fontSize: "1rem",
                  }}
                />
                {isEditing && (
                  <>
                    <label
                      htmlFor="confirmPassword"
                      style={{ textAlign: "left", padding: "1rem 0" }} // Increased padding
                    >
                      Confirm Password
                    </label>
                    <input
                      value={userDetails.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="********"
                      id="confirmPassword"
                      name="confirmPassword"
                      style={{
                        margin: "1rem 0", // Increased margin
                        padding: "1.5rem", // Increased padding
                        border: "2px solid #A27707",
                        borderRadius: "10px",
                        backgroundColor: "#FFFFFF",
                        color: "#A27707",
                        fontSize: "1rem",
                      }}
                    />
                  </>
                )}
              </>
            )}
            {isEditing && (
              <button
                type="submit"
                style={{
                  margin: "1rem 0",
                  padding: "1.5rem", // Increased padding
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#A27707",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Save
              </button>
            )}
          </form>
          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              style={{
                margin: "1rem 0",
                padding: "1.5rem", // Increased padding
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#A27707",
                color: "#FFFFFF",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;