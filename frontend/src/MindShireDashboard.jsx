import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const userData = {
    name: "Alex Morgan",
    enrolledCourses: 4,
    completedCourses: 2,
    totalHoursLearned: 37,
    averageScore: 92,
  };
  
  const courseProgress = [
    { id: 1, title: "Web Development Masterclass", progress: 78, lastAccessed: "2 days ago", color: "bg-blue-600" },
    { id: 2, title: "Data Science Fundamentals", progress: 45, lastAccessed: "1 week ago", color: "bg-purple-600" },
    { id: 3, title: "UX/UI Design Principles", progress: 92, lastAccessed: "Yesterday", color: "bg-indigo-600" },
    { id: 4, title: "Mobile App Development", progress: 12, lastAccessed: "3 days ago", color: "bg-pink-600" },
  ];
  
  const performanceData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 78 },
    { month: "Mar", score: 92 },
    { month: "Apr", score: 88 },
    { month: "May", score: 95 },
    { month: "Jun", score: 90 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
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
          <Link to="/dashboard" className="text-white transition duration-300">Dashboard</Link>
          <Link to="/learning" className="text-gray-300 hover:text-white transition duration-300">My Courses</Link>
          <Link to="/chat" className="text-gray-300 hover:text-white transition duration-300">Chatbot</Link>
          <Link to="/community" className="text-gray-300 hover:text-white transition duration-300">Community</Link>
          <div className="relative">
            <button className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <span className="font-medium text-sm">AM</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-800">
          <div className="flex flex-col space-y-4">
            <Link to="/dashboard" className="text-white transition duration-300">Dashboard</Link>
            <Link to="/courses" className="text-gray-300 hover:text-white transition duration-300">My Courses</Link>
            <Link to="/explore" className="text-gray-300 hover:text-white transition duration-300">Explore</Link>
            <Link to="/community" className="text-gray-300 hover:text-white transition duration-300">Community</Link>
            <Link to="/profile" className="text-gray-300 hover:text-white transition duration-300">My Profile</Link>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}!</h1>
            <p className="text-gray-400">Continue where you left off and keep improving your skills.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-300">
              Find New Courses
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-900/50 text-blue-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Enrolled Courses</p>
                <p className="text-2xl font-bold">{userData.enrolledCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-900/50 text-green-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed Courses</p>
                <p className="text-2xl font-bold">{userData.completedCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-purple-900/50 text-purple-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Hours Learned</p>
                <p className="text-2xl font-bold">{userData.totalHoursLearned}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-indigo-900/50 text-indigo-400 rounded-lg flex items-center justify-center mr-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold">{userData.averageScore}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* About MindShire Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-10">
          <h2 className="text-xl font-bold mb-4">About MindShire</h2>
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-gray-300 mb-4">
                MindShire is your personal learning hub designed to help you master new skills at your own pace. Our platform offers thousands of courses taught by industry experts across various disciplines.
              </p>
              <p className="text-gray-300">
                Track your progress, earn certificates, and connect with fellow learners to enhance your educational journey. Whether you're aiming to advance your career or explore a new hobby, MindShire is here to support your learning goals.
              </p>
            </div>
          </div>
        </div>

        {/* In Progress and Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* In Progress Courses */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">In Progress</h2>
                <Link to="/courses" className="text-indigo-400 hover:text-indigo-300 text-sm">View all courses</Link>
              </div>
              <div className="space-y-4">
                {courseProgress.map(course => (
                  <div key={course.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300">
                    <div className="flex items-start">
                      <div className={`h-10 w-10 ${course.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="font-bold text-sm">{course.id}</span>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white mb-1">{course.title}</h4>
                          <span className="text-gray-400 text-sm">{course.lastAccessed}</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-gray-600 rounded-full h-2.5">
                            <div 
                              className={`${course.color} h-2.5 rounded-full`} 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-400">Progress</span>
                            <span className="text-xs text-gray-400">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
              <h2 className="text-xl font-bold mb-6">Performance</h2>
              <div className="h-64 relative">
                {/* Performance Chart (Simplified for this example) */}
                <div className="absolute inset-0 flex items-end justify-between pb-6">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center w-8">
                      <div 
                        className="w-6 bg-indigo-600 rounded-t-sm" 
                        style={{ height: `${(item.score / 100) * 150}px` }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-2">{item.month}</span>
                    </div>
                  ))}
                </div>
                {/* Y-axis labels */}
                <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-400 pr-2">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">Your average performance over time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <Link to="/explore" className="text-indigo-400 hover:text-indigo-300 text-sm">Explore all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced JavaScript Concepts",
                instructor: "Sarah Johnson",
                level: "Advanced",
                duration: "12 hours",
                rating: 4.9,
                color: "bg-yellow-600"
              },
              {
                title: "Python for Data Analysis",
                instructor: "Mike Chen",
                level: "Intermediate",
                duration: "8 hours",
                rating: 4.7,
                color: "bg-blue-600"
              },
              {
                title: "Responsive Web Design",
                instructor: "Emma Clark",
                level: "Beginner",
                duration: "6 hours",
                rating: 4.8,
                color: "bg-pink-600"
              }
            ].map((course, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg border border-gray-700 hover:border-indigo-500 transition duration-300 overflow-hidden">
                <div className={`${course.color} h-3 w-full`}></div>
                <div className="p-5">
                  <h3 className="font-medium text-white mb-2">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Instructor: {course.instructor}</p>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-400">{course.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gray-600 hover:bg-gray-500 py-2 rounded-md text-sm font-medium transition duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-xl">MindShire</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/help" className="text-gray-400 hover:text-white transition duration-300">Help Center</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms</Link>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left">
            <p className="text-gray-500">© 2025 MindShire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;