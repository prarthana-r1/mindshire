import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GuidedMeditation = () => {
    const navigate = useNavigate();
    const [selectedMeditation, setSelectedMeditation] = useState(null);
    const [breathPhase, setBreathPhase] = useState('');
    const [timeLeft, setTimeLeft] = useState(0);
    const [isMeditating, setIsMeditating] = useState(false);
    
    const meditations = [
        { name: "Deep Breathing", duration: 300 }, // 5 mins
        { name: "Mindfulness Meditation", duration: 600 }, // 10 mins
        { name: "Body Scan", duration: 900 } // 15 mins
    ];
    
    useEffect(() => {
        let interval;
        if (isMeditating && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
                
                // 12-second breath cycle: 3s inhale, 3s hold, 6s exhale
                const breathCycle = timeLeft % 12;
                if (breathCycle === 0 || breathCycle === 11 || breathCycle === 10) {
                    setBreathPhase('Inhale');
                } else if (breathCycle === 9 || breathCycle === 8 || breathCycle === 7) {
                    setBreathPhase('Hold');
                } else {
                    setBreathPhase('Exhale');
                }
            }, 1000);
        } else if (timeLeft === 0 && isMeditating) {
            setIsMeditating(false);
            setBreathPhase('');
        }
        return () => clearInterval(interval);
    }, [isMeditating, timeLeft]);
    
    const startMeditation = (meditation) => {
        setSelectedMeditation(meditation);
        setTimeLeft(meditation.duration);
        setIsMeditating(true);
    };
    
    const stopMeditation = () => {
        setIsMeditating(false);
        setTimeLeft(0);
        setBreathPhase('');
        setSelectedMeditation(null);
    };

    const calculateProgress = () => {
        if (!selectedMeditation) return 0;
        return ((selectedMeditation.duration - timeLeft) / selectedMeditation.duration) * 100;
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes inhaleAnimation {
                    0% { transform: scale(1); opacity: 0.7; }
                    100% { transform: scale(1.3); opacity: 0.3; }
                }
                
                @keyframes holdAnimation {
                    0% { transform: scale(1.3); opacity: 0.3; }
                    100% { transform: scale(1.3); opacity: 0.3; }
                }
                
                @keyframes exhaleAnimation {
                    0% { transform: scale(1.3); opacity: 0.3; }
                    100% { transform: scale(1); opacity: 0.7; }
                }
                
                @keyframes waveAnimation {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2); opacity: 0; }
                }
                
                .wave {
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(100, 181, 246, 0.4);
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    animation: waveAnimation 4s infinite;
                }
                
                .wave:nth-child(2) {
                    animation-delay: 1s;
                }
                
                .wave:nth-child(3) {
                    animation-delay: 2s;
                }
                
                .wave:nth-child(4) {
                    animation-delay: 3s;
                }
                
                .breathe-circle {
                    transition: all 0.3s ease;
                }
                
                .breathe-circle.inhale {
                    animation: inhaleAnimation 3s;
                    animation-fill-mode: forwards;
                }
                
                .breathe-circle.hold {
                    animation: holdAnimation 3s;
                    animation-fill-mode: forwards;
                }
                
                .breathe-circle.exhale {
                    animation: exhaleAnimation 6s;
                    animation-fill-mode: forwards;
                }
                
                .progress-ring {
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                }
                `}
            </style>
            <h2 style={styles.title}>Guided Meditation</h2>
            
            {!isMeditating ? (
                <div style={styles.selectionContainer}>
                    <h3 style={styles.subtitle}>Select a Meditation</h3>
                    <div style={styles.buttonContainer}>
                        {meditations.map((meditation) => (
                            <button 
                                key={meditation.name} 
                                onClick={() => startMeditation(meditation)} 
                                style={styles.meditationButton}
                            >
                                {meditation.name} ({meditation.duration / 60} min)
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={styles.meditationContainer}>
                    <h3 style={styles.meditationTitle}>{selectedMeditation.name}</h3>
                    
                    <div style={styles.timerContainer}>
                        <div style={styles.circleContainer}>
                            <div className={`breathe-circle ${breathPhase.toLowerCase()}`} style={styles.breatheCircle}>
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                            </div>
                            
                            <svg width="200" height="200" style={styles.progressRing}>
                                <circle 
                                    cx="100" 
                                    cy="100" 
                                    r="90" 
                                    fill="none" 
                                    stroke="#E3F2FD" 
                                    strokeWidth="8"
                                />
                                <circle 
                                    className="progress-ring" 
                                    cx="100" 
                                    cy="100" 
                                    r="90" 
                                    fill="none" 
                                    stroke="#2196F3" 
                                    strokeWidth="8"
                                    strokeDasharray={`${2 * Math.PI * 90}`}
                                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - calculateProgress() / 100)}`}
                                />
                            </svg>
                            
                            <div style={styles.timerText}>
                                <h4 style={styles.breathPhase}>{breathPhase}</h4>
                                <p style={styles.timeLeft}>{formatTime(timeLeft)}</p>
                            </div>
                        </div>
                        
                        <button onClick={stopMeditation} style={styles.stopButton}>
                            Stop
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '30px',
        minHeight: '100vh',
        backgroundColor: '#E1F5FE',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#0D47A1',
        fontSize: '2.5rem',
        marginBottom: '30px',
        fontWeight: '600',
        textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    },
    subtitle: {
        color: '#1565C0',
        fontSize: '1.8rem',
        marginBottom: '20px',
    },
    selectionContainer: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '80%',
        maxWidth: '600px',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    meditationButton: {
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        padding: '15px 30px',
        fontSize: '1.1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 3px 5px rgba(33,150,243,0.3)',
    },
    meditationContainer: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '80%',
        maxWidth: '600px',
    },
    meditationTitle: {
        color: '#1565C0',
        fontSize: '2rem',
        marginBottom: '30px',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleContainer: {
        position: 'relative',
        width: '200px',
        height: '200px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    breatheCircle: {
        position: 'absolute',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#64B5F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    progressRing: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    timerText: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    breathPhase: {
        color: 'white',
        fontSize: '1.3rem',
        margin: '0',
        fontWeight: '500',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    },
    timeLeft: {
        color: 'white',
        fontSize: '1.8rem',
        margin: '5px 0 0 0',
        fontWeight: 'bold',
        textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    },
    stopButton: {
        backgroundColor: '#F44336',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        padding: '12px 30px',
        fontSize: '1.1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 3px 5px rgba(244,67,54,0.3)',
    },
};

export default GuidedMeditation;