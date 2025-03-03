import React, { useState } from "react";

const LoginSignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add your login logic here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup attempted with:", { name, email, age, grade, password, confirmPassword });
    // Add your signup logic here
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
        maxWidth: "64rem",
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
                onClick={() => setActiveTab("login")}
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
                onClick={() => setActiveTab("signup")}
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
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      color: "#FFFFFF",
                      backgroundColor: "#2563EB",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer"
                    }} 
                    className="sign-in-button"
                  >
                    Sign in
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
                    <label htmlFor="age" style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.25rem"
                    }}>
                      Age
                    </label>
                    <input
                      id="age"
                      type="number"
                      required
                      min="1"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        color: "#374151",
                        border: "1px solid #D1D5DB",
                        borderRadius: "0.375rem",
                        outline: "none",
                        marginTop: "0.25rem"
                      }}
                      placeholder="Age"
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
                    <select
                      id="grade"
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
                    >
                      <option value="" disabled>Select Grade</option>
                      <option value="K">Kindergarten</option>
                      <option value="1">1st Grade</option>
                      <option value="2">2nd Grade</option>
                      <option value="3">3rd Grade</option>
                      <option value="4">4th Grade</option>
                      <option value="5">5th Grade</option>
                      <option value="6">6th Grade</option>
                      <option value="7">7th Grade</option>
                      <option value="8">8th Grade</option>
                      <option value="9">9th Grade</option>
                      <option value="10">10th Grade</option>
                      <option value="11">11th Grade</option>
                      <option value="12">12th Grade</option>
                      <option value="college">College</option>
                      <option value="other">Other</option>
                    </select>
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
                    style={{
                      width: "100%",
                      padding: "0.5rem 1rem",
                      color: "#FFFFFF",
                      backgroundColor: "#2563EB",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer"
                    }}
                    className="create-account-button"
                  >
                    Create Account
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