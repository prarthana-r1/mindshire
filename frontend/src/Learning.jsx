import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from "./apiConfig";

const BlueCurriculumApp = () => {
  const [activeTab, setActiveTab] = useState('learning');
  const [selectedGrade, setSelectedGrade] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [showTomTooltip, setShowTomTooltip] = useState(true);
  const navigate = useNavigate();

  // Expanded curriculum structure for all grades
  const curriculumByGrade = {
    // Grade 1
    1: [
      { id: 1, subject: "Mathematics", chapters: ["Numbers and Counting", "Basic Addition", "Basic Subtraction", "Shapes and Patterns"] },
      { id: 2, subject: "EVS", chapters: ["Plants and Animals", "My Family", "Water and Air", "Food and Nutrition"] },
      { id: 3, subject: "Social Studies", chapters: ["My Neighborhood", "Community Helpers", "Festivals", "Transport"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Personal Hygiene", "Healthy Eating", "Physical Activity", "Basic Safety"] }
    ],
    // Grade 2
    2: [
      { id: 1, subject: "Mathematics", chapters: ["Place Value", "Addition with Carrying", "Subtraction with Borrowing", "Multiplication Basics"] },
      { id: 2, subject: "EVS", chapters: ["Living and Non-living", "Plants Around Us", "Animal World", "Air and Water"] },
      { id: 3, subject: "Social Studies", chapters: ["Our Country", "Different Cultures", "Means of Communication", "Important Places"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Oral & Personal Hygiene", "Food & Nutrition", "Basic First Aid", "Sleep Importance"] }
    ],
    // Grade 3-12 (shortened for brevity)
    3: [
      { id: 1, subject: "Mathematics", chapters: ["Fractions", "Division Basics", "Time", "Measurement"] },
      { id: 2, subject: "Science", chapters: ["Matter", "Energy", "Plant Life Cycle", "Animal Adaptations"] },
      { id: 3, subject: "Social Studies", chapters: ["Maps and Directions", "Our Community", "Natural Resources", "Early Civilizations"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Germs & Illness", "Basic Mental Health", "Exercise & Body Care", "Water Safety"] }
    ],
    // Maintaining the same structure for grades 4-12 as in the original code
    4: [
      { id: 1, subject: "Mathematics", chapters: ["Decimals", "Factors and Multiples", "Geometry", "Data Handling"] },
      { id: 2, subject: "Science", chapters: ["States of Matter", "Force and Motion", "Solar System", "Living World"] },
      { id: 3, subject: "Social Studies", chapters: ["Geography of India", "Indian History", "Government", "Natural Resources"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Immunity Basics", "First Aid Expansion", "Sun & Skin Health", "Basic Social Skills"] }
    ],
    5: [
      { id: 1, subject: "Mathematics", chapters: ["Percentages", "Area and Volume", "Algebra Basics", "Patterns"] },
      { id: 2, subject: "Science", chapters: ["Human Body", "Simple Machines", "Earth and Space", "Ecosystems"] },
      { id: 3, subject: "Social Studies", chapters: ["Ancient Civilizations", "Weather and Climate", "Industries", "Transportation"] },
      { id: 4, subject: "Basic Health Sciences", chapters: ["Healthy Lifestyle Habits", "Nutrition Awareness", "Puberty Basics", "Injury Prevention"] }
    ],
    6: [
      { id: 1, subject: "Mathematics", chapters: ["Integers", "Fractions and Decimals", "Ratio and Proportion", "Algebra"] },
      { id: 2, subject: "Science", chapters: ["Food and Nutrition", "Fibre to Fabric", "Sorting Materials", "Motion and Measurement"] },
      { id: 3, subject: "Social Studies", chapters: ["History - Early Societies", "Geography - Earth", "Civics - Rural Administration", "Economics Basics"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["First Aid (Basic)", "Common Illnesses", "Mental Health Awareness", "Ergonomics"] }
    ],
    7: [
      { id: 1, subject: "Mathematics", chapters: ["Rational Numbers", "Exponents", "Algebraic Expressions", "Triangles and Quadrilaterals"] },
      { id: 2, subject: "Science", chapters: ["Nutrition in Plants and Animals", "Heat and Temperature", "Acids and Bases", "Physical and Chemical Changes"] },
      { id: 3, subject: "Social Studies", chapters: ["Medieval History", "Environment", "Democracy", "Markets and Trade"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["First Aid (Advanced)", "Allergies & Asthma", "Nutrition & Body Image", "Basic Disease Prevention"] }
    ],
    8: [
      { id: 1, subject: "Mathematics", chapters: ["Quadrilaterals", "Practical Geometry", "Data Handling", "Squares and Square Roots"] },
      { id: 2, subject: "Science", chapters: ["Crop Production", "Microorganisms", "Synthetic Materials", "Metals and Non-metals"] },
      { id: 3, subject: "Social Studies", chapters: ["Modern History", "Resources", "Law and Justice", "Social Issues"] },
      { id: 4, subject: "Intermediate Health Sciences", chapters: ["Home Remedies vs. Medical Care", "Hormonal Changes", "Cyber & Social Health", "Healthy Relationships"] }
    ],
    9: [
      { id: 1, subject: "Mathematics", chapters: ["Real Numbers", "Polynomials", "Coordinate Geometry", "Linear Equations"] },
      { id: 2, subject: "Science", chapters: ["Matter", "Cell Structure", "Tissues", "Force and Laws of Motion"] },
      { id: 3, subject: "Social Studies", chapters: ["French Revolution", "Natural Resources", "Democratic Politics", "Economic Development"] },
      { id: 4, subject: "Advanced Health Sciences", chapters: ["Advanced First Aid", "Mental Resilience", "Basic Medicine Knowledge", "Preventative Healthcare"] }
    ],
    10: [
      { id: 1, subject: "Mathematics", chapters: ["Quadratic Equations", "Arithmetic Progressions", "Circles", "Statistics"] },
      { id: 2, subject: "Science", chapters: ["Chemical Reactions", "Control and Coordination", "Heredity and Evolution", "Light Reflection and Refraction"] },
      { id: 3, subject: "Social Studies", chapters: ["Nationalism in Europe", "Resources and Development", "Power Sharing", "Globalization"] },
      { id: 4, subject: "Advanced Health Sciences", chapters: ["Sexual & Reproductive Health", "Addiction Awareness", "Fitness & Nutrition", "Stress & Time Management"] }
    ],
    11: [
      { id: 1, subject: "Mathematics", chapters: ["Sets", "Relations and Functions", "Trigonometric Functions", "Complex Numbers"] },
      { id: 2, subject: "Physics", chapters: ["Units and Measurements", "Motion in a Straight Line", "Laws of Motion", "Work, Energy and Power"] },
      { id: 3, subject: "Chemistry", chapters: ["Basic Concepts", "Structure of Atom", "Chemical Bonding", "States of Matter"] },
      { id: 4, subject: "Biology", chapters: ["Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom"] },
      { id: 5, subject: "Advanced Health Sciences", chapters: ["Emergency Response", "Health & Technology", "Chronic Illness Awareness", "Workplace Health & Safety"] }
    ],
    12: [
      { id: 1, subject: "Mathematics", chapters: ["Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants"] },
      { id: 2, subject: "Physics", chapters: ["Electric Charges and Fields", "Current Electricity", "Magnetism", "Electromagnetic Waves"] },
      { id: 3, subject: "Chemistry", chapters: ["Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics"] },
      { id: 4, subject: "Biology", chapters: ["Reproduction", "Genetics", "Evolution", "Human Health and Disease"] },
      { id: 5, subject: "Advanced Health Sciences", chapters: ["Medical Literacy", "First Aid Certification", "Mental Health Advocacy", "Preparing for Adult Healthcare"] }
    ]
  };

  // NavItem component with Tailwind CSS
  const NavItem = ({ icon, label, id, route }) => {
    const isActive = activeTab === id;
    
    return (
      <div 
        className={`flex items-center cursor-pointer py-2 relative ${isActive ? 'text-white' : 'text-blue-100 text-opacity-90'}`}
        onClick={() => {
          setActiveTab(id); 
          if (route) navigate(route);
        }}
      >
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
        {isActive && <div className="absolute bottom-[-1rem] left-0 w-full h-[3px] bg-indigo-500 rounded-t"></div>}
      </div>
    );
  };

  const getEmbeddedYouTubeURL = (url) => {
    if (!url) return "";
  
    try {
      console.log("Raw video URL:", url); // Debugging
  
      const urlObj = new URL(url);
  
      if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
        const videoId = urlObj.searchParams.get("v");
        console.log("Converted YouTube Embed URL:", `https://www.youtube.com/embed/${videoId}`);
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      if (urlObj.hostname.includes("youtu.be")) {
        const videoId = urlObj.pathname.split("/")[1];
        console.log("Converted Short YouTube Embed URL:", `https://www.youtube.com/embed/${videoId}`);
        return `https://www.youtube.com/embed/${videoId}`;
      }
  
      if (urlObj.pathname.includes("/embed/")) {
        return url; // Already an embed URL
      }
  
      return "";
    } catch (error) {
      console.error("Invalid YouTube URL:", url, error);
      return "";
    }
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setShowQuiz(false);
    setQuizAnswers({});
    setShowResults(false);
    setLessonData(null);
  };

  // Fetch lesson from MongoDB for the selected grade and chapter (topic)
  const fetchLesson = async (grade, topic) => {
    setLoading(true);
    setError(null);
  
    try {
      const token = localStorage.getItem('token');
      console.log("Fetching lesson for Grade:", grade, "Topic:", topic);
  
      const response = await axios.get(`${API_URL}/api/lessons/${grade}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      console.log("API Response:", response.data); // Debugging log
  
      const matchedLesson = response.data.find(lesson => lesson.topic === topic);
  
      if (matchedLesson) {
        console.log("Lesson Found:", matchedLesson);
        setLessonData(matchedLesson);
      } else {
        console.warn("No lesson data found for this topic.");
        setLessonData(null);
        setError("No lesson data found for this topic.");
      }
    } catch (err) {
      console.error("Error fetching lesson:", err.response?.data || err.message);
      setError(`Failed to load lesson content: ${err.message || "Unknown error"}`);
      setLessonData(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle chapter selection
  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setShowQuiz(false);
    setQuizAnswers({});
    setShowResults(false);
    
    // Fetch the lesson data for this chapter
    fetchLesson(selectedGrade, chapter);
  };

  // Function to start quiz
  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setShowResults(false);
  };

  // Function to handle quiz submission
  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  return (
    <div className="bg-[#14141F] min-h-screen flex flex-col font-sans text-gray-200">
      {/* Navbar - Dark theme */}
      <nav className="bg-[#1A1A25] text-white py-4 px-6 flex justify-center border-b border-[#292935]">
        <div className="max-w-[1200px] w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 rounded-lg w-7 h-7 flex items-center justify-center font-bold text-base">M</div>
            <div className="text-xl font-bold">MindShire</div>
          </div>
          <div className="flex gap-8">
            <NavItem label="Dashboard" id="dashboard" route="/dashboard" />
            <NavItem label="My Courses" id="courses" route="/courses" />
            <NavItem label="Learning" id="learning" route="/learning" />
            <NavItem label="Chatbot" id="explore" route="/chat" />
            <NavItem label="Community" id="community" route="/community" />
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
            AM
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-[900px] mb-6">
          <h1 className="text-[1.8rem] font-bold text-white m-0">Learning Center</h1>
          <button className="bg-indigo-500 text-white py-2 px-5 rounded-lg font-bold border-none cursor-pointer">
            Find New Courses
          </button>
        </div>

        <div className="max-w-[900px] w-full p-5 bg-[#1A1A25] rounded-lg shadow-lg text-gray-200">
          {/* Grade selector */}
          <div className="mb-6 bg-[#22222E] p-4 rounded-lg shadow">
            <h2 className="text-gray-200 mb-4 text-xl">Select Grade:</h2>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
                <button
                  key={grade}
                  className={`py-2 px-4 border-none rounded-md cursor-pointer font-bold transition-all duration-200 min-w-[40px] shadow ${
                    selectedGrade === grade ? 'bg-indigo-500 text-white' : 'bg-[#2D2D3A] text-[#B4B4C7]'
                  }`}
                  onClick={() => handleGradeSelect(grade)}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
          
          {/* Subject selector */}
          {selectedGrade && (
            <div className="mb-6 bg-[#22222E] p-4 rounded-lg shadow">
              <h2 className="text-gray-200 mb-4 text-xl">Select Subject:</h2>
              <div className="flex gap-2 flex-wrap">
                {curriculumByGrade[selectedGrade]?.map(subject => (
                  <button
                    key={subject.id}
                    className={`py-3 px-4 border-none rounded-md cursor-pointer font-bold transition-all duration-200 flex-1 shadow ${
                      selectedSubject === subject.subject ? 'bg-indigo-500 text-white' : 'bg-[#2D2D3A] text-[#B4B4C7]'
                    }`}
                    onClick={() => {
                      setSelectedSubject(subject.subject);
                      setSelectedChapter(null);
                      setShowQuiz(false);
                      setLessonData(null);
                    }}
                  >
                    {subject.subject}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Chapter selector */}
          {selectedSubject && (
            <div className="mb-6 bg-[#22222E] p-4 rounded-lg shadow">
              <h2 className="text-gray-200 mb-4 text-xl">Select Chapter:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {curriculumByGrade[selectedGrade]
                  ?.find(subject => subject.subject === selectedSubject)
                  ?.chapters.map(chapter => (
                    <button
                      key={chapter}
                      className={`p-4 border-none rounded-md cursor-pointer text-left transition-all duration-200 font-medium min-h-[60px] shadow ${
                        selectedChapter === chapter ? 'bg-indigo-500 text-white' : 'bg-[#2D2D3A] text-[#B4B4C7]'
                      }`}
                      onClick={() => handleChapterSelect(chapter)}
                    >
                      {chapter}
                    </button>
                  ))}
              </div>
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-300">Loading content...</p>
            </div>
          )}
          
          {/* Error display */}
          {error && !loading && (
            <div className="bg-red-900 bg-opacity-40 p-4 rounded-lg mb-6">
              <p className="text-red-200">{error}</p>
            </div>
          )}
          
          {/* Chapter content view - Using lessonData directly */}
          {selectedChapter && !showQuiz && !loading && (
            <div className="bg-[#22222E] p-5 rounded-lg shadow mb-6">
              <h2 className="text-gray-200 mt-0 mb-4 border-b border-[#383848] pb-2">{selectedChapter}</h2>
              <div className="leading-relaxed">
                {lessonData ? (
                  <p>{lessonData.content}</p>
                ) : (
                  <p>Content for this chapter is currently being developed. Please check back later.</p>
                )}
              </div>
              
              {/* Video component if available */}
              {lessonData?.videoURL && getEmbeddedYouTubeURL(lessonData.videoURL) && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Watch Lesson Video</h3>
                  <div className="w-full">
                    <iframe 
                      src={getEmbeddedYouTubeURL(lessonData.videoURL)}
                      title={`${selectedChapter} Video`}
                      className="w-full h-[400px]"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {/* Show quiz button if there are quiz questions */}
              {lessonData && lessonData.quiz && lessonData.quiz.length > 0 && (
                <button 
                  className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
                  onClick={handleStartQuiz}
                >
                  Take Quiz
                </button>
              )}
            </div>
          )}
          
          {/* Quiz component */}
          {showQuiz && selectedChapter && lessonData && (
            <div className="bg-[#22222E] p-5 rounded-lg shadow mb-6">
              <h2 className="text-gray-200 mt-0 mb-4 border-b border-[#383848] pb-2">Quiz: {selectedChapter}</h2>
              
              {lessonData.quiz && lessonData.quiz.length > 0 ? (
                <>
                  {!showResults ? (
                    <div>
                      {lessonData.quiz.map((q, index) => (
                        <div key={index} className="mb-6 pb-4 border-b border-gray-700 last:border-b-0">
                          <p className="text-lg font-medium mb-3">{q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`q${index}-opt${optIndex}`}
                                  name={`question-${index}`}
                                  checked={quizAnswers[index] === optIndex}
                                  onChange={() => {
                                    setQuizAnswers({
                                      ...quizAnswers,
                                      [index]: optIndex
                                    });
                                  }}
                                  className="mr-3"
                                />
                                <label htmlFor={`q${index}-opt${optIndex}`} className="text-gray-300">{option}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <button 
                        className={`mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200 ${
                          Object.keys(quizAnswers).length === lessonData.quiz.length ? 'opacity-100 hover:bg-indigo-600' : 'opacity-60 cursor-not-allowed'
                        }`}
                        disabled={Object.keys(quizAnswers).length !== lessonData.quiz.length}
                        onClick={handleSubmitQuiz}
                      >
                        Submit Answers
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold mb-4">Your Results</h3>
                      {lessonData.quiz.map((q, index) => {
                        const isCorrect = quizAnswers[index] === q.options.indexOf(q.correctAnswer);
                        return (
                          <div 
                            key={index} 
                            className={`p-4 rounded-lg ${isCorrect ? 'bg-[#1e3a27]' : 'bg-[#3a1e1e]'}`}
                          >
                            <p className="text-lg font-medium mb-2">{q.question}</p>
                            <p>Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{q.options[quizAnswers[index]]}</span></p>
                            <p>Correct answer: <span className="text-green-400">{q.correctAnswer}</span></p>
                          </div>
                        );
                      })}
                      
                      <button 
                        className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => {
                          setShowQuiz(false);
                          setQuizAnswers({});
                          setShowResults(false);
                        }}
                      >
                        Back to Chapter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-400">No quiz available for this chapter.</p>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer - Dark theme */}
      <footer className="bg-[#1A1A25] text-gray-300 py-6 px-6 border-t border-[#292935]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-500 w-7 h-7 rounded-lg flex items-center justify-center font-bold">M</div>
              <div className="text-lg font-semibold">MindShire</div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="text-sm text-gray-400 text-center">© 2025 MindShire. All rights reserved.</div>
        </div>
      </footer>

      {/* Professor Tom in right bottom corner */}
    </div>
  );
};

export default BlueCurriculumApp;