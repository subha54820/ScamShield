import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, X, CheckCircle } from 'lucide-react';
import './ContactForm.css';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    problemDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^[\d+\-() ]{10,}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required';
    } else if (formData.problemDescription.trim().length < 10) {
      newErrors.problemDescription = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via FormSubmit or similar service
      // For now, we'll use a simple API call
      const response = await fetch('https://formspree.io/f/xnqqdrrv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.mobileNumber,
          message: formData.problemDescription,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            fullName: '',
            email: '',
            mobileNumber: '',
            problemDescription: '',
          });
        }, 2500);
      } else {
        setErrors({ submit: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="contact-form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="contact-form-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="contact-form-header">
          <div className="contact-form-title">
            <Mail className="w-5 h-5" />
            <h2>Contact ScamShield Support</h2>
          </div>
          <button className="contact-form-close" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Message */}
        {submitted ? (
          <motion.div
            className="contact-success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-12 h-12" />
            <h3>Message Sent Successfully!</h3>
            <p>Your message has been securely sent to ScamShield support.</p>
            <p className="success-subtitle">We'll get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-content">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@gmail.com"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Mobile Number */}
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX or (XXX) XXX-XXXX"
                className={errors.mobileNumber ? 'error' : ''}
              />
              {errors.mobileNumber && <span className="form-error">{errors.mobileNumber}</span>}
            </div>

            {/* Problem Description */}
            <div className="form-group">
              <label htmlFor="problemDescription">Problem Description *</label>
              <textarea
                id="problemDescription"
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
                placeholder="Describe your issue or question..."
                rows={4}
                className={errors.problemDescription ? 'error' : ''}
              />
              {errors.problemDescription && (
                <span className="form-error">{errors.problemDescription}</span>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && <div className="form-error-box">{errors.submit}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-form-submit"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>

            <p className="contact-form-disclaimer">
              Your message will be securely sent to our support team. No data is stored permanently.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
