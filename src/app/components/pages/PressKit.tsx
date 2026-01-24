import { motion } from 'motion/react';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function PressKit() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(''), 2000);
  };

  const brandElements = [
    {
      id: 'logo-light',
      title: 'Logo - Light Background',
      description: 'Use on light backgrounds',
      value: 'ScamShield_Logo_Light.png',
    },
    {
      id: 'logo-dark',
      title: 'Logo - Dark Background',
      description: 'Use on dark backgrounds',
      value: 'ScamShield_Logo_Dark.png',
    },
    {
      id: 'color-cyan',
      title: 'Primary Color (Cyan)',
      description: 'Main accent color',
      value: '#00d9ff',
    },
    {
      id: 'color-green',
      title: 'Secondary Color (Green)',
      description: 'Success and secondary accent',
      value: '#00ff41',
    },
    {
      id: 'color-dark',
      title: 'Background Color (Dark)',
      description: 'Primary background',
      value: '#0a0e27',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#131829] to-[#0a0e27] pt-24">
      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Press <span className="text-[#00d9ff]">Kit</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Official branding materials, product descriptions, and media resources for ScamShield
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Description */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Official Product Description</h2>
            <div className="bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 rounded-xl p-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>ScamShield</strong> is an AI-powered cybersecurity platform designed to protect users from digital scams and online fraud. Using advanced machine learning algorithms, ScamShield analyzes messages and links in real-time to detect suspicious patterns, phishing attempts, and scam indicators.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Built with accessibility in mind, ScamShield supports multiple languages including English and Odia, making digital safety accessible to millions. The platform combines awareness, prevention, and education to empower users to make informed decisions online.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With over 1.2M scams detected and 523K users protected, ScamShield is committed to making the internet safer, starting with India and expanding globally.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Guidelines */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12"
          >
            Brand <span className="text-[#00d9ff]">Guidelines</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Brand Elements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Brand Elements</h3>
              <div className="space-y-4">
                {brandElements.map((element) => (
                  <div
                    key={element.id}
                    className="p-4 rounded-lg bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20 group hover:border-[#00d9ff]/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-white text-sm">{element.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{element.description}</p>
                        <p className="text-[#00d9ff] text-xs mt-2 font-mono">{element.value}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(element.value, element.id)}
                        className="flex-shrink-0 p-2 hover:bg-[#00d9ff]/20 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied === element.id ? (
                          <Check className="w-4 h-4 text-[#00ff41]" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#00d9ff]" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Usage Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Usage Guidelines</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                  <h4 className="font-bold text-white mb-3">Logo Usage</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Use ScamShield_Logo_Light on light backgrounds</li>
                    <li>• Use ScamShield_Logo_Dark on dark backgrounds</li>
                    <li>• Maintain minimum clear space around logo</li>
                    <li>• Don't distort, rotate, or alter the logo</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                  <h4 className="font-bold text-white mb-3">Typography</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Primary Font: Inter, Roboto</li>
                    <li>• Use for clean, modern appearance</li>
                    <li>• Maintain proper contrast ratios</li>
                    <li>• Always pair with brand colors</li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                  <h4 className="font-bold text-white mb-3">Media Usage</h4>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Attribute to ScamShield when possible</li>
                    <li>• Link back to scamshield.com</li>
                    <li>• Don't misrepresent or alter materials</li>
                    <li>• Contact for additional permissions</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#00d9ff]/5 to-[#00ff41]/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Company Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
                <div className="space-y-3 text-gray-400">
                  <p>
                    <strong>Media Contact:</strong><br />
                    media@scamshield.com
                  </p>
                  <p>
                    <strong>General Inquiries:</strong><br />
                    contact@scamshield.com
                  </p>
                  <p>
                    <strong>Website:</strong><br />
                    www.scamshield.com
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-xl bg-gradient-to-br from-[#1a1f3a]/60 to-[#131829]/60 border border-[#00d9ff]/20">
                <h3 className="text-xl font-bold text-white mb-4">Company Details</h3>
                <div className="space-y-3 text-gray-400">
                  <p>
                    <strong>Founded:</strong> 2025
                  </p>
                  <p>
                    <strong>Focus:</strong> AI-Powered Cybersecurity
                  </p>
                  <p>
                    <strong>Mission:</strong> Protect users from digital scams
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="px-6 py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Download Resources</h2>
            <p className="text-gray-300 mb-8">
              Complete media kit with logos, brand guidelines, and high-resolution images
            </p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00d9ff] to-[#00ff41] text-[#0a0e27] rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,217,255,0.6)] transition-all hover:-translate-y-1">
              <Download className="w-5 h-5" />
              Download Complete Press Kit
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
