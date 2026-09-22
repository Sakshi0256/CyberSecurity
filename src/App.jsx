import { useState, useMemo, useEffect } from "react";
import {
  Shield,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Lock,
  MailWarning,
  Smartphone,
  Globe,
  Database,
  KeyRound,
  Users,
  Award,
  ChevronDown,
  Check,
  AlertTriangle,
  Zap,
  Play,
  BookOpen,
  Phone,
  ExternalLink,
  Video,
} from "lucide-react";

// ============================================
// TOPICS DATA (VIDEO + ARTICLE)
// ============================================
const topics = [
  {
    id: "protect-identity",
    icon: Lock,
    title: "Protect Identity",
    description:
      "Learn how to safeguard your personal information, online accounts and digital identity from theft and misuse.",
    level: "Essential",
    videoSrc: "/videos/protect-identity.mp4",
    videoTitle: "How to Protect Your Digital Identity",
    article: `Your digital identity is the collection of all information about you online...

Key steps to protect your identity:
• Use strong, unique passwords for every account
• Enable multi-factor authentication (MFA) wherever possible
• Never share personal details on unverified websites
• Monitor your accounts regularly for suspicious activity
• Be cautious about what you post publicly on social media
• Use a password manager to keep credentials secure
• Freeze your credit if you suspect identity theft

Remember: Your identity is valuable. Treat it like you would treat your passport or wallet.`,
  },
  {
    id: "react-quickly",
    icon: Zap,
    title: "React Quickly",
    description:
      "Know exactly what to do when you suspect a security incident — from detection to containment and recovery.",
    level: "Practical",
    videoSrc: "/videos/react-quickly.mp4",
    videoTitle: "Incident Response: What To Do First",
    article: `When a cyber incident occurs, every second counts...

Immediate response steps:
1. Disconnect — If you suspect malware or unauthorized access, disconnect the device from the internet immediately.
2. Don't panic-delete — Preserve evidence. Screenshot suspicious activity before removing anything.
3. Change passwords — From a different, trusted device, change passwords for affected accounts.
4. Enable MFA — If not already enabled, turn on multi-factor authentication right away.
5. Report — Notify your IT/security team, bank, or relevant authorities.
6. Monitor — Watch for unusual activity on all accounts for weeks afterward.`,
  },
  {
    id: "spot-threats",
    icon: AlertTriangle,
    title: "Spot Threats",
    description:
      "Develop the ability to recognize suspicious activity, malicious links and attack attempts before they cause damage.",
    level: "Essential",
    videoSrc: "/videos/spot-threats.mp4",
    videoTitle: "How to Spot a Cyber Threat",
    article: `Threats often hide in plain sight...

Red flags to watch for:
• Urgency — "Act now or your account will be closed!"
• Spelling/grammar errors
• Mismatched sender address
• Suspicious links — Hover over links before clicking
• Unexpected attachments
• Requests for personal info
• Too-good-to-be-true offers
• Pressure to bypass normal procedures`,
  },
  {
    id: "phishing-scams",
    icon: MailWarning,
    title: "Phishing & Scams",
    description:
      "Identify suspicious emails, fake websites, malicious links and social engineering attacks before you click.",
    level: "Essential",
    videoSrc: "/videos/phishing-scams.mp4",
    videoTitle: "Phishing Attacks Explained",
    article: `Phishing is the #1 way attackers gain access to accounts and systems...

How phishing works:
1. Attacker creates a fake message that looks legitimate
2. The message creates urgency or curiosity
3. You click a link or open an attachment
4. Malware installs or you're taken to a fake login page
5. Your credentials or data are stolen`,
  },
  {
    id: "passwords",
    icon: KeyRound,
    title: "Passwords",
    description:
      "Build stronger authentication habits and understand why multi-factor authentication (MFA) is essential.",
    level: "Essential",
    videoSrc: "/videos/passwords.mp4",
    videoTitle: "Password Security & MFA Guide",
    article: `Passwords are the keys to your digital life...

What makes a strong password:
• Length matters most — aim for 12+ characters
• Mix uppercase, lowercase, numbers, and symbols
• Avoid dictionary words, names, and dates
• Never reuse passwords across accounts
• Use a passphrase — four random words strung together`,
  },
  {
    id: "safe-browsing",
    icon: Globe,
    title: "Safe Browsing",
    description:
      "Understand unsafe websites, malicious downloads, browser threats and secure online behavior.",
    level: "Practical",
    videoSrc: "/videos/safe-browsing.mp4",
    videoTitle: "Safe Browsing Practices",
    article: `The web is full of both legitimate and malicious content...

Before you click:
• Hover over links to see the real destination
• Check for HTTPS (the padlock)
• Look for misspellings in domain names
• Be wary of shortened URLs
• Don't download files from untrusted sources`,
  },
  {
    id: "data-protection",
    icon: Database,
    title: "Data Protection",
    description:
      "Learn how sensitive information gets exposed and what you can do to protect it.",
    level: "Advanced",
    videoSrc: "/videos/data-protection.mp4",
    videoTitle: "Protecting Your Data",
    article: `Data is the new currency...

Types of sensitive data:
• Personal Identifiable Information (PII)
• Financial data
• Health information
• Credentials
• Business data

Backup strategy (3-2-1 rule):
• 3 copies of important data
• 2 different storage types
• 1 copy stored offsite/offline`,
  },
  {
    id: "device-security",
    icon: Smartphone,
    title: "Device Security",
    description:
      "Protect your phones, laptops and personal devices from common attacks and unauthorized access.",
    level: "Practical",
    videoSrc: "/videos/device-security.mp4",
    videoTitle: "Device Security Essentials",
    article: `Your devices hold your entire digital life...

Essential device protection:
• Use a strong PIN, password, or biometric lock
• Enable automatic screen lock (30 seconds to 1 minute)
• Turn on device encryption
• Keep OS and apps updated
• Enable "Find My Device"
• Set up remote wipe capability`,
  },
  {
    id: "security-hygiene",
    icon: Shield,
    title: "Security Hygiene",
    description:
      "Develop simple everyday habits that reduce your risk across work and personal environments.",
    level: "Essential",
    videoSrc: "/videos/security-hygiene.mp4",
    videoTitle: "Everyday Security Habits",
    article: `Security hygiene is about small, consistent habits...

Daily habits:
• Lock your screen every time you step away
• Think before you click — pause and verify
• Don't plug in unknown USB drives
• Avoid oversharing on social media
• Log out of accounts when done
• Use a VPN on untrusted networks`,
  },
];

