import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './AIIntro.css';

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
  danger: boolean;
}

export function AIIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [showBrain, setShowBrain] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showReticle, setShowReticle] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showThreat, setShowThreat] = useState(false);
  const nodesRef = useRef<NeuralNode[]>([]);

  // Initialize neural nodes
  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const nodes: NeuralNode[] = [];

    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const distance = 80 + Math.random() * 60;
      nodes.push({
        id: i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: Math.random() - 0.5,
        vy: Math.random() - 0.5,
        active: false,
        danger: Math.random() > 0.85,
      });
    }

    // Add center node
    nodes.push({
      id: 999,
      x: centerX,
      y: centerY,
      vx: 0,
      vy: 0,
      active: true,
      danger: false,
    });

    nodesRef.current = nodes;
  }, []);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Clear with cyber fog effect
      ctx.fillStyle = 'rgba(5, 11, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(5, 11, 20, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update nodes positions
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      nodesRef.current.forEach((node, index) => {
        if (node.id !== 999) {
          // Gentle drift movement
          node.x += node.vx * 0.2;
          node.y += node.vy * 0.2;

          // Keep nodes within bounds
          const dx = node.x - centerX;
          const dy = node.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          if (dist > maxDist) {
            const angle = Math.atan2(dy, dx);
            node.x = centerX + Math.cos(angle) * maxDist;
            node.y = centerY + Math.sin(angle) * maxDist;
          }
        }

        // Activate nodes gradually
        if (currentScene >= 1) {
          if (Math.random() > 0.95) {
            node.active = true;
          }
        }
      });

      // Draw neural connections
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
      ctx.lineWidth = 1;

      nodesRef.current.forEach((node, i) => {
        if (currentScene >= 2 && node.active) {
          nodesRef.current.forEach((otherNode, j) => {
            if (i < j) {
              const dx = node.x - otherNode.x;
              const dy = node.y - otherNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);

                if (node.danger || otherNode.danger) {
                  ctx.strokeStyle = `rgba(255, 59, 59, ${0.5 - dist / 300})`;
                } else {
                  ctx.strokeStyle = `rgba(0, 229, 255, ${0.3 - dist / 500})`;
                }

                ctx.stroke();
              }
            }
          });
        }
      });

      // Draw neural nodes
      nodesRef.current.forEach((node) => {
        const pulseSize = node.active ? 3 + Math.sin(frameCount * 0.05) * 1.5 : 2;

        if (node.danger && node.active) {
          ctx.fillStyle = '#FF3B3B';
          ctx.shadowColor = '#FF3B3B';
          ctx.shadowBlur = 15;
        } else {
          ctx.fillStyle = node.active ? '#00FF7F' : '#00E5FF';
          ctx.shadowColor = node.active ? '#00FF7F' : '#00E5FF';
          ctx.shadowBlur = node.active ? 12 : 8;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw pulsing data lines (energy flowing)
      if (currentScene >= 2) {
        const centerNode = nodesRef.current.find((n) => n.id === 999);
        if (centerNode) {
          nodesRef.current.forEach((node, index) => {
            if (node.id !== 999 && node.active) {
              const progress = (frameCount * 2 + index * 10) % 100;
              const t = progress / 100;

              const x = centerNode.x + (node.x - centerNode.x) * t;
              const y = centerNode.y + (node.y - centerNode.y) * t;

              ctx.fillStyle = node.danger
                ? `rgba(255, 59, 59, ${0.5 * (1 - Math.abs(t - 0.5) * 2)})`
                : `rgba(0, 255, 127, ${0.5 * (1 - Math.abs(t - 0.5) * 2)})`;
              ctx.shadowColor = node.danger ? '#FF3B3B' : '#00FF7F';
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          });
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentScene]);

  // Scene timeline
  useEffect(() => {
    const timeline = [
      { scene: 0, duration: 2500, action: () => setShowBrain(true) },
      { scene: 1, duration: 2500, action: () => setShowNetwork(true) },
      { scene: 2, duration: 2500, action: () => setShowReticle(true) },
      { scene: 3, duration: 2500, action: () => setShowLogo(true) },
      { scene: 4, duration: 2500, action: () => setShowThreat(true) },
    ];

    let currentTime = 0;

    timeline.forEach((item) => {
      setTimeout(() => {
        setCurrentScene(item.scene);
        item.action();
      }, currentTime);

      currentTime += item.duration;
    });

    setTimeout(onComplete, currentTime + 1000);
  }, [onComplete]);

  return (
    <div className="ai-intro">
      {/* Background Canvas - Neural Network */}
      <canvas ref={canvasRef} className="neural-canvas" />

      {/* Cyber Fog Background */}
      <div className="cyber-fog" />

      {/* Scene 1: AI Brain Introduction */}
      {showBrain && (
        <motion.div
          className="scene scene-ai-brain active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="brain-container">
            <motion.div
              className="holographic-brain"
              animate={{
                scale: [0.8, 1.1, 1],
                rotateZ: [0, 360],
              }}
              transition={{
                scale: { duration: 2, times: [0, 0.5, 1] },
                rotateZ: { duration: 8, ease: 'linear' },
              }}
            >
              <svg viewBox="0 0 200 200" className="brain-svg">
                <defs>
                  <filter id="brainGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#00FF7F" />
                  </linearGradient>
                </defs>

                {/* Brain outline */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="url(#brainGrad)"
                  strokeWidth="2"
                  opacity="0.6"
                  filter="url(#brainGlow)"
                />

                {/* Brain lobes */}
                <path
                  d="M 80 50 Q 50 70 60 100 Q 50 130 80 150"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                <path
                  d="M 120 50 Q 150 70 140 100 Q 150 130 120 150"
                  fill="none"
                  stroke="#00FF7F"
                  strokeWidth="1.5"
                  opacity="0.5"
                />

                {/* Center connection */}
                <circle cx="100" cy="100" r="8" fill="#00E5FF" opacity="0.8" />
              </svg>

              {/* Pulsing glow ring */}
              <motion.div
                className="brain-pulse-ring"
                animate={{ scale: [0.8, 1.3], opacity: [1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* "AI AWAKENING" text */}
            <motion.div
              className="ai-awakening-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="awakening-label">AI NEURAL ENGINE</p>
              <p className="awakening-sublabel">INITIALIZING...</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Scene 2: Neural Network Expansion */}
      {showNetwork && (
        <motion.div
          className="scene scene-network active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="network-info">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="network-title"
            >
              NEURAL NETWORK
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="network-subtitle"
            >
              Expanding detection matrix across threat landscape
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Scene 3: Cyber Reticle & HUD */}
      {showReticle && (
        <motion.div
          className="scene scene-reticle active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Scanning reticles */}
          <motion.div
            className="reticle-container"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="reticle reticle-1" />
            <div className="reticle reticle-2" />
            <div className="reticle reticle-3" />
          </motion.div>

          {/* Crosshair */}
          <div className="crosshair">
            <div className="crosshair-h" />
            <div className="crosshair-v" />
            <motion.div
              className="crosshair-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* HUD Elements */}
          <motion.div
            className="hud-element hud-top-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="hud-label">THREAT SCAN</span>
            <span className="hud-value">87%</span>
          </motion.div>

          <motion.div
            className="hud-element hud-top-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="hud-label">NETWORK STATUS</span>
            <span className="hud-value online">ONLINE</span>
          </motion.div>

          {/* Scanning beam */}
          <motion.div
            className="scan-beam"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}

      {/* Scene 4: Logo & Brand Reveal */}
      {showLogo && (
        <motion.div
          className="scene scene-logo active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="logo-emergence"
            animate={{
              scale: [0.5, 1],
              rotateZ: [45, 0],
            }}
            transition={{ duration: 2 }}
          >
            {/* 3D Shield from Brain */}
            <svg viewBox="0 0 200 240" className="shield-logo-svg">
              <defs>
                <filter id="shieldGlow">
                  <feGaussianBlur stdDeviation="3" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FF7F" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <path
                d="M 100 20 L 170 60 L 170 140 Q 100 220 100 220 Q 30 140 30 140 L 30 60 Z"
                fill="url(#shieldGrad)"
                stroke="#00E5FF"
                strokeWidth="3"
                opacity="0.9"
                filter="url(#shieldGlow)"
              />

              {/* Checkmark */}
              <path
                d="M 70 120 L 90 140 L 130 90"
                fill="none"
                stroke="#00FF7F"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </motion.div>

          {/* Glitch Brand Text */}
          <motion.div
            className="brand-reveal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h1 className="brand-title glitch-text" data-text="SCAMSHIELD">
              SCAMSHIELD
            </h1>
            <p className="brand-subtitle">AI-Powered Scam Detection & Link Protection</p>
          </motion.div>

          {/* Energy pulses */}
          <motion.div className="energy-pulse pulse-1" />
          <motion.div className="energy-pulse pulse-2" />
        </motion.div>
      )}

      {/* Scene 5: Threat Detection */}
      {showThreat && (
        <motion.div
          className="scene scene-threat active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="threat-container">
            {/* Threat nodes */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="threat-node"
                style={{
                  left: `${25 + i * 25}%`,
                  top: `${30 + i * 10}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  backgroundColor: [
                    'rgba(0, 229, 255, 0.8)',
                    'rgba(255, 59, 59, 0.8)',
                    'rgba(0, 255, 127, 0.8)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                }}
              >
                <motion.div className="threat-warning" />
              </motion.div>
            ))}

            {/* Risk meter */}
            <motion.div
              className="risk-meter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="meter-label">THREAT LEVEL</div>
              <motion.div
                className="meter-bar"
                initial={{ width: '0%' }}
                animate={{ width: '92%' }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Security lock animation */}
            <motion.div
              className="security-lock"
              animate={{ scale: [0.8, 1], rotate: [0, 360] }}
              transition={{ duration: 2, delay: 1 }}
            >
              <svg viewBox="0 0 100 100" className="lock-svg">
                <path
                  d="M 30 50 L 30 40 Q 30 25 50 25 Q 70 25 70 40 L 70 50 M 35 50 L 65 50 Q 70 50 70 55 L 70 80 Q 70 85 65 85 L 35 85 Q 30 85 30 80 L 30 55 Q 30 50 35 50"
                  fill="none"
                  stroke="#00FF7F"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <circle cx="50" cy="65" r="5" fill="#00FF7F" opacity="0.8" />
              </svg>
            </motion.div>

            <motion.p
              className="threat-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              THREATS DETECTED & NEUTRALIZED
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Overlay Elements */}
      <div className="hud-overlay" />
      <div className="scan-lines-ai" />
      <div className="noise-texture-ai" />

      {/* Digital grid floor */}
      <div className="digital-grid-floor" />
    </div>
  );
}
