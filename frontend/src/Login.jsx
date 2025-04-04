import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PIC5 from './assets/PIC5.png';
import API_URL from "./apiConfig";


const AuthPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: '',
    grade: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Reset form fields when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: '',
      grade: '',
    });
    setErrorMessage("");
  };

  // Validate login form
  const validateLoginForm = () => {
    // Reset previous error
    setErrorMessage("");
    
    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!formData.password) {
      setErrorMessage("Password is required.");
      return false;
    }
    
    return true;
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!validateLoginForm()) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);
        
        // Store the token in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          
          // Store user email in localStorage if remember me is checked
          if (rememberMe) {
            localStorage.setItem('userEmail', formData.email);
          } else {
            localStorage.removeItem('userEmail');
          }
        }
        
        // Redirect to dashboard
        navigate("/dashboard");
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

  // Validate signup form
  const validateSignupForm = () => {
    // Reset previous error
    setErrorMessage("");
    
    // Check for empty fields
    if (!formData.name.trim()) {
      setErrorMessage("Name is required.");
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    
    if (!formData.role?.trim()) {
      setErrorMessage("Role is required.");
      return false;
    }
    
    if (!formData.grade) {
      setErrorMessage("Grade is required.");
      return false;
    }
    
    if (isNaN(parseInt(formData.grade))) {
      setErrorMessage("Grade must be a valid number.");
      return false;
    }
    
    if (!formData.password) {
      setErrorMessage("Password is required.");
      return false;
    }
    
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    
    return true;
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!validateSignupForm()) {
      return;
    }
  
    try {
      setIsLoading(true);
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: formData.role.trim(),
          grade: parseInt(formData.grade),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Clear form and show success message
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          role: '',
          grade: '',
        });
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

  // Handle form submission based on active tab
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation Bar */}
      <nav className="py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-xl">M</span>
          </div>
          <span className="font-bold text-xl">MindShire</span>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-800">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300 w-full"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Split Content Section */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Image Section */}
        <div className="md:w-1/2 bg-indigo-900 flex items-center justify-center p-8">
          <div className="max-w-md">
            <div className="relative">
              <div className="absolute -top-10 -left-10 h-64 w-64 bg-indigo-600/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 h-64 w-64 bg-purple-600/30 rounded-full blur-3xl"></div>

              {/* Image Section */}
              <div className="relative z-10">
                <img 
                  src={PIC5} 
                  alt="EduLearn Banner" 
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Auth Form */}
        <div className="md:w-1/2 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 relative">
              {/* Background effects */}
              <div className="absolute -top-6 -left-6 h-40 w-40 bg-indigo-900/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 h-40 w-40 bg-purple-900/30 rounded-full blur-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Tabs */}
                <div className="flex mb-8 bg-gray-700 rounded-lg p-1">
                  <button 
                    className={`flex-1 py-2 rounded-md transition-all duration-200 ${activeTab === 'login' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                    onClick={() => handleTabChange('login')}
                    type="button"
                  >
                    Login
                  </button>
                  <button 
                    className={`flex-1 py-2 rounded-md transition-all duration-200 ${activeTab === 'signup' ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:text-white'}`}
                    onClick={() => handleTabChange('signup')}
                    type="button"
                  >
                    Sign Up
                  </button>
                </div>

                {/* Error message */}
                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {activeTab === 'signup' && (
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        placeholder="John Doe"
                        required={activeTab === 'signup'}
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {activeTab === 'signup' && (
                    <>
                      <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-300 mb-2 text-sm">Role</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                          placeholder="Student/Teacher"
                          required={activeTab === 'signup'}
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="grade" className="block text-gray-300 mb-2 text-sm">Grade</label>
                        <input
                          type="text"
                          id="grade"
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                          placeholder="Enter grade (e.g. 10)"
                          required={activeTab === 'signup'}
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 mb-2 text-sm">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                      placeholder={activeTab === 'login' ? "Enter your password" : "Create a strong password"}
                      required
                    />
                  </div>

                  {activeTab === 'signup' && (
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                        placeholder="Confirm your password"
                        required={activeTab === 'signup'}
                      />
                    </div>
                  )}

                  {activeTab === 'login' && (
                    <div className="flex items-center justify-between mb-6 mt-5">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded bg-gray-700"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
                          Remember me
                        </label>
                      </div>
                      <div className="text-sm">
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 transition duration-200">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-4 transition duration-300 font-medium ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>Processing...</span>
                    ) : (
                      <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                    )}
                  </button>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <button
                      type="button"
                      className="py-2.5 px-4 border border-gray-600 rounded-lg flex justify-center items-center hover:bg-gray-700 transition duration-200"
                    >
                      {/* Google Icon */}
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.72 17.54V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                        <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.72 17.54C14.75 18.19 13.48 18.59 12 18.59C9.05 18.59 6.57 16.64 5.7 13.97H2.03V16.84C3.84 20.44 7.62 23 12 23Z" fill="#34A853"/>
                        <path d="M5.7 13.97C5.47 13.31 5.34 12.6 5.34 11.86C5.34 11.12 5.47 10.41 5.7 9.75V6.88H2.03C1.25 8.38 0.82 10.07 0.82 11.86C0.82 13.65 1.25 15.34 2.03 16.84L5.7 13.97Z" fill="#FBBC05"/>
                        <path d="M12 5.13C13.62 5.13 15.07 5.7 16.21 6.76L19.36 3.61C17.46 1.89 14.97 0.82 12 0.82C7.62 0.82 3.84 3.38 2.03 6.98L5.7 9.85C6.57 7.18 9.05 5.13 12 5.13Z" fill="#EA4335"/>
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-4 border border-gray-600 rounded-lg flex justify-center items-center hover:bg-gray-700 transition duration-200"
                    >
                      {/* GitHub Icon */}
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
                      </svg>
                      GitHub
                    </button>
                  </div>
                </div>

                {/* Footer text */}
                <p className="mt-8 text-center text-sm text-gray-400">
                  {activeTab === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => handleTabChange('signup')}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => handleTabChange('login')}
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-200"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;