// ============================================
// SECURITY TIPS (Hero carousel)
// ============================================
const securityTips = [
  {
    icon: MailWarning,
    title: "Think before you click",
    text: "Hover over links to preview the real destination before trusting any email or message.",
  },
  {
    icon: KeyRound,
    title: "Use a passphrase",
    text: "Four random words beat a complex short password. Length is what makes it strong.",
  },
  {
    icon: Smartphone,
    title: "Lock your devices",
    text: "Enable a PIN or biometric lock so a lost phone doesn't become a data breach.",
  },
  {
    icon: Shield,
    title: "Turn on MFA",
    text: "One extra step blocks 99% of automated account takeover attempts. Always enable it.",
  },
  {
    icon: Globe,
    title: "Verify the URL",
    text: "Check for misspellings and stick to HTTPS. Small clues stop big scams.",
  },
];

// ============================================
// QUIZ QUESTION POOL
// ============================================
const quizPool = [
  {
    question:
      "You receive an email saying your bank account will be suspended in 10 minutes. What should you do?",
    options: [
      "Click the link immediately",
      "Reply with your account details",
      "Open your bank's official website directly",
      "Forward the email to friends",
    ],
    correct: 2,
  },
  {
    question: "Which password is the strongest?",
    options: [
      "password123",
      "Sakshi@123",
      "Summer2026!",
      "A long unique passphrase with multiple words",
    ],
    correct: 3,
  },
  {
    question: "What does MFA provide?",
    options: [
      "A faster internet connection",
      "An additional authentication factor",
      "Automatic antivirus protection",
      "A backup of your files",
    ],
    correct: 1,
  },
  {
    question:
      "You get a text saying you've won a prize and need to click a link to claim it. What's the safest action?",
    options: [
      "Click the link to see what you won",
      "Reply with your address",
      "Delete the message and report it as spam",
      "Share the link with friends",
    ],
    correct: 2,
  },
  {
    question: "Which of these is a sign of a phishing email?",
    options: [
      "It comes from someone you know",
      "It uses urgent language asking you to act immediately",
      "It has your correct name",
      "It arrives during business hours",
    ],
    correct: 1,
  },
  {
    question: "What should you do before downloading software?",
    options: [
      "Download from any site that offers it free",
      "Only download from official/trusted sources",
      "Disable antivirus first",
      "Ask a friend to send it to you",
    ],
    correct: 1,
  },
  {
    question:
      "You're on public Wi-Fi at a coffee shop. What's the safest practice?",
    options: [
      "Log into your bank account quickly",
      "Use a VPN and avoid sensitive logins",
      "Share the network password with others",
      "Disable your firewall for better speed",
    ],
    correct: 1,
  },
  {
    question:
      "What is the best response if you suspect your device has malware?",
    options: [
      "Keep using it normally",
      "Disconnect from the internet and run a scan",
      "Delete all your files",
      "Restart and hope it goes away",
    ],
    correct: 1,
  },
  {
    question: "Which of these is a good security habit?",
    options: [
      "Using the same password everywhere",
      "Sharing passwords with close friends",
      "Locking your screen when stepping away",
      "Disabling automatic updates",
    ],
    correct: 2,
  },
  {
    question: "What does HTTPS in a website address indicate?",
    options: [
      "The website is completely safe",
      "The connection is encrypted",
      "The website is government-approved",
      "The website cannot be hacked",
    ],
    correct: 1,
  },
  {
    question: "How often should you update your software?",
    options: [
      "Never — updates slow things down",
      "Once a year",
      "As soon as updates are available",
      "Only when something breaks",
    ],
    correct: 2,
  },
  {
    question: "What is social engineering?",
    options: [
      "Building social media platforms",
      "Manipulating people into revealing information",
      "A type of firewall",
      "Encrypting social data",
    ],
    correct: 1,
  },
  {
    question: "Which is the safest way to store passwords?",
    options: [
      "In a notebook under your keyboard",
      "In a text file on your desktop",
      "In a reputable password manager",
      "In your email drafts",
    ],
    correct: 2,
  },
  {
    question:
      "What should you do if you accidentally click a phishing link?",
    options: [
      "Ignore it and move on",
      "Change your passwords immediately and run a scan",
      "Send your password to verify",
      "Turn off your computer forever",
    ],
    correct: 1,
  },
  {
    question:
      "Why is it risky to use the same password on multiple sites?",
    options: [
      "It's harder to remember",
      "If one site is breached, all your accounts are at risk",
      "It makes websites load slower",
      "It's against the law",
    ],
    correct: 1,
  },
];

