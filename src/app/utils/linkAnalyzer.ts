/**
 * ClickSafe - Advanced URL Analysis Engine
 * Detects scams, phishing, and malicious links
 */

// High-risk scam keywords
const SCAM_KEYWORDS = {
  verification: ['verify', 'verify-now', 'verifyaccount', 'verify_account', 'verification', 'reverify'],
  update: ['update', 'update-now', 'updateaccount', 'update_account'],
  security: ['secure', 'security', 'security-check', 'securelogin'],
  confirmation: ['confirm', 'confirmation', 'confirmemail', 'confirm_email'],
  login: ['login', 'signin', 'sign-in', 'sign_in', 'auth', 'authenticate'],
  password: ['reset', 'reset-password', 'password-reset', 'resetpassword', 'change-password'],
  account: ['unlock', 'account-unlock', 'accountunlock', 'suspended', 'blocked', 'hold'],
  kyc: ['kyc', 'kyc-update', 'kycupdate', 'aadhar', 'aadhaar', 'pan', 'pan-verify'],
  otp: ['otp', 'otp-verify', 'validate', 'validation'],
  payment: ['billing', 'payment', 'pay', 'upi', 'bank', 'wallet', 'transaction'],
  reward: ['refund', 'cashback', 'reward', 'bonus', 'prize', 'lottery', 'winner'],
  urgency: ['claim', 'claim-now', 'free', 'offer', 'limited', 'urgent', 'hurry', 'immediate'],
  alert: ['alert', 'warning', 'risk', 'fraud', 'suspicious', 'unusual'],
};

// Brand impersonation keywords
const BRAND_KEYWORDS = {
  banking: ['sbi', 'hdfc', 'icici', 'axis', 'boi', 'yes', 'kotak', 'idbi'],
  payments: ['paypal', 'paytm', 'phonepe', 'gpay', 'google-pay', 'amazon-pay'],
  ecommerce: ['amazon', 'flipkart', 'meesho', 'snapdeal', 'myntra'],
  social: ['facebook', 'instagram', 'whatsapp', 'telegram', 'twitter'],
  telecom: ['jio', 'airtel', 'vi', 'bsnl', 'mtnl'],
  government: ['gov', 'india', 'income-tax', 'uidai', 'ntas', 'portal'],
};

// URL shorteners (always high risk)
const URL_SHORTENERS = [
  'bit.ly',
  'tinyurl.com',
  'goo.gl',
  't.co',
  'cutt.ly',
  'rebrand.ly',
  'shorturl.at',
  'is.gd',
  'tiny.cc',
  'lnk.to',
  'vil.ltd',
  'short.link',
  'clck.ru',
  'ow.ly',
];

// Dangerous file extensions
const DANGEROUS_EXTENSIONS = ['.apk', '.exe', '.zip', '.rar', '.iso', '.js', '.html', '.bat', '.cmd'];

interface LinkAnalysisResult {
  riskLevel: 'SAFE' | 'SUSPICIOUS' | 'SCAM';
  scamScore: number;
  detectedKeywords: string[];
  detectedThreats: string[];
  safetyAdvice: string[];
}

