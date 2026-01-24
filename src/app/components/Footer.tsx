import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Mail, Heart, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { ContactForm } from './ContactForm';
import './Footer.css';

export function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Message Analyzer', path: '/message-analyzer' },
      { label: 'Link Checker', path: '/link-checker' },
      { label: 'Report Scam', path: '/report' },
      { label: 'How It Works', path: '/#how-it-works' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press Kit', path: '/press' },
    ],
    legal: [
      { label: 'Terms & Conditions', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Security', path: '/security' },
      { label: 'Disclaimer', path: '/disclaimer' },
    ],
    support: [
      { label: 'Documentation', path: '/docs' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Support Center', path: '/support' },
    ],
  };

  const socialLinks = [
    { icon: Github, url: 'https://github.com/NISHIKANTA123859', label: 'GitHub' },
    { icon: Linkedin, url: 'https://www.linkedin.com/in/nishikanta-sethi-4a4657255/', label: 'LinkedIn' },
    { icon: Twitter, url: '#', label: 'Twitter' },
  ];

  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-container">
            {/* Brand Section */}
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="brand-logo">
                <Shield className="w-8 h-8" />
                <span>ScamShield</span>
              </div>
              <p className="brand-description">
                Protecting users from digital scams with AI-powered detection and real-time analysis.
              </p>
              <div className="brand-cta">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="contact-btn"
                >
                  <Mail className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>
            </motion.div>

            {/* Links Grid */}
            <div className="footer-links-grid">
              {Object.entries(footerLinks).map(([category, links]) => (
                <motion.div
                  key={category}
                  className="footer-links-section"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="section-title">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <ul className="links-list">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path} className="footer-link">
                          {link.label}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              {/* Left - Copyright */}
              <div className="copyright">
                <p>
                  © {currentYear} ScamShield. All rights reserved. |{' '}
                  <span className="made-with">
                    Made with <Heart className="w-4 h-4" /> for user safety
                  </span>
                </p>
              </div>

              {/* Center - Quick Links */}
              <div className="quick-links">
                <Link to="/terms" className="quick-link">
                  Terms
                </Link>
                <Link to="/privacy" className="quick-link">
                  Privacy
                </Link>
                <button onClick={() => setShowContactForm(true)} className="quick-link">
                  Contact
                </button>
              </div>

              {/* Right - Social Links */}
              <div className="social-links">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      title={social.label}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="footer-disclaimer">
              <p>
                <strong>Disclaimer:</strong> ScamShield is an informational tool. Analysis results are
                advisory only. Always verify independently and use your own judgment.
              </p>
            </div>
          </div>
        </div>

        {/* Gradient Background */}
        <div className="footer-bg" />
      </footer>

      {/* Contact Form Modal */}
      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </>
  );
}