// Helper: shuffle array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Helper: pick N random questions from pool
const pickRandomQuestions = (pool, count = 5) => {
  return shuffleArray(pool).slice(0, count);
};

// ============================================
// HELPLINE DATA
// ============================================
const helplines = [
  {
    region: "India — National Cyber Crime Helpline",
    number: "1930",
    description:
      "Report cybercrime incidents including financial fraud, identity theft, and online harassment.",
    website: "https://cybercrime.gov.in",
  },
  {
    region: "India — Cyber Crime Portal",
    number: "cybercrime.gov.in",
    description:
      "File complaints online for cyber fraud, hacking, and other cyber offenses.",
    website: "https://cybercrime.gov.in",
  },
  {
    region: "USA — FBI Internet Crime Complaint Center",
    number: "ic3.gov",
    description:
      "Report internet-related crimes including fraud, identity theft, and hacking.",
    website: "https://ic3.gov",
  },
  {
    region: "Emergency — Police",
    number: "112 / 100",
    description: "For immediate emergencies, contact local police directly.",
    website: "",
  },
];

const faqs = [
  {
    question: "Who should attend this workshop?",
    answer:
      "The workshop is designed for students, employees, professionals and anyone who uses email, smartphones, computers or online services.",
  },
  {
    question: "Do I need technical cybersecurity knowledge?",
    answer:
      "No. The workshop is beginner-friendly and focuses on practical security habits rather than complex technical concepts.",
  },
  {
    question: "Is the workshop hands-on?",
    answer:
      "Yes. Participants work through realistic examples, phishing scenarios and an interactive security quiz.",
  },
  {
    question: "What will I learn?",
    answer:
      "You will learn how to recognize phishing, protect accounts, secure devices, browse safely and respond to common security situations.",
  },
];