export function analyzeLink(urlInput: string): LinkAnalysisResult {
  let score = 0;
  const detectedKeywords: string[] = [];
  const detectedThreats: string[] = [];

  try {
    // Normalize URL
    let urlStr = urlInput.trim().toLowerCase();
    if (!urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
      urlStr = 'https://' + urlStr;
    }

    const url = new URL(urlStr);
    const fullUrl = url.toString();
    const domain = url.hostname;
    const path = url.pathname + url.search;

    // 1️⃣ Check for URL shorteners
    const isShortener = URL_SHORTENERS.some((shortener) => domain.includes(shortener));
    if (isShortener) {
      score += 30;
      detectedKeywords.push('URL Shortener');
      detectedThreats.push('URL shorteners hide the real destination');
    }

    // 2️⃣ Check for dangerous file extensions
    const hasDangerousExt = DANGEROUS_EXTENSIONS.some((ext) => fullUrl.includes(ext));
    if (hasDangerousExt) {
      score += 25;
      detectedKeywords.push('Dangerous File');
      detectedThreats.push('URL contains executable or archive file');
    }

    // 3️⃣ Check for IP-based URLs
    const ipPattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (ipPattern.test(domain)) {
      score += 30;
      detectedKeywords.push('IP Address');
      detectedThreats.push('URL uses IP address instead of domain name');
    }

    // 4️⃣ Check for suspicious domain patterns
    const suspiciousSuffixes = ['-login', '-secure', '-verification', '-support', '-helpdesk', '-update', '-service', '-alert', '-check', '-notice'];
    const hasSuspiciousSuffix = suspiciousSuffixes.some((suffix) => domain.includes(suffix));
    if (hasSuspiciousSuffix) {
      score += 15;
      detectedKeywords.push('Suspicious Domain Pattern');
      detectedThreats.push('Domain name contains suspicious patterns');
    }

    // 5️⃣ Check for excessive subdomains
    const subdomainCount = domain.split('.').length;
    if (subdomainCount > 4) {
      score += 15;
      detectedKeywords.push('Excessive Subdomains');
      detectedThreats.push(`Too many subdomains (${subdomainCount})`);
    }

    // 6️⃣ Check for '@' symbol (email spoofing)
    if (fullUrl.includes('@')) {
      score += 25;
      detectedKeywords.push('Email Spoofing');
      detectedThreats.push('URL contains @ symbol (email spoofing technique)');
    }

    // 7️⃣ Check for HTTP (not HTTPS)
    if (url.protocol === 'http:') {
      score += 15;
      detectedKeywords.push('No HTTPS');
      detectedThreats.push('Site does not use HTTPS encryption');
    }

    // 8️⃣ Check for scam keywords in URL
    let highRiskKeywordFound = false;
    Object.entries(SCAM_KEYWORDS).forEach(([category, keywords]) => {
      keywords.forEach((keyword) => {
        if (path.includes(keyword) || domain.includes(keyword)) {
          if (['kyc', 'otp', 'login', 'verification'].includes(category)) {
            score += 25;
            highRiskKeywordFound = true;
          } else if (['payment', 'update', 'security'].includes(category)) {
            score += 20;
          } else {
            score += 15;
          }
          if (!detectedKeywords.includes(keyword)) {
            detectedKeywords.push(keyword);
          }
        }
      });
    });

    // 9️⃣ Check for brand impersonation
    Object.entries(BRAND_KEYWORDS).forEach(([category, brands]) => {
      brands.forEach((brand) => {
        if (domain.includes(brand) && !domain.endsWith(brand + '.com') && !domain.endsWith(brand + '.in')) {
          score += 25;
          if (!detectedKeywords.includes(`${brand} impersonation`)) {
            detectedKeywords.push(`${brand} impersonation`);
          }
          detectedThreats.push(`Domain appears to impersonate ${brand}`);
        }
      });
    });

    // 🔟 Normalize score
    score = Math.min(100, score);

    // Determine risk level
    let riskLevel: 'SAFE' | 'SUSPICIOUS' | 'SCAM';
    if (score >= 51) {
      riskLevel = 'SCAM';
    } else if (score >= 26) {
      riskLevel = 'SUSPICIOUS';
    } else {
      riskLevel = 'SAFE';
    }

    // Generate safety advice
    const safetyAdvice: string[] = [];
    if (riskLevel === 'SCAM') {
      safetyAdvice.push('🛑 DO NOT click this link - it appears to be a scam');
      safetyAdvice.push('❌ Do not enter any personal or financial information');
    } else if (riskLevel === 'SUSPICIOUS') {
      safetyAdvice.push('⚠️ Be cautious with this link');
      safetyAdvice.push('🔍 Hover to see the actual URL before clicking');
    } else {
      safetyAdvice.push('✅ This link appears safe');
      safetyAdvice.push('🔒 Always verify the domain and HTTPS before entering sensitive info');
    }

    safetyAdvice.push('📞 If unsure, contact the organization directly using a known phone number');
    safetyAdvice.push('🚨 Report suspicious links to cyber.nic.in');

    return {
      riskLevel,
      scamScore: score,
      detectedKeywords,
      detectedThreats,
      safetyAdvice,
    };
  } catch (error) {
    // Invalid URL
    return {
      riskLevel: 'SUSPICIOUS',
      scamScore: 40,
      detectedKeywords: ['Invalid URL'],
      detectedThreats: ['URL format appears invalid or malformed'],
      safetyAdvice: [
        '⚠️ This URL cannot be parsed properly',
        '🛑 Do not click on malformed URLs',
        '📋 Copy the full URL and check carefully before visiting',
      ],
    };
  }
}
