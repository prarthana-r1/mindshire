import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const LoginSignupPage = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [grade, setGrade] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Reset form fields when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setName("");
    setRole("");
    setGrade("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  const validateLoginForm = () => {
    // Reset previous error
    setErrorMessage("");
    
    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }
    
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!validateLoginForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);
        
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        // Redirect to dashboard or home page
        alert("Login successful!");
        navigate("/dashboard") // Uncomment to redirect
      } else {
        // Display error from server
        setErrorMessage(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateSignupForm = () => {
    // Reset previous error
    setErrorMessage("");
    
    // Check for empty fields
    if (!name.trim()) {
      setErrorMessage("Name is required.");
      return false;
    }
    
    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!role.trim()) {
      setErrorMessage("Role is required.");
      return false;
    }
    
    if (!grade) {
      setErrorMessage("Grade is required.");
      return false;
    }
    
    if (isNaN(parseInt(grade))) {
      setErrorMessage("Grade must be a valid number.");
      return false;
    }
    
    if (!password) {
      setErrorMessage("Password is required.");
      return false;
    }
    
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!validateSignupForm()) {
      return;
    }
  
    try {
      setIsLoading(true);
      
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role: role.trim(),
          grade: parseInt(grade),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Clear form and show success message
        setName("");
        setEmail("");
        setRole("");
        setGrade("");
        setPassword("");
        setConfirmPassword("");
        alert("Signup successful! Please log in.");
        handleTabChange("login"); // Switch to login tab after signup
      } else {
        // Display error from server
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#EBF5FF"
    }}>
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "30rem", 
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}>
        {/* Image Section */}
        <div style={{
          display: "none",
          width: "50%",
          backgroundColor: "#2563EB",
          "@media (min-width: 768px)": {
            display: "block"
          }
        }} className="image-section">
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}>
            <img 
              src="/api/placeholder/500/600" 
              alt="Login illustration" 
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        </div>
        
        {/* Form Section */}
        <div style={{
          width: "100%",
          padding: "2rem",
          "@media (min-width: 768px)": {
            width: "50%"
          }
        }} className="form-section">
          <div style={{
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "1.875rem",
              fontWeight: "800",
              color: "#2563EB"
            }}>Welcome</h2>
            <p style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#4B5563"
            }}>Please login or create an account</p>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            {/* Tabs */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
              border: "1px solid #D1D5DB",
              borderRadius: "0.375rem",
              overflow: "hidden"
            }}>
              <button 
                onClick={() => handleTabChange("login")}
                style={{
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                  backgroundColor: activeTab === "login" ? "#2563EB" : "#FFFFFF",
                  color: activeTab === "login" ? "#FFFFFF" : "#4B5563",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Login
              </button>
              <button 
                onClick={() => handleTabChange("signup")}
                style={{
                  padding: "0.5rem",
                  fontSize: "0.875rem",
                  backgroundColor: activeTab === "signup" ? "#2563EB" : "#FFFFFF",
                  color: activeTab === "signup" ? "#FFFFFF" : "#4B5563",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                Sign Up
              </button>
            </div>
            
            {/* Error Message Display */}
            {errorMessage && (
              <div style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: "#FEE2E2",
                color: "#B91C1C",
                borderRadius: "0.375rem",
                fontSize: "0.875rem"
              }}>
                {errorMessage}
              </div>
            )}
            
            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="email" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Email"
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="password" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Password"
                  />
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center"
                  }}>
                    <input
                      id="remember-me"
                      type="checkbox"
                      style={{
                        width: "1rem",
                        height: "1rem",
                        color: "#2563EB",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.25rem"
                      }}
                    />
                    <label htmlFor="remember-me" style={{
                      display: "block",
                      marginLeft: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#374151"
                    }}>
                      Remember me
                    </label>
                  </div>

                  <div style={{ fontSize: "0.875rem" }}>
                    <a href="#" style={{
                      fontWeight: "500",
                      color: "#2563EB",
                      textDecoration: "none"
                    }} className="forgot-password">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      color: "#FFFFFF",
                      backgroundColor: isLoading ? "#93C5FD" : "#2563EB",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: isLoading ? "not-allowed" : "pointer"
                    }} 
                    className="sign-in-button"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignup} style={{ marginTop: "1.5rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="name" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Full name"
                  />
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem"
                }}>
                  <div>
                    <label htmlFor="role" style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.25rem"
                    }}>
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        color: "#374151",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        outline: "none",
                        marginTop: "0.25rem"
                      }}
                      placeholder="Role"
                    />
                  </div>
                  <div>
                    <label htmlFor="grade" style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.25rem"
                    }}>
                      Grade
                    </label>
                    <input
                      id="grade"
                      type="number"
                      required
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        color: "#374151",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        outline: "none",
                        marginTop: "0.25rem",
                        backgroundColor: "#FFFFFF"
                      }}
                      placeholder="Grade"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="signup-email" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Email address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Email"
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="signup-password" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Password"
                  />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="confirm-password" style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.25rem"
                  }}>
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem 0.75rem",
                      color: "#374151",
                      border: "1px solid #D1D5DB",
                      borderRadius: "0.375rem",
                      outline: "none",
                      marginTop: "0.25rem"
                    }}
                    placeholder="Confirm Password"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      color: "#FFFFFF",
                      backgroundColor: isLoading ? "#93C5FD" : "#2563EB",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: isLoading ? "not-allowed" : "pointer"
                    }}
                    className="create-account-button"
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-section {
          display: none;
        }
        
        @media (min-width: 768px) {
          .image-section {
            display: block;
          }
          
          .form-section {
            width: 50%;
          }
        }
        
        .sign-in-button:hover, .create-account-button:hover {
          background-color: #1D4ED8;
        }
        
        .forgot-password:hover {
          color: #1D4ED8;
        }
      `}</style>
    </div>
  );
};

export default LoginSignupPage;