// ============================================
// MAIN APP
// ============================================
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  // Hero tips carousel
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((i) => (i + 1) % securityTips.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState(() =>
    pickRandomQuestions(quizPool, 5)
  );
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = quizQuestions[quizIndex];

  const handleQuizAnswer = (index) => {
    if (quizAnswered) return;
    setSelectedAnswer(index);
    setQuizAnswered(true);
    if (index === currentQuestion.correct) {
      setQuizScore((score) => score + 1);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((index) => index + 1);
      setQuizAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizQuestions(pickRandomQuestions(quizPool, 5));
    setQuizIndex(0);
    setQuizScore(0);
    setQuizAnswered(false);
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openTopic = (topic) => setActiveTopic(topic);
  const closeTopic = () => setActiveTopic(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-white">
      {/* Fade-slide animation for tips */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-15%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <Shield className="text-cyan-400" size={23} />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold tracking-tight">
                Cyber<span className="text-cyan-400">Shield</span>
              </div>
              <div className="text-[9px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Security Awareness
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["topics", "Topics"],
              ["quiz", "Quiz"],
              ["helpline", "Helpline"],
              ["faq", "FAQ"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollToSection("helpline")}
            className="hidden items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-400/20 md:flex"
          >
            <Phone size={15} />
            Helpline
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#030712] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              {[
                ["home", "Home"],
                ["about", "About"],
                ["topics", "Topics"],
                ["quiz", "Quiz"],
                ["helpline", "Helpline"],
                ["faq", "FAQ"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="text-left text-sm font-medium text-slate-300"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("helpline")}
                className="flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-5 py-3 font-bold text-red-300"
              >
                <Phone size={16} />
                Cyber Helpline: 1930
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section
          id="home"
          className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
        >
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                Cybersecurity Awareness Workshop
              </div>

              <h1 className="max-w-3xl text-[2.65rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Stay Smart.
                <br />
                <span className="text-cyan-400">Stay Secure.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:mt-7 sm:text-lg sm:leading-8">
                Learn how to recognize cyber threats, protect your digital
                identity and build security habits that actually keep you safe.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToSection("topics")}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Explore Topics
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
                <button
                  onClick={() => scrollToSection("quiz")}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Take the Quiz
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  Practical Training
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  Real-World Examples
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  Beginner Friendly
                </span>
              </div>
            </div>

            {/* Hero visual — Quick Security Tips carousel */}
            <div className="relative mx-auto w-full max-w-lg">
              {/* Glow */}
              <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-[80px]" />

              {/* Card */}
              <div className="relative rounded-[1.5rem] border border-cyan-400/20 bg-white/[0.025] p-3 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
                <div className="rounded-2xl border border-white/10 bg-[#07111f] p-5 sm:rounded-3xl sm:p-7">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 sm:text-xs">
                        Security Tip
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:text-base">
                        Stay one step ahead
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 sm:h-11 sm:w-11">
                      <Shield className="text-cyan-400" size={20} />
                    </div>
                  </div>

                  {/* Rotating tip */}
                  <div className="relative min-h-[180px] overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/[0.06] to-blue-500/[0.03] p-5 sm:min-h-[200px] sm:p-6">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div
                      key={tipIndex}
                      className="relative animate-[fadeSlide_0.5s_ease-out]"
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 sm:h-14 sm:w-14">
                        {(() => {
                          const Icon = securityTips[tipIndex].icon;
                          return (
                            <Icon className="text-cyan-400" size={24} />
                          );
                        })()}
                      </div>

                      <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
                        {securityTips[tipIndex].title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {securityTips[tipIndex].text}
                      </p>
                    </div>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {securityTips.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setTipIndex(i)}
                          aria-label={`Tip ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            i === tipIndex
                              ? "w-6 bg-cyan-400"
                              : "w-1.5 bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mini stats row */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                        Threat Level
                      </p>
                      <p className="mt-1 text-sm font-bold text-emerald-400 sm:text-base">
                        LOW
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                        Your Awareness
                      </p>
                      <p className="mt-1 text-sm font-bold text-cyan-400 sm:text-base">
                        HIGH
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-white/10 bg-white/[0.015]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {[
              ["24/7", "Threats evolve constantly"],
              ["9", "Security topics"],
              ["100%", "Practical awareness"],
              ["5", "Random quiz questions"],
            ].map(([number, text]) => (
              <div key={text} className="px-3 py-7 text-center sm:px-6 sm:py-10">
                <p className="text-2xl font-extrabold text-cyan-400 sm:text-3xl">
                  {number}
                </p>
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Why it matters
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Cybersecurity isn't only an IT problem.
              </h2>
              <p className="mt-6 leading-8 text-slate-400">
                Every person who uses email, smartphones, computers or the
                internet plays a role in keeping information secure.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                Attackers increasingly target people through phishing,
                impersonation, weak passwords and social engineering. The
                strongest defense starts with awareness.
              </p>
              <button
                onClick={() => scrollToSection("topics")}
                className="mt-8 flex items-center gap-2 font-semibold text-cyan-400"
              >
                See what you'll learn
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Lock,
                  title: "Protect Identity",
                  text: "Keep accounts and personal information secure.",
                },
                {
                  icon: AlertTriangle,
                  title: "Spot Threats",
                  text: "Recognize suspicious activity before it becomes damage.",
                },
                {
                  icon: Zap,
                  title: "React Quickly",
                  text: "Know what to do when something goes wrong.",
                },
                {
                  icon: Award,
                  title: "Build Habits",
                  text: "Turn security awareness into everyday behavior.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                      <Icon size={21} className="text-cyan-400" />
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOPICS WITH VIDEOS */}
        <section id="topics" className="bg-white/[0.015] py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Workshop Topics
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Security knowledge that protects you.
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                Each topic includes a video lesson and a detailed article.
                Click any card to watch and read.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => openTopic(topic)}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111f] p-7 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                          <Icon className="text-cyan-400" size={23} />
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-7 text-xl font-bold">{topic.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {topic.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-cyan-400">
                            {topic.level}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Video size={12} /> Video
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <BookOpen size={12} /> Article
                          </span>
                        </div>
                        <ArrowRight
                          size={17}
                          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUIZ — RANDOMIZED */}
        <section id="quiz" className="mx-auto max-w-4xl px-6 py-28 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Test Your Awareness
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Would you spot the threat?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-slate-400">
              5 questions are randomly selected from a pool of{" "}
              {quizPool.length}. Each attempt is different!
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 bg-[#07111f] p-6 shadow-2xl sm:p-10">
            {!quizFinished ? (
              <>
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    Question {quizIndex + 1} / {quizQuestions.length}
                  </span>
                  <span className="text-sm font-bold text-cyan-400">
                    Score: {quizScore}
                  </span>
                </div>

                <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full bg-cyan-400 transition-all"
                    style={{
                      width: `${
                        ((quizIndex + 1) / quizQuestions.length) * 100
                      }%`,
                    }}
                  />
                </div>

                <h3 className="text-2xl font-bold leading-9">
                  {currentQuestion.question}
                </h3>

                <div className="mt-8 space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = index === currentQuestion.correct;
                    const isSelected = index === selectedAnswer;
                    let style =
                      "border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/5";
                    if (quizAnswered && isCorrect) {
                      style =
                        "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
                    } else if (quizAnswered && isSelected) {
                      style = "border-red-400/40 bg-red-400/10 text-red-300";
                    }
                    return (
                      <button
                        key={option}
                        onClick={() => handleQuizAnswer(index)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left text-sm transition ${style}`}
                      >
                        <span>{option}</span>
                        {quizAnswered && isCorrect && (
                          <CheckCircle2
                            size={19}
                            className="text-emerald-400"
                          />
                        )}
                        {quizAnswered && isSelected && !isCorrect && (
                          <X size={19} className="text-red-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered && (
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <div>
                      <p className="font-semibold">
                        {selectedAnswer === currentQuestion.correct
                          ? "Correct answer!"
                          : "Not quite."}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {selectedAnswer === currentQuestion.correct
                          ? "Good security instinct."
                          : "The safer choice is highlighted above."}
                      </p>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950"
                    >
                      {quizIndex === quizQuestions.length - 1
                        ? "See Result"
                        : "Next"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10">
                  <Award size={38} className="text-cyan-400" />
                </div>
                <p className="mt-7 text-sm font-bold uppercase tracking-widest text-cyan-400">
                  Quiz Complete
                </p>
                <h3 className="mt-3 text-4xl font-extrabold">
                  {quizScore} / {quizQuestions.length}
                </h3>
                <p className="mx-auto mt-4 max-w-md text-slate-500">
                  {quizScore === quizQuestions.length
                    ? "Excellent. Your security awareness is strong."
                    : "You have the basics. The workshop will help strengthen your security instincts."}
                </p>
                <button
                  onClick={resetQuiz}
                  className="mt-8 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Try New Random Questions
                </button>
              </div>
            )}
          </div>
        </section>

        {/* HELPLINE */}
        <section
          id="helpline"
          className="border-y border-red-500/20 bg-red-500/[0.03] py-28"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-400/10">
                <Phone className="text-red-400" size={30} />
              </div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-400">
                Emergency Cyber Helplines
              </p>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Need help? Reach out immediately.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                If you've experienced a cybercrime — financial fraud, identity
                theft, hacking, or harassment — report it right away. Early
                reporting increases recovery chances.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {helplines.map((h) => (
                <div
                  key={h.region}
                  className="rounded-2xl border border-red-400/20 bg-[#07111f] p-6 transition hover:-translate-y-1 hover:border-red-400/40"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
                    {h.region}
                  </p>
                  <p className="mt-3 text-2xl font-extrabold text-white">
                    {h.number}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {h.description}
                  </p>
                  {h.website && (
                    <a
                      href={h.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                    >
                      Visit Website
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
              <p className="text-sm text-slate-300">
                <strong className="text-red-400">Remember:</strong> In case of
                immediate danger or a life-threatening emergency, always call
                your local emergency number (112 / 100 in India) first.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-white/[0.015] py-28">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                FAQ
              </p>
              <h2 className="text-4xl font-bold sm:text-5xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-12 space-y-3">
              {faqs.map((faq, index) => {
                const open = faqOpen === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]"
                  >
                    <button
                      onClick={() => setFaqOpen(open ? null : index)}
                      className="flex w-full items-center justify-between p-6 text-left"
                    >
                      <span className="font-semibold">{faq.question}</span>
                      <ChevronDown
                        size={19}
                        className={`shrink-0 text-slate-500 transition ${
                          open ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="border-t border-white/10 px-6 pb-6 pt-5 text-sm leading-7 text-slate-500">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-28">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.05] p-10 text-center sm:p-16">
            <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[80px]" />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <Shield className="text-cyan-400" />
              </div>
              <h2 className="mt-7 text-4xl font-extrabold sm:text-5xl">
                Your first line of defense
                <br />
                is <span className="text-cyan-400">awareness.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">
                Don't wait for a security incident to learn how to protect
                yourself.
              </p>
              <button
                onClick={() => scrollToSection("topics")}
                className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Explore All Topics
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
              <Shield size={19} className="text-cyan-400" />
            </div>
            <div>
              <p className="font-bold">
                Cyber<span className="text-cyan-400">Shield</span>
              </p>
              <p className="text-xs text-slate-600">
                Security Awareness Workshop
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("topics")}>Topics</button>
            <button onClick={() => scrollToSection("quiz")}>Quiz</button>
            <button onClick={() => scrollToSection("helpline")}>
              Helpline
            </button>
            <button onClick={() => scrollToSection("faq")}>FAQ</button>
          </div>

          <p className="text-xs text-slate-600">© 2026 CyberShield</p>
        </div>
      </footer>

      {/* TOPIC DETAIL MODAL (Video + Article) */}
      {activeTopic && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          onClick={closeTopic}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-4xl rounded-3xl border border-white/10 bg-[#07111f] shadow-2xl"
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-start justify-between rounded-t-3xl border-b border-white/10 bg-[#07111f]/95 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  {(() => {
                    const Icon = activeTopic.icon;
                    return <Icon className="text-cyan-400" size={24} />;
                  })()}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    {activeTopic.level} • Topic
                  </p>
                  <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                    {activeTopic.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={closeTopic}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* Video Section */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                  <Play size={16} />
                  Video Lesson
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="relative aspect-video w-full">
                    <video
                      key={activeTopic.id}
                      className="absolute inset-0 h-full w-full"
                      controls
                      preload="metadata"
                      playsInline
                    >
                      <source src={activeTopic.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  {activeTopic.videoTitle}
                </p>
              </div>

              {/* Article Section */}
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400">
                  <BookOpen size={16} />
                  Article
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                  <p className="mb-4 text-base leading-7 text-slate-300">
                    {activeTopic.description}
                  </p>
                  <div className="whitespace-pre-line text-sm leading-7 text-slate-400">
                    {activeTopic.article}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeTopic}
                  className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;