import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PIC2 from './assets/PIC2.png';

const AboutPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
          <Link to="/about" className="text-white font-medium">About</Link>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-gray-800">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
            <Link to="/about" className="text-white font-medium">About</Link>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition duration-300">Contact</a>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition duration-300 w-full">
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-indigo-500">EduLearn</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Transforming education through technology and making high-quality learning accessible to everyone around the globe.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-64 w-64 bg-indigo-900/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 h-64 w-64 bg-purple-900/30 rounded-full blur-3xl"></div>
              <div className="relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                {/* Image Placeholder - Replace with actual image in production */}
                <div className="aspect-video bg-gradient-to-br from-indigo-800 to-purple-800 flex items-center justify-center">
  <img
    src={PIC2}
    alt="Our Team"
    className="w-full h-full object-cover rounded-lg"
  />
</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              At EduLearn, we believe that education is a fundamental right. Our mission is to create a world where anyone, anywhere can access high-quality educational content and transform their lives through the power of learning.
            </p>
            <p className="text-gray-300 mb-6">
              We're passionate about breaking down barriers to education and empowering individuals to reach their full potential through accessible, engaging, and effective online courses.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 text-indigo-400">
                10,000+ Students
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 text-indigo-400">
                500+ Courses
              </div>
              <div className="bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700 text-indigo-400">
                50+ Countries
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-64 w-64 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <p className="text-gray-300 mb-6">
                EduLearn was founded in 2023 by a group of passionate educators and technologists who saw the potential of online learning to revolutionize education. What started as a small collection of web development courses has grown into a comprehensive platform offering hundreds of courses across dozens of disciplines.
              </p>
              <p className="text-gray-300 mb-6">
                Our journey began when our founders, experiencing firsthand the limitations of traditional education systems, decided to build a platform that could provide high-quality learning experiences that are accessible, affordable, and adaptable to individual learning styles.
              </p>
              <p className="text-gray-300">
                Today, EduLearn serves learners in over 50 countries, partnering with industry experts and educational institutions to deliver cutting-edge content that helps our students achieve their personal and professional goals.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Accessibility",
                description: "We believe education should be available to everyone, regardless of geographic location or economic background.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )
              },
              {
                title: "Innovation",
                description: "We continuously explore new teaching methods and technologies to enhance the learning experience.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Excellence",
                description: "We are committed to delivering the highest quality educational content and learning experiences.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )
              },
              {
                title: "Community",
                description: "We foster a supportive community where learners and educators connect, collaborate, and grow together.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Adaptability",
                description: "We recognize that everyone learns differently and design our platform to accommodate diverse learning styles.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                )
              },
              {
                title: "Impact",
                description: "We measure our success by the positive change we create in our learners' lives and in the world.",
                icon: (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition duration-300">
                <div className="h-12 w-12 bg-indigo-900/50 text-indigo-400 rounded-lg flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Johnson",
                title: "Founder & CEO",
                image: "bg-blue-600"
              },
              {
                name: "Sarah Williams",
                title: "Chief Learning Officer",
                image: "bg-purple-600"
              },
              {
                name: "David Chen",
                title: "CTO",
                image: "bg-indigo-600"
              },
              {
                name: "Maria Rodriguez",
                title: "Head of Content",
                image: "bg-violet-600"
              }
            ].map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition duration-300 group">
                <div className={`${member.image} aspect-square flex items-center justify-center`}>
                  <span className="text-2xl font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-indigo-400 transition duration-300">{member.name}</h3>
                  <p className="text-gray-400">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Learning Community</h2>
              <p className="text-indigo-200 text-lg mb-0 md:mb-6">
                Be part of our mission to transform education and unlock potential worldwide.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-white text-indigo-900 hover:bg-indigo-100 px-8 py-3 rounded-lg text-lg font-medium transition duration-300">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-xl">E</span>
                </div>
                <span className="font-bold text-xl">EduLearn</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transforming education through technology and making learning accessible to everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Learning</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Browse All Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Learning Tracks</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Free Courses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Become an Instructor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Student Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2025 EduLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;