import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ChatbotHelpPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', text: 'Hello! I\'m MindShire Assistant. How can I help you with your studies today?', subject: 'general' },
    { type: 'bot', text: 'You can ask me questions about Math, Science, History, Literature, or any other subject you\'re studying.', subject: 'general' }
  ]);
  const [activeSubject, setActiveSubject] = useState('all');
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  // Scroll to bottom of chat whenever history changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const subjects = [
    { id: 'all', name: 'All Subjects', icon: '📚' },
    { id: 'math', name: 'Mathematics', icon: '🔢' },
    { id: 'science', name: 'Science', icon: '🧪' },
    { id: 'history', name: 'History', icon: '📜' },
    { id: 'literature', name: 'Literature', icon: '📖' },
    { id: 'programming', name: 'Programming', icon: '💻' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
  
    // Store the user's input in a variable named 'question'
    const question = message.trim();
  
    // Add user message to chat
    setChatHistory([...chatHistory, { type: 'user', text: question }]);
  
    try {
      // Send request to backend
      const response = await fetch(`${API_URL}/api/ChatController/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // Send 'question' instead of 'message'
      });
  
      const data = await response.json();
      
      
      // Add bot response to chat history
      setChatHistory(prev => [...prev, { type: 'bot', text: data.data.explanation, subject: data.data.example || 'general' }]);
      console.log(data.data.example);
      console.log(data.data.explanation);
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      setChatHistory(prev => [...prev, { type: 'bot', text: 'Sorry, I am having trouble responding at the moment.', subject: 'error' }]);
    }
  
    setMessage('');
  };
  

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'math': return 'bg-blue-600';
      case 'science': return 'bg-green-600';
      case 'history': return 'bg-amber-600';
      case 'literature': return 'bg-purple-600';
      case 'programming': return 'bg-red-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navigation */}
      <nav className="py-4 px-6 md:px-12 flex items-center justify-between bg-gray-800 border-b border-gray-700">
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
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
          <Link to="/learning" className="text-gray-300 hover:text-white transition duration-300">Courses</Link>
          <Link to="/chatbot" className="text-indigo-400 hover:text-indigo-300 transition duration-300">Chatbot</Link>
          <Link to="/resources" className="text-gray-300 hover:text-white transition duration-300">Resources</Link>
          <div className="relative">
            <img src="/api/placeholder/32/32" alt="User" className="h-8 w-8 rounded-full bg-gray-600" />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-800 border-b border-gray-700">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link to="/courses" className="text-gray-300 hover:text-white transition duration-300">Courses</Link>
            <Link to="/chatbot" className="text-indigo-400 hover:text-indigo-300 transition duration-300">Chatbot</Link>
            <Link to="/resources" className="text-gray-300 hover:text-white transition duration-300">Resources</Link>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Study Assistant</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search topics..." 
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600"
              />
              <svg className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="px-4 py-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Subjects</h3>
            <div className="space-y-1">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`flex items-center px-3 py-2 rounded-lg w-full text-left transition duration-300 ${
                    activeSubject === subject.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                  onClick={() => setActiveSubject(subject.id)}
                >
                  <span className="mr-3">{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="px-4 py-2 mt-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Quick Links</h3>
            <div className="space-y-1">
              <button className="flex items-center px-3 py-2 rounded-lg w-full text-left text-gray-300 hover:bg-gray-700/50 hover:text-white transition duration-300">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Learning Resources</span>
              </button>
              <button className="flex items-center px-3 py-2 rounded-lg w-full text-left text-gray-300 hover:bg-gray-700/50 hover:text-white transition duration-300">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Practice Questions</span>
              </button>
              <button className="flex items-center px-3 py-2 rounded-lg w-full text-left text-gray-300 hover:bg-gray-700/50 hover:text-white transition duration-300">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Study Reminders</span>
              </button>
              <button className="flex items-center px-3 py-2 rounded-lg w-full text-left text-gray-300 hover:bg-gray-700/50 hover:text-white transition duration-300">
                <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>My Saved Responses</span>
              </button>
            </div>
          </div>
          
          <div className="mt-auto p-4 border-t border-gray-700">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Need more help?</h3>
              <p className="text-gray-300 text-sm mb-3">Connect with a live tutor for personalized assistance.</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 rounded-lg text-sm font-medium transition duration-300">
                Connect with Tutor
              </button>
            </div>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-lg">MindShire Assistant</h2>
                <p className="text-gray-400 text-sm">Online • Quick responses</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-700 transition duration-300">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition duration-300">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-900 space-y-4">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-2xl px-4 py-3 ${
                    chat.type === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-gray-800 text-white rounded-bl-none border border-gray-700'
                  }`}
                >
                  {chat.type === 'bot' && chat.subject !== 'general' && (
                    <div className={`text-xs font-semibold mb-1 ${getSubjectColor(chat.subject)} bg-opacity-30 inline-block px-2 py-0.5 rounded`}>
                      {chat.subject.charAt(0).toUpperCase() + chat.subject.slice(1)}
                    </div>
                  )}
                  <p>{chat.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <button 
                type="button" 
                className="bg-gray-700 hover:bg-gray-600 transition duration-300 p-2 rounded-full flex-shrink-0"
              >
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 p-2 rounded-full flex-shrink-0"
              >
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>Try asking about math problems, scientific concepts, or historical events</span>
              <button className="hover:text-gray-300 transition duration-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar with additional resources - only visible on larger screens */}
        <div className="hidden lg:flex flex-col w-72 bg-gray-800 border-l border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold text-lg">Study Resources</h3>
          </div>
          
          <div className="p-4 space-y-4 overflow-y-auto">
            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2">Recent Topics</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-blue-400">•</span>
                  <a href="#" className="text-gray-300 hover:text-white">Quadratic Equations</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-400">•</span>
                  <a href="#" className="text-gray-300 hover:text-white">Chemical Reactions</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-amber-400">•</span>
                  <a href="#" className="text-gray-300 hover:text-white">World War II</a>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold mb-2">Suggested Materials</h4>
              <div className="space-y-3">
                <a href="#" className="block bg-gray-800 p-3 rounded border border-gray-700 hover:border-indigo-500 transition duration-300">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-white">Video Tutorial</h5>
                      <p className="text-xs text-gray-400">Understanding Derivatives</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="block bg-gray-800 p-3 rounded border border-gray-700 hover:border-indigo-500 transition duration-300">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-white">Study Guide</h5>
                      <p className="text-xs text-gray-400">Literature Analysis</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="block bg-gray-800 p-3 rounded border border-gray-700 hover:border-indigo-500 transition duration-300">
                  <div className="flex items-center">
                    <svg className="h-8 w-8 text-indigo-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <h5 className="font-medium text-white">Practice Exercises</h5>
                      <p className="text-xs text-gray-400">Physics Problems</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-white/10 rounded-full"></div>
              <div className="relative z-10">
                <h4 className="font-semibold mb-2">Upgrade to Pro</h4>
                <p className="text-sm text-indigo-200 mb-3">Get unlimited access to tutors, practice tests, and more.</p>
                <button className="bg-white text-indigo-900 hover:bg-indigo-100 w-full py-2 rounded-lg text-sm font-medium transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotHelpPage;