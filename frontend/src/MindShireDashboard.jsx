import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
// Internal CSS as a JavaScript object
const styles = {
  body: {
    backgroundColor: '#F9FAFB',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    margin: 0,
    padding: 0,
  },
  navbar: {
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  navbarContent: {
    maxWidth: '1200px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  navItems: {
    display: 'flex',
    gap: '2rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(219, 234, 254, 0.9)',
    cursor: 'pointer',
    position: 'relative',
  },
  navItemActive: {
    color: 'white',
  },
  navItemActiveLine: {
    position: 'absolute',
    bottom: '-1rem',
    left: 0,
    width: '100%',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '3px 3px 0 0',
  },
  icon: {
    marginRight: '0.5rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '800px',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #E5E7EB',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.75rem',
    justifyContent: 'space-between',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  sectionAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginRight: '1rem',
  },
  cardContent: {
    marginLeft: '3.5rem',
  },
  professorTom: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #E5E7EB',
    position: 'fixed',
    right: '40px',
    bottom: '40px',
    zIndex: 5,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  largeTooltip: {
    position: 'absolute',
    backgroundColor: '#1E40AF',
    color: 'white',
    padding: '0.2rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    left: '-220px',
    top: '50%',
    transform: 'translateY(-50%)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    width: '200px',
    zIndex: 10,
  },
  largeTooltipArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
    borderLeft: '10px solid #1E40AF',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  sectionTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1F2937',
  },
  paragraph: {
    color: '#4B5563',
    marginBottom: '1rem',
  },
  professorEmoji: {
    fontSize: '24px',
  },
  meditationButton: {
    backgroundColor: '#8B5CF6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  buttonIcon: {
    marginRight: '0.5rem',
    fontSize: '1.125rem',
  }
};

const MindShireDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showTomTooltip, setShowTomTooltip] = useState(true);
  const navigate = useNavigate();

  // NavItem component with inline styles
  const NavItem = ({ icon, label, id, route }) => {
    const isActive = activeTab === id;
    
    return (
      <div 
        style={{
          ...styles.navItem,
          ...(isActive ? styles.navItemActive : {})
        }}
        onClick={() => {
          setActiveTab(id); 
          navigate(route);
        }}
      >
        <span style={styles.icon}>{icon}</span>
        <span>{label}</span>
        {isActive && <div style={styles.navItemActiveLine}></div>}
      </div>
    );
  };

  const handleMeditationClick = () => {
    navigate('/meditation');
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContent}>
          <div style={styles.logo}>MindShire</div>
          <div style={styles.navItems}>
            <NavItem icon="🏠" label="Home" id="home" route="/"/>
            <NavItem icon="📚" label="Learning" id="learning" route="/learning" />
            {/* <NavItem icon="👤" label="Profile" id="profile" route="/profile" /> */}
          </div>
          <div style={styles.avatar}>JS</div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.container}>
          {/* Welcome Card */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div style={styles.titleGroup}>
                <div style={{
                  ...styles.sectionAvatar,
                  backgroundColor: '#4F46E5'
                }}>🏠</div>
                <h2 style={styles.sectionTitle}>Welcome to MindShire</h2>
              </div>
            </div>
            <div style={styles.cardContent}>
              <p style={styles.paragraph}>
                Your personalized healthcare education platform. Complete your profile to get started.
              </p>
            </div>
          </div>

          {/* Meditation Card */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div style={styles.titleGroup}>
                <div style={{
                  ...styles.sectionAvatar,
                  backgroundColor: '#8B5CF6'
                }}>🧘</div>
                <h2 style={styles.sectionTitle}>Pause, Relax, Recharge</h2>
              </div>
            </div>
            <div style={styles.cardContent}>
              <p style={styles.paragraph}>
                Take a moment for yourself. Regular meditation can help reduce stress and improve focus.
              </p>
              <button 
                style={styles.meditationButton} 
                onClick={handleMeditationClick}
              >
                <span style={styles.buttonIcon}>🎵</span>
                Begin Meditation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Professor Tom in right bottom corner */}
      <div 
        style={styles.professorTom}
        onClick={() => setShowTomTooltip(!showTomTooltip)}
      >
        <span style={styles.professorEmoji}>👨‍🏫</span>
        {showTomTooltip && (
          <div style={styles.largeTooltip}>
            Hey! Let's pick up where you left off.
            <div style={styles.largeTooltipArrow}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MindShireDashboard;