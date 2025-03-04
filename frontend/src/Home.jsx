import React, { useState, useRef } from 'react';
import { ArrowRight, BookOpen, Activity, BarChart2, MessageSquare, Info, LogIn, X, Bell, Home } from 'lucide-react';
import PIC1 from'./assets/PIC1.png'
import {Link} from 'react-router-dom'

// Main Component
const LandingPageComplete = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #EBF2FF, #FFFFFF)',
      overflow: 'hidden'
    }}>
      {/* Fixed Navigation Bar */}
      <nav style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        padding: '8px 0',
        position: 'sticky',
        top: 0,
        zIndex: 20
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Activity style={{ height: '32px', width: '32px', color: '#2563EB' }} />
              <span style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1E3A8A'
              }}>MindShire</span>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }}>
              <a style={{
                display: 'flex',
                alignItems: 'center',
                color: '#4B5563',
                cursor: 'pointer'
              }}
                 onMouseOver={(e) => e.currentTarget.style.color = '#1D4ED8'}
                 onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}>
                <Home style={{ height: '20px', width: '20px', marginRight: '4px' }} />
                <span>Home</span>
              </a>
              <a style={{
                display: 'flex',
                alignItems: 'center',
                color: '#4B5563',
                cursor: 'pointer'
              }}
                 onMouseOver={(e) => e.currentTarget.style.color = '#1D4ED8'}
                 onMouseOut={(e) => e.currentTarget.style.color = '#4B5563'}>
                <Info style={{ height: '20px', width: '20px', marginRight: '4px' }} />
                <span>About Us</span>
              </a>
              <Link to="/login" style={{
                backgroundColor: '#2563EB',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}>
                <LogIn style={{ height: '20px', width: '20px', marginRight: '4px' }} />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Fixed Hero Section */}
      <div id="home" style={{
        backgroundColor: '#EBF2FF',
        padding: '32px 0',
        marginBottom: '32px',
        position: 'sticky',
        top: '56px',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: '#1E3A8A',
            marginBottom: '16px'
          }}>
            Comprehensive Health Education for All Ages
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#4B5563',
            marginBottom: '24px',
            maxWidth: '672px',
            margin: '0 auto 24px'
          }}>
            From basic concepts to advanced health studies, aligned with CBSE and ICSE curricula.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <button style={{
              backgroundColor: '#2563EB',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}>
              Get Started <ArrowRight style={{ marginLeft: '8px', height: '16px', width: '16px' }} />
            </button>
            <button style={{
              border: '1px solid #2563EB',
              color: '#2563EB',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: 'transparent'
            }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#EBF2FF';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}>
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        {/* Empowering Health Knowledge Section */}
        <section style={{
          padding: '32px 0',
          backgroundColor: 'white',
          marginBottom: '32px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
    alignItems: 'center',
    gap: '32px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}>
              {/* Left side description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A'
                }}>Empowering Health Knowledge</h2>
                <p style={{ color: '#374151' }}>
                  At MindShire, we believe that proper health education is a fundamental right for every student. Our platform bridges the gap between traditional learning and modern interactive education.
                </p>
                <div>
                  <a href="#" style={{
                    backgroundColor: '#2563EB',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                     onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                     onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}>
                    Learn More <ArrowRight style={{ marginLeft: '8px', height: '16px', width: '16px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
      <img src={PIC1} alt="Health Education" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} />
    </div>
        </section>

        

        {/* Curriculum Section */}
        <section id="curriculum" style={{
          padding: '32px 0',
          backgroundColor: '#EBF2FF',
          marginBottom: '32px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1E3A8A',
              marginBottom: '24px'
            }}>
              Age-Appropriate Curriculum
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {/* Basic Health */}
              <div style={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <BookOpen style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>Grades 1-5</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem',
                  marginBottom: '8px'
                }}>
                  Basic health concepts for younger students.
                </p>
              </div>

              {/* Higher Health */}
              <div style={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <BookOpen style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>Grades 6-10</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem',
                  marginBottom: '8px'
                }}>
                  Intermediate health education for middle school.
                </p>
              </div>

              {/* Advanced Health */}
              <div style={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <BookOpen style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>Above 10th</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem',
                  marginBottom: '8px'
                }}>
                  Advanced curriculum for senior students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          padding: '32px 0',
          backgroundColor: 'white',
          marginBottom: '32px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1E3A8A',
              marginBottom: '24px'
            }}>
              Platform Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {/* AI Chatbot */}
              <div style={{
                backgroundColor: '#EBF2FF',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <MessageSquare style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>AI Assistant</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem'
                }}>
                  24/7 chatbot powered by Google's Gemini API.
                </p>
              </div>

              {/* Health Activities */}
              <div style={{
                backgroundColor: '#EBF2FF',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <Activity style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>Health Activities</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem'
                }}>
                  Interactive exercises and health activities.
                </p>
              </div>

              {/* Progress Tracking */}
              <div style={{
                backgroundColor: '#EBF2FF',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{
                  backgroundColor: '#DBEAFE',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  <BarChart2 style={{ height: '20px', width: '20px', color: '#2563EB' }} />
                </div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  color: '#1E3A8A',
                  marginBottom: '4px'
                }}>Progress Tracking</h3>
                <p style={{
                  color: '#4B5563',
                  fontSize: '0.875rem'
                }}>
                  Monitor your learning journey and progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" style={{
          padding: '32px 0',
          backgroundColor: '#EBF2FF'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1E3A8A',
              marginBottom: '24px'
            }}>
              About Us
            </h2>
            <div style={{
              maxWidth: '768px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#4B5563',
                marginBottom: '16px'
              }}>
                MindShire founded by a team of educators, health professionals, and technologists who believe in the power of quality health education for students of all ages.
              </p>
              <p style={{
                color: '#4B5563',
                marginBottom: '16px'
              }}>
                Our mission is to make comprehensive health education accessible to every student across India, regardless of their location or background.
              </p>
              <p style={{
                color: '#4B5563'
              }}>
                We work closely with education boards and health experts to ensure our content meets the highest standards while remaining engaging and easy to understand.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer style={{
          backgroundColor: '#1E3A8A',
          color: 'white',
          padding: '24px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              '@media (min-width: 768px)': {
                flexDirection: 'row'
              }
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <Activity style={{ height: '24px', width: '24px', color: '#93C5FD' }} />
                <span style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold'
                }}>MindShire</span>
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#BFDBFE'
              }}>
                © 2025 MindShire. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPageComplete;