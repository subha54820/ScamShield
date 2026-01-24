import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './CinematicIntro.css';

interface Scene {
  id: number;
  duration: number;
  delay: number;
}

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [showShield, setShowShield] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  // Matrix Code Stream Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(0);

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px "Courier New"`;
      ctx.globalAlpha = 0.8;
      ctx.shadowColor = '#00ff41';
      ctx.shadowBlur = 10;

      for (let i = 0; i < drops.length; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (activeScene === 0) {
        requestAnimationFrame(drawMatrix);
      }
    };

    drawMatrix();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeScene]);

  // Scene Timeline
  useEffect(() => {
    const timeline = [
      { scene: 0, duration: 3000 }, // Matrix code
      { scene: 1, duration: 3000 }, // Shield reveal
      { scene: 2, duration: 3000 }, // Scan effect
      { scene: 3, duration: 2000 }, // Transition
    ];

    let currentTime = 0;

    timeline.forEach((item) => {
      setTimeout(() => {
        setActiveScene(item.scene);
        if (item.scene === 1) setShowShield(true);
        if (item.scene === 2) setShowScan(true);
        if (item.scene === 3) setShowTransition(true);
      }, currentTime);

      currentTime += item.duration;
    });

    setTimeout(onComplete, currentTime);
  }, [onComplete]);

  return (
    <div className="cinematic-intro">
      {/* Background Canvas - Matrix Code Stream */}
      <canvas
        ref={canvasRef}
        className={`matrix-canvas ${activeScene > 0 ? 'fade-out' : ''}`}
      />

      {/* Scene 1: Black Background */}
      <div className={`scene scene-1 ${activeScene >= 1 ? 'active' : ''}`}>
        <div className="cyber-grid" />
        <div className="particle-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scene 2: Shield Logo Reveal */}
      {showShield && (
        <motion.div
          className="scene scene-2 active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="shield-container">
            {/* 3D Shield Logo */}
            <motion.div
              className="shield-3d"
              animate={{
                rotateY: 360,
                rotateZ: [0, 5, -5, 0],
              }}
              transition={{
                rotateY: { duration: 8, ease: 'easeInOut' },
                rotateZ: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <svg
                viewBox="0 0 200 240"
                className="shield-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Shield Outline */}
                <path
                  d="M 100 20 L 170 60 L 170 140 Q 100 220 100 220 Q 30 140 30 140 L 30 60 Z"
                  fill="none"
                  stroke="#00d9ff"
                  strokeWidth="3"
                  className="shield-outline"
                />

                {/* Shield Fill - Gradient */}
                <defs>
                  <linearGradient
                    id="shieldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00ff41" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 20 L 170 60 L 170 140 Q 100 220 100 220 Q 30 140 30 140 L 30 60 Z"
                  fill="url(#shieldGradient)"
                />

                {/* Checkmark inside shield */}
                <path
                  d="M 70 120 L 90 140 L 130 90"
                  fill="none"
                  stroke="#00ff41"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="checkmark"
                />
              </svg>

              {/* Binary Code Animation */}
              <motion.div
                className="binary-code"
                animate={{ rotateX: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <span className="binary">01010101</span>
              </motion.div>
            </motion.div>

            {/* Glitch Text */}
            <motion.div
              className="glitch-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <h1 className="title-glitch">
                <span className="glitch" data-text="SCAMSHIELD">
                  SCAMSHIELD
                </span>
              </h1>
              <p className="tagline-glitch">
                <span className="glitch-sub" data-text="Protecting You From Digital Scams">
                  Protecting You From Digital Scams
                </span>
              </p>
            </motion.div>

            {/* Glow Effects */}
            <div className="glow-effect glow-cyan" />
            <div className="glow-effect glow-green" />
          </div>
        </motion.div>
      )}

      {/* Scene 3: Cyber Scan Effect */}
      {showScan && (
        <motion.div
          className="scene scene-3 active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="scan-container">
            {/* Network Nodes */}
            <svg className="network-nodes" viewBox="0 0 400 400">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Nodes */}
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const x = 200 + Math.cos(angle) * 120;
                const y = 200 + Math.sin(angle) * 120;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill={i % 3 === 0 ? '#ff3b3b' : '#00d9ff'}
                      opacity="0.8"
                      filter="url(#glow)"
                      className={i % 3 === 0 ? 'node-danger' : 'node-safe'}
                    />
                  </g>
                );
              })}

              {/* Center Node */}
              <circle cx="200" cy="200" r="8" fill="#00ff41" filter="url(#glow)" />
            </svg>

            {/* Radar Scan Wave */}
            <motion.div
              className="radar-scan"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="scan-wave" />
            </motion.div>

            {/* Scan Text */}
            <motion.div
              className="scan-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p>SCANNING FOR THREATS...</p>
              <div className="scan-bar">
                <motion.div
                  className="scan-progress"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scene 4: Transition to Website */}
      {showTransition && (
        <motion.div
          className="scene scene-4 active"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
        >
          <div className="transition-wrapper">
            <motion.div
              className="transition-circle"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [1, 0.5, 0],
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <motion.div
              className="transition-text"
              animate={{ y: -50, opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <p>SECURE CONNECTION ESTABLISHED</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scan Lines Overlay */}
      <div className="scan-lines" />

      {/* Noise Texture */}
      <div className="noise-texture" />
    </div>
  );
}
