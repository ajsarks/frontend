import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import Sidebar from "../sidebar/sidebar";
import { AuthContext } from "../../context/auth";
import useFetch from "../../hooks/useFetch"; // Import the useFetch hook

const apiurl = process.env.REACT_APP_API_URL;

const AccountDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Use the useFetch hook to fetch user details
  const { data: userDetails, loading, error: fetchError, reFetch } = useFetch(
    user ? `${apiurl}/api/users/${user._id}` : null
  );

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  // Update formData when userDetails are fetched
  React.useEffect(() => {
    if (userDetails) {
      setFormData({
        email: userDetails.email || "",
        name: userDetails.name || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userDetails]);

  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.put(`${apiurl}/api/users/${user._id}`, formData, {
        withCredentials: true,
      });
      setIsEditing(false);
      reFetch(); // Refetch user details after update
    } catch (err) {
      setError("Failed to update user details");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError.message}</div>;
  }

  if (!userDetails) {
    return <div>No user details available</div>;
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
              padding: "4rem",
              border: "2px solid #A27707",
              borderRadius: "10px",
              backgroundColor: "#FFFFFF",
              color: "#A27707",
              width: "60%",
              marginBottom: "2rem",
            }}
            onSubmit={handleSave}
          >
            <label
              htmlFor="name"
              style={{ textAlign: "left", padding: "1rem 0" }}
            >
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              id="name"
              name="name"
              disabled={!isEditing}
              style={{
                margin: "1rem 0",
                padding: "1.5rem",
                border: "2px solid #A27707",
                borderRadius: "10px",
                backgroundColor: isEditing ? "#FFFFFF" : "#E0E0E0",
                color: "#A27707",
                fontSize: "1rem",
              }}
            />
            <label
              htmlFor="email"
              style={{ textAlign: "left", padding: "1rem 0" }}
            >
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              disabled={!isEditing}
              style={{
                margin: "1rem 0",
                padding: "1.5rem",
                border: "2px solid #A27707",
                borderRadius: "10px",
                backgroundColor: isEditing ? "#FFFFFF" : "#E0E0E0",
                color: "#A27707",
                fontSize: "1rem",
              }}
            />
            {userDetails && userDetails.googleId ? (
              <div style={{ margin: "1rem 0", color: "#A27707" }}>
                Go to your Google account to change details
              </div>
            ) : (
              <>
                <label
                  htmlFor="password"
                  style={{ textAlign: "left", padding: "1rem 0" }}
                >
                  Password
                </label>
                <input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="********"
                  id="password"
                  name="password"
                  disabled={!isEditing}
                  style={{
                    margin: "1rem 0",
                    padding: "1.5rem",
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
                      style={{ textAlign: "left", padding: "1rem 0" }}
                    >
                      Confirm Password
                    </label>
                    <input
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      type="password"
                      placeholder="********"
                      id="confirmPassword"
                      name="confirmPassword"
                      style={{
                        margin: "1rem 0",
                        padding: "1.5rem",
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
                  padding: "1.5rem",
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
                padding: "1.5rem",
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