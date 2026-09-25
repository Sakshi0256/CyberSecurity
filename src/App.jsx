import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Shield, Menu, X, ArrowRight, CheckCircle2, Lock, MailWarning,
  Smartphone, Globe, Database, KeyRound, Award, ChevronDown,
  AlertTriangle, Zap, Play, BookOpen, Phone, ExternalLink, Video,
  Gamepad2, Trophy, Flame, RotateCcw, Coins, Link2, Unlock,
  Heart, Pause, Crosshair, Rocket, Target, Rotate3d,
} from "lucide-react";

// ============================================
// TOPICS
// ============================================
const topics = [
  { id: "protect-identity", icon: Lock, title: "Protect Identity", description: "Learn how to safeguard your personal information, online accounts and digital identity from theft and misuse.", level: "Essential", videoSrc: "/videos/protect-identity.mp4", videoTitle: "How to Protect Your Digital Identity", article: `Your digital identity is the collection of all information about you online...\n\nKey steps:\n• Use strong, unique passwords\n• Enable MFA\n• Never share personal details on unverified sites\n• Monitor accounts regularly\n• Be careful on social media\n• Use a password manager\n• Freeze credit if suspect theft` },
  { id: "react-quickly", icon: Zap, title: "React Quickly", description: "Know exactly what to do when you suspect a security incident.", level: "Practical", videoSrc: "/videos/react-quickly.mp4", videoTitle: "Incident Response", article: `1. Disconnect\n2. Preserve evidence\n3. Change passwords\n4. Enable MFA\n5. Report\n6. Monitor` },
  { id: "spot-threats", icon: AlertTriangle, title: "Spot Threats", description: "Develop the ability to recognize suspicious activity, malicious links and attack attempts.", level: "Essential", videoSrc: "/videos/spot-threats.mp4", videoTitle: "How to Spot a Cyber Threat", article: `Red flags:\n• Urgency\n• Spelling errors\n• Mismatched sender\n• Suspicious links\n• Unexpected attachments\n• Requests for personal info` },
  { id: "phishing-scams", icon: MailWarning, title: "Phishing & Scams", description: "Identify suspicious emails, fake websites, malicious links and social engineering attacks.", level: "Essential", videoSrc: "/videos/phishing-scams.mp4", videoTitle: "Phishing Attacks Explained", article: `1. Attacker creates fake message\n2. Creates urgency\n3. You click\n4. Malware installs\n5. Credentials stolen` },
  { id: "passwords", icon: KeyRound, title: "Passwords", description: "Build stronger authentication habits and understand why MFA is essential.", level: "Essential", videoSrc: "/videos/passwords.mp4", videoTitle: "Password Security", article: `• Length 12+ characters\n• Mix case, numbers, symbols\n• No dictionary words\n• Never reuse\n• Use passphrases` },
  { id: "safe-browsing", icon: Globe, title: "Safe Browsing", description: "Understand unsafe websites, malicious downloads, browser threats and secure online behavior.", level: "Practical", videoSrc: "/videos/safe-browsing.mp4", videoTitle: "Safe Browsing", article: `• Hover before clicking\n• Check HTTPS\n• Watch for misspellings\n• Be wary of shortened URLs` },
  { id: "data-protection", icon: Database, title: "Data Protection", description: "Learn how sensitive information gets exposed and how to protect it.", level: "Advanced", videoSrc: "/videos/data-protection.mp4", videoTitle: "Protecting Data", article: `Sensitive data:\n• PII\n• Financial\n• Health\n• Credentials\n\nBackup rule: 3-2-1` },
  { id: "device-security", icon: Smartphone, title: "Device Security", description: "Protect your phones, laptops and personal devices from common attacks.", level: "Practical", videoSrc: "/videos/device-security.mp4", videoTitle: "Device Security", article: `• Strong PIN/biometric\n• Auto screen lock\n• Encryption\n• OS updates\n• Find My Device\n• Remote wipe` },
  { id: "security-hygiene", icon: Shield, title: "Security Hygiene", description: "Develop simple everyday habits that reduce your risk.", level: "Essential", videoSrc: "/videos/security-hygiene.mp4", videoTitle: "Security Habits", article: `Daily:\n• Lock screen\n• Think before click\n• No unknown USB\n• Log out\n\nWeekly:\n• Check statements\n• Update apps` },
];

// ============================================
// QUIZ
// ============================================
const quizPool = [
  { question: "You receive an email saying your bank account will be suspended in 10 minutes. What should you do?", options: ["Click the link immediately", "Reply with your account details", "Open your bank's official website directly", "Forward the email to friends"], correct: 2 },
  { question: "Which password is the strongest?", options: ["password123", "Sakshi@123", "Summer2026!", "A long unique passphrase with multiple words"], correct: 3 },
  { question: "What does MFA provide?", options: ["A faster internet connection", "An additional authentication factor", "Automatic antivirus protection", "A backup of your files"], correct: 1 },
  { question: "You get a text saying you've won a prize and need to click a link to claim it. What's the safest action?", options: ["Click the link to see what you won", "Reply with your address", "Delete the message and report it as spam", "Share the link with friends"], correct: 2 },
  { question: "Which of these is a sign of a phishing email?", options: ["It comes from someone you know", "It uses urgent language asking you to act immediately", "It has your correct name", "It arrives during business hours"], correct: 1 },
  { question: "What should you do before downloading software?", options: ["Download from any site that offers it free", "Only download from official/trusted sources", "Disable antivirus first", "Ask a friend to send it to you"], correct: 1 },
  { question: "You're on public Wi-Fi at a coffee shop. What's the safest practice?", options: ["Log into your bank account quickly", "Use a VPN and avoid sensitive logins", "Share the network password with others", "Disable your firewall for better speed"], correct: 1 },
  { question: "What is the best response if you suspect your device has malware?", options: ["Keep using it normally", "Disconnect from the internet and run a scan", "Delete all your files", "Restart and hope it goes away"], correct: 1 },
  { question: "Which of these is a good security habit?", options: ["Using the same password everywhere", "Sharing passwords with close friends", "Locking your screen when stepping away", "Disabling automatic updates"], correct: 2 },
  { question: "What does HTTPS in a website address indicate?", options: ["The website is completely safe", "The connection is encrypted", "The website is government-approved", "The website cannot be hacked"], correct: 1 },
  { question: "How often should you update your software?", options: ["Never", "Once a year", "As soon as updates are available", "Only when something breaks"], correct: 2 },
  { question: "What is social engineering?", options: ["Building social media platforms", "Manipulating people into revealing information", "A type of firewall", "Encrypting social data"], correct: 1 },
  { question: "Which is the safest way to store passwords?", options: ["In a notebook under your keyboard", "In a text file on your desktop", "In a reputable password manager", "In your email drafts"], correct: 2 },
  { question: "What should you do if you accidentally click a phishing link?", options: ["Ignore it and move on", "Change your passwords immediately and run a scan", "Send your password to verify", "Turn off your computer forever"], correct: 1 },
  { question: "Why is it risky to use the same password on multiple sites?", options: ["It's harder to remember", "If one site is breached, all your accounts are at risk", "It makes websites load slower", "It's against the law"], correct: 1 },
];

const shuffleArray = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickRandom = (pool, n) => shuffleArray(pool).slice(0, n);

const helplines = [
  { region: "India — National Cyber Crime Helpline", number: "1930", description: "Report cybercrime including financial fraud, identity theft, and harassment.", website: "https://cybercrime.gov.in" },
  { region: "India — Cyber Crime Portal", number: "cybercrime.gov.in", description: "File complaints online for cyber fraud, hacking, and other cyber offenses.", website: "https://cybercrime.gov.in" },
  { region: "USA — FBI Internet Crime Complaint Center", number: "ic3.gov", description: "Report internet-related crimes including fraud, identity theft, and hacking.", website: "https://ic3.gov" },
  { region: "Emergency — Police", number: "112 / 100", description: "For immediate emergencies, contact local police directly.", website: "" },
];

const faqs = [
  { question: "Who should attend this workshop?", answer: "Students, employees, professionals and anyone who uses email, smartphones, computers or online services." },
  { question: "Do I need technical cybersecurity knowledge?", answer: "No. The workshop is beginner-friendly and focuses on practical security habits." },
  { question: "Is the workshop hands-on?", answer: "Yes. Participants work through realistic examples, phishing scenarios and arcade games." },
  { question: "What will I learn?", answer: "Recognize phishing, protect accounts, secure devices, browse safely, and respond to incidents." },
];

const realCases = [
  { id: "wannacry", year: "2017", title: "WannaCry Ransomware", icon: "🦠", severity: "Critical", color: "red", summary: "Global ransomware attack that hit 200,000+ computers across 150 countries in a single day.", impact: "Hospitals in the UK, telecoms in Spain, and factories worldwide were shut down. Estimated damages: $4 billion.", lesson: "Unpatched systems are a massive risk. The attack exploited a Windows vulnerability that had a patch available 2 months earlier. Always apply security updates promptly.", link: "https://www.europol.europa.eu/wannacry-ransomware", linkLabel: "Read Europol Report" },
  { id: "equifax", year: "2017", title: "Equifax Data Breach", icon: "💳", severity: "Critical", color: "red", summary: "Credit bureau Equifax exposed personal data of 147 million people — one of the largest breaches in history.", impact: "Names, SSNs, birth dates, addresses, and driver's licenses were leaked. Settlement: $700 million+.", lesson: "Even large enterprises fail at basic patching. Equifax knew about the vulnerability for months but didn't fix it.", link: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement", linkLabel: "FTC Case" },
  { id: "solarwinds", year: "2020", title: "SolarWinds Supply Chain Attack", icon: "🌐", severity: "Critical", color: "red", summary: "Hackers compromised SolarWinds software updates, infecting 18,000+ organizations including US government agencies.", impact: "State-sponsored attack. Major US departments were breached.", lesson: "Supply chain attacks are sophisticated. Verify updates, use network segmentation, and monitor for unusual activity.", link: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa20-352a", linkLabel: "CISA Advisory" },
  { id: "colonial", year: "2021", title: "Colonial Pipeline Ransomware", icon: "🛢️", severity: "High", color: "amber", summary: "Ransomware attack shut down the largest US fuel pipeline, causing gas shortages across the East Coast.", impact: "Colonial paid $4.4 million ransom. Fuel prices spiked.", lesson: "MFA, network segmentation, and offline backups are essential — especially for operational technology.", link: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a", linkLabel: "CISA Advisory" },
  { id: "covid-phishing", year: "2020", title: "COVID-19 Phishing Wave", icon: "🎣", severity: "High", color: "amber", summary: "Scammers exploited pandemic fear with fake vaccine info, stimulus payments, and health alerts.", impact: "Google blocked 18 million COVID-related phishing emails per day.", lesson: "During crises, verify information through official government channels only.", link: "https://www.who.int/news-room/feature-stories/detail/who-warns-of-an-infodemic", linkLabel: "WHO Report" },
  { id: "aadhaar", year: "2018", title: "Aadhaar Data Leak (India)", icon: "🆔", severity: "Critical", color: "red", summary: "Aadhaar data of 1.1 billion Indian citizens was reportedly accessible through a government portal.", impact: "Massive privacy breach affecting almost every Indian adult.", lesson: "Use Aadhaar Virtual ID and lock biometrics where possible.", link: "https://uidai.gov.in/", linkLabel: "UIDAI Official" },
];

const burstConfetti = (x, y) => {
  const colors = ["#00f0ff", "#a855f7", "#fbbf24", "#10b981", "#ef4444"];
  const root = document.getElementById("confetti-root");
  if (!root) return;
  for (let i = 0; i < 15; i++) {
    const el = document.createElement("div");
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:8px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};pointer-events:none;z-index:9999;`;
    root.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 100;
    el.animate(
      [
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px) scale(0)`, opacity: 0 },
      ],
      { duration: 600, easing: "cubic-bezier(0.1,0.8,0.3,1)" }
    ).onfinish = () => el.remove();
  }
};

// ============================================
// MAIN APP
// ============================================
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [toast, setToast] = useState(null);
  const [bestScores, setBestScores] = useState({ link: 0, money: 0, crack: 0, space: 0, snake: 0, blaster: 0 });

  const showToast = (message, type = "success") => setToast({ message, type, id: Date.now() });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);
  const updateBest = (game, score) => setBestScores((b) => ({ ...b, [game]: Math.max(b[game] || 0, score) }));

  const [quizQuestions, setQuizQuestions] = useState(() => pickRandom(quizPool, 5));
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const currentQuestion = quizQuestions[quizIndex];

  const handleQuizAnswer = (index) => {
    if (quizAnswered) return;
    setSelectedAnswer(index); setQuizAnswered(true);
    if (index === currentQuestion.correct) { setQuizScore((s) => s + 1); setXp((x) => x + 10); }
  };
  const nextQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) { setQuizIndex((i) => i + 1); setQuizAnswered(false); setSelectedAnswer(null); }
    else setQuizFinished(true);
  };
  const resetQuiz = () => { setQuizQuestions(pickRandom(quizPool, 5)); setQuizIndex(0); setQuizScore(0); setQuizAnswered(false); setSelectedAnswer(null); setQuizFinished(false); };

  const scrollToSection = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const openTopic = (t) => setActiveTopic(t);
  const closeTopic = () => setActiveTopic(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-white">
      <div id="confetti-root" />
      <style>{`
        @keyframes pop { 0%{transform:scale(0.8);opacity:0} 50%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes pulseRing { 0%{box-shadow: 0 0 0 0 rgba(34,211,238,0.4)} 70%{box-shadow: 0 0 0 20px rgba(34,211,238,0)} 100%{box-shadow: 0 0 0 0 rgba(34,211,238,0)} }
        @keyframes gridScroll { 0%{background-position: 0 0} 100%{background-position: 40px 40px} }
        .animate-pop { animation: pop 0.3s ease; }
        .animate-pulse-ring { animation: pulseRing 1.5s infinite; }
        .arcade-grid { background-image: linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.06) 1px, transparent 1px); background-size: 40px 40px; animation: gridScroll 6s linear infinite; }
        html, body { overflow-x: hidden; max-width: 100vw; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-15%] top-[5%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute right-[-10%] top-[35%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 sm:h-10 sm:w-10">
              <Shield className="text-cyan-400" size={20} />
            </div>
            <div className="text-left">
              <div className="text-base font-bold tracking-tight sm:text-lg">Cyber<span className="text-cyan-400">Shield</span></div>
              <div className="text-[8px] font-medium uppercase tracking-[0.25em] text-slate-500 sm:text-[9px]">Security Games</div>
            </div>
          </button>
          <nav className="hidden items-center gap-6 md:flex">
            {[["home", "Home"], ["about", "About"], ["games", "Games"], ["topics", "Topics"], ["cases", "Cases"], ["quiz", "Quiz"], ["helpline", "Helpline"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollToSection(id)} className="text-sm font-medium text-slate-400 transition hover:text-white">{label}</button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-bold text-amber-300">
              <Trophy size={14} /> {xp} XP
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-sm font-bold text-orange-300">
              <Flame size={14} /> {streak}
            </div>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/10 p-2 md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#030712] px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5">
              {[["home", "Home"], ["about", "About"], ["games", "Games"], ["topics", "Topics"], ["cases", "Cases"], ["quiz", "Quiz"], ["helpline", "Helpline"]].map(([id, label]) => (
                <button key={id} onClick={() => scrollToSection(id)} className="text-left text-sm font-medium text-slate-300">{label}</button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative isolate mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center overflow-hidden rounded-[2rem] px-4 pb-16 pt-24 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-[#030712]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,240,255,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.25),transparent_55%)]" />
            <img
              src="/images/hero-bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0.7 }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="arcade-grid absolute inset-0 opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
          </div>

          <div className="relative z-10 grid w-full items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                Cyber Crime Games · 6 Games
              </div>
              <h1 className="max-w-3xl text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Play the Games.<br />
                <span className="text-cyan-400">Outsmart the Scammers.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Six real arcade games. Shoot, dodge, race, and defend — learn cybersecurity the fun way.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToSection("games")}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  <Gamepad2 size={18} /> Enter Games
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection("topics")}
                  className="rounded-xl border border-white/20 bg-white/[0.06] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.12]"
                >
                  Watch Topics
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> 6 Real Games</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Space Shooter</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Cyber Snake</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="relative isolate overflow-hidden border-y border-white/10">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/70 via-[#030712]/40 to-[#030712]/70" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {[["6", "Games"], ["∞", "Replayable"], ["15+", "Quiz Questions"], ["↗", "XP & Streaks"]].map(([n, t]) => (
              <div key={t} className="px-3 py-6 text-center sm:px-6 sm:py-10">
                <p className="text-2xl font-extrabold text-cyan-400 sm:text-3xl">{n}</p>
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative isolate overflow-hidden py-16 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <img src="/images/about-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.55 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Why it matters</p>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Cybersecurity isn't only an IT problem.</h2>
                <p className="mt-6 leading-8 text-slate-400">Every person who uses email, smartphones, computers or the internet plays a role in keeping information secure.</p>
                <p className="mt-4 leading-8 text-slate-400">Attackers target people through phishing, impersonation, weak passwords and social engineering. The strongest defense starts with awareness.</p>
                <button onClick={() => scrollToSection("games")} className="mt-8 flex items-center gap-2 font-semibold text-cyan-400">
                  Enter the Games <ArrowRight size={17} />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Lock, title: "Protect Identity", text: "Keep accounts and personal information secure." },
                  { icon: AlertTriangle, title: "Spot Threats", text: "Recognize suspicious activity before it becomes damage." },
                  { icon: Zap, title: "React Quickly", text: "Know what to do when something goes wrong." },
                  { icon: Award, title: "Build Habits", text: "Turn security awareness into everyday behavior." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30 sm:p-6">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 sm:mb-5 sm:h-11 sm:w-11">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ARCADE */}
        <Arcade xp={xp} setXp={setXp} streak={streak} setStreak={setStreak} showToast={showToast} bestScores={bestScores} updateBest={updateBest} />

        {/* TOPICS */}
        <section id="topics" className="relative isolate overflow-hidden py-16 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <img src="/images/topic-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.55 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Workshop Topics</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Play. Watch. & Learn.</h2>
              <p className="mt-5 leading-7 text-slate-400">Each topic includes a video lesson + article. Reinforce what you learn in the games.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <button key={topic.id} onClick={() => openTopic(topic)} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111f]/80 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 sm:p-7">
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition group-hover:bg-cyan-400/10" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 sm:h-12 sm:w-12">
                          <Icon className="text-cyan-400" size={20} />
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold sm:mt-7 sm:text-xl">{topic.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:leading-7">{topic.description}</p>
                      <div className="mt-4 flex items-center justify-between sm:mt-6">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-cyan-400">{topic.level}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500"><Video size={12} /> Video</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500"><BookOpen size={12} /> Article</span>
                        </div>
                        <ArrowRight size={17} className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz" className="relative isolate overflow-hidden py-16 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <img src="/images/quize-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.55 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Test Your Awareness</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Would you spot the threat?</h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">5 questions randomly selected from a pool of {quizPool.length}. Each attempt is different!</p>
            </div>
            <div className="mt-10 rounded-3xl border border-white/10 bg-[#07111f]/80 p-4 shadow-2xl sm:mt-12 sm:p-8 lg:p-10">
              {!quizFinished ? (
                <>
                  <div className="mb-6 flex items-center justify-between sm:mb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Q {quizIndex + 1} / {quizQuestions.length}</span>
                    <span className="text-sm font-bold text-cyan-400">Score: {quizScore}</span>
                  </div>
                  <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/5 sm:mb-8">
                    <div className="h-full bg-cyan-400 transition-all" style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }} />
                  </div>
                  <h3 className="text-lg font-bold leading-7 sm:text-2xl sm:leading-9">{currentQuestion.question}</h3>
                  <div className="mt-6 space-y-3 sm:mt-8">
                    {currentQuestion.options.map((option, index) => {
                      const isCorrect = index === currentQuestion.correct;
                      const isSelected = index === selectedAnswer;
                      let style = "border-white/10 bg-white/[0.02] hover:border-cyan-400/30 hover:bg-cyan-400/5";
                      if (quizAnswered && isCorrect) style = "border-emerald-400/40 bg-emerald-400/10 text-emerald-300";
                      else if (quizAnswered && isSelected) style = "border-red-400/40 bg-red-400/10 text-red-300";
                      return (
                        <button key={option} onClick={() => handleQuizAnswer(index)} className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3 text-left text-sm transition sm:p-4 ${style}`}>
                          <span>{option}</span>
                          {quizAnswered && isCorrect && <CheckCircle2 size={19} className="shrink-0 text-emerald-400" />}
                          {quizAnswered && isSelected && !isCorrect && <X size={19} className="shrink-0 text-red-400" />}
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswered && (
                    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">{selectedAnswer === currentQuestion.correct ? "Correct answer!" : "Not quite."}</p>
                        <p className="mt-1 text-sm text-slate-500">{selectedAnswer === currentQuestion.correct ? "+10 XP earned" : "The safer choice is highlighted above."}</p>
                      </div>
                      <button onClick={nextQuestion} className="rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950">{quizIndex === quizQuestions.length - 1 ? "See Result" : "Next"}</button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10"><Award size={38} className="text-cyan-400" /></div>
                  <p className="mt-7 text-sm font-bold uppercase tracking-widest text-cyan-400">Quiz Complete</p>
                  <h3 className="mt-3 text-4xl font-extrabold">{quizScore} / {quizQuestions.length}</h3>
                  <p className="mx-auto mt-4 max-w-md text-slate-500">{quizScore === quizQuestions.length ? "Excellent. Your security awareness is strong." : "You have the basics. Keep practising in the games."}</p>
                  <button onClick={resetQuiz} className="mt-8 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Try New Random Questions</button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* REAL CASES */}
        <section id="cases" className="relative isolate overflow-hidden py-16 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <img src="/images/case-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.55 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/30 to-[#030712]/80" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-300">
                <AlertTriangle size={14} /> Real-World Incidents
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Cyber attacks that <span className="text-red-400">made history.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-slate-400">
                Real cases. Real damage. Learn from the incidents that shook the world.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {realCases.map((c) => {
                const sevColor = {
                  red: "border-red-400/40 bg-red-400/10 text-red-300",
                  amber: "border-amber-400/40 bg-amber-400/10 text-amber-300",
                }[c.color] || "border-white/20 bg-white/5 text-slate-300";
                return (
                  <div key={c.id} className="group flex flex-col rounded-2xl border border-white/10 bg-[#07111f]/80 p-5 transition hover:-translate-y-1 hover:border-red-400/40 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-2xl">{c.icon}</div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${sevColor}`}>{c.severity}</span>
                        <span className="text-[10px] font-bold text-slate-500">{c.year}</span>
                      </div>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{c.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{c.summary}</p>
                    <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Impact</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{c.impact}</p>
                    </div>
                    <div className="mt-3 rounded-xl border border-amber-400/10 bg-amber-400/[0.03] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">💡 Lesson</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{c.lesson}</p>
                    </div>
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2.5 text-xs font-bold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10">
                      <span>{c.linkLabel}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HELPLINE */}
        <section id="helpline" className="relative isolate overflow-hidden border-y border-red-500/20 py-16 sm:py-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[#030712]" />
            <img src="/images/helpline-bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.5 }} onError={(e) => { e.target.style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-[#030712]/50 to-[#030712]/85" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/30 bg-red-400/10">
                <Phone className="text-red-400" size={30} />
              </div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-400">Emergency Cyber Helplines</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Need help? Reach out immediately.</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {helplines.map((h) => (
                <div key={h.region} className="rounded-2xl border border-red-400/20 bg-[#07111f]/80 p-5 transition hover:-translate-y-1 hover:border-red-400/40 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400">{h.region}</p>
                  <p className="mt-3 text-2xl font-extrabold text-white">{h.number}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{h.description}</p>
                  {h.website && (
                    <a href={h.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                      Visit Website <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6 sm:py-28">
          <div
            className="absolute inset-0"
            style={{
              zIndex: 0,
              backgroundImage: "url(/images/stats-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              zIndex: 1,
              background:
                "linear-gradient(to bottom, rgba(3,7,18,0.55), rgba(3,7,18,0.35), rgba(3,7,18,0.75))",
            }}
          />

          <div className="relative z-10">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#07111f]/80 p-6 text-center sm:p-12 lg:p-16">
              <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[80px]" />
              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <Shield className="text-cyan-400" />
                </div>
                <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:mt-7 sm:text-4xl lg:text-5xl">
                  Your first line of defense<br />is <span className="text-cyan-400">awareness.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-slate-400">
                  Don't wait for a security incident to learn how to protect yourself.
                </p>
                <button
                  onClick={() => scrollToSection("games")}
                  className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Enter the Games
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10"><Shield size={19} className="text-cyan-400" /></div>
            <div>
              <p className="font-bold">Cyber<span className="text-cyan-400">Shield</span></p>
              <p className="text-xs text-slate-600">Security Awareness Arcade</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <button onClick={() => scrollToSection("home")}>Home</button>
            <button onClick={() => scrollToSection("games")}>Games</button>
            <button onClick={() => scrollToSection("cases")}>Cases</button>
            <button onClick={() => scrollToSection("topics")}>Topics</button>
            <button onClick={() => scrollToSection("quiz")}>Quiz</button>
          </div>
          <p className="text-xs text-slate-600">© 2026 CyberShield</p>
        </div>
      </footer>

      {/* TOPIC MODAL */}
      {activeTopic && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-8" onClick={closeTopic}>
          <div onClick={(e) => e.stopPropagation()} className="relative my-8 w-full max-w-4xl rounded-3xl border border-white/10 bg-[#07111f] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-3xl border-b border-white/10 bg-[#07111f]/95 p-5 backdrop-blur-xl sm:p-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 sm:h-12 sm:w-12">
                  {(() => { const Icon = activeTopic.icon; return <Icon className="text-cyan-400" size={22} />; })()}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">{activeTopic.level} • Topic</p>
                  <h2 className="mt-1 text-xl font-bold sm:text-3xl">{activeTopic.title}</h2>
                </div>
              </div>
              <button onClick={closeTopic} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X size={22} /></button>
            </div>
            <div className="p-5 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400"><Play size={16} /> Video Lesson</div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="relative aspect-video w-full">
                    <video key={activeTopic.id} className="absolute inset-0 h-full w-full" controls preload="metadata" playsInline>
                      <source src={activeTopic.videoSrc} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-500">{activeTopic.videoTitle}</p>
              </div>
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-400"><BookOpen size={16} /> Article</div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                  <p className="mb-4 text-base leading-7 text-slate-300">{activeTopic.description}</p>
                  <div className="whitespace-pre-line text-sm leading-7 text-slate-400">{activeTopic.article}</div>
                </div>
              </div>
              <div className="mt-6 flex justify-end sm:mt-8">
                <button onClick={closeTopic} className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div key={toast.id} className={`fixed bottom-4 right-4 z-[200] animate-pop rounded-xl border px-4 py-2.5 text-sm font-bold shadow-2xl sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-base ${toast.type === "success" ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
          : toast.type === "error" ? "border-red-400/40 bg-red-400/10 text-red-300"
            : "border-amber-400/40 bg-amber-400/10 text-amber-300"
          }`}>{toast.message}</div>
      )}
    </div>
  );
}

// ============================================
// ARCADE HUB
// ============================================
function Arcade({ xp, setXp, streak, setStreak, showToast, bestScores, updateBest }) {
  const [activeGame, setActiveGame] = useState(null);
  const [showRotateHint, setShowRotateHint] = useState(false);
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  const games = [
    { id: "link", icon: Link2, name: "Suspicious Link Catcher", desc: "Links fall. Click the BAD ones before they reach your inbox.", color: "red", tag: "Clicker" },
    { id: "money", icon: Coins, name: "Money Escape", desc: "You're a ₹ coin. Dodge falling scam attacks with arrow keys or drag.", color: "amber", tag: "Arcade" },
    { id: "crack", icon: Unlock, name: "Password Defense", desc: "Time your SPACE press to block hackers from breaking into your account.", color: "cyan", tag: "Timing" },
    { id: "space", icon: Rocket, name: "Space Defender", desc: "Aim with your mouse. Shoot down incoming hacker bots before they hit your server.", color: "purple", tag: "Shooter" },
    { id: "snake", icon: Zap, name: "Cyber Snake", desc: "Classic snake — eat data packets, avoid malware blocks. Don't hit walls!", color: "emerald", tag: "Classic" },
    { id: "blaster", icon: Target, name: "Virus Blaster", desc: "Click falling viruses to destroy them before they reach your server.", color: "blue", tag: "Reflex" },
  ];

  // Track portrait/mobile state (no API calls)
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortraitMobile(mobile && portrait);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  const handleGameStart = (gameId) => {
    setActiveGame(gameId);
    const mobile = window.innerWidth < 768;
    const portrait = window.innerHeight > window.innerWidth;
    setShowRotateHint(mobile && portrait);
  };

  const handleContinue = () => {
    setShowRotateHint(false);
  };

  const handleGameClose = () => {
    setActiveGame(null);
    setShowRotateHint(false);
  };

  return (
    <section id="games" className="relative isolate overflow-hidden border-y border-white/10 py-16 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.2),transparent_60%)]" />
        <img
          src="/images/arcade-bg.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.85 }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="arcade-grid absolute inset-0 opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/30 via-[#030712]/15 to-[#030712]/65" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
            <Gamepad2 size={14} /> Game Zone · 6 Games
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            Shoot. Race. <span className="text-cyan-400">Defend.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Six real games — clickers, shooters, and a classic snake. Learn cybersecurity the fun way.
          </p>
        </div>

        <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm font-bold text-amber-300 sm:px-4 sm:py-2">
            <Trophy size={15} /> {xp} XP
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-orange-400/30 bg-orange-400/10 px-3 py-1.5 text-sm font-bold text-orange-300 sm:px-4 sm:py-2">
            <Flame size={15} /> {streak} Streak
          </div>
        </div>

       <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-2">
          {games.map((g) => {
            const Icon = g.icon;
            const c = {
              red: { border: "border-red-400/30 hover:border-red-400/60", bg: "bg-red-400/5", icon: "text-red-400", tag: "bg-red-400/10 text-red-300" },
              amber: { border: "border-amber-400/30 hover:border-amber-400/60", bg: "bg-amber-400/5", icon: "text-amber-400", tag: "bg-amber-400/10 text-amber-300" },
              cyan: { border: "border-cyan-400/30 hover:border-cyan-400/60", bg: "bg-cyan-400/5", icon: "text-cyan-400", tag: "bg-cyan-400/10 text-cyan-300" },
              purple: { border: "border-purple-400/30 hover:border-purple-400/60", bg: "bg-purple-400/5", icon: "text-purple-400", tag: "bg-purple-400/10 text-purple-300" },
              emerald: { border: "border-emerald-400/30 hover:border-emerald-400/60", bg: "bg-emerald-400/5", icon: "text-emerald-400", tag: "bg-emerald-400/10 text-emerald-300" },
              blue: { border: "border-blue-400/30 hover:border-blue-400/60", bg: "bg-blue-400/5", icon: "text-blue-400", tag: "bg-blue-400/10 text-blue-300" },
            }[g.color];

            return (
              <button
                key={g.id}
                onClick={() => handleGameStart(g.id)}
                className={`group relative overflow-hidden rounded-2xl border-2 ${c.border} ${c.bg} p-4 text-left transition-all duration-300 hover:-translate-y-1 sm:p-5`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-3xl" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] sm:h-12 sm:w-12 ${c.icon}`}>
                      <Icon size={20} />
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${c.tag}`}>{g.tag}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-white sm:text-lg">{g.name}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-400">{g.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">🏆 Best: {bestScores[g.id] || 0}</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition group-hover:bg-cyan-300">
                      <Play size={11} /> PLAY
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== FULLSCREEN GAME MODAL ===== */}
      {activeGame && (
        <div className="fixed inset-0 z-[300] flex flex-col bg-[#030712]">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0a1424] px-3 py-2.5 sm:px-6 sm:py-4">
            <h3 className="text-sm font-bold text-white sm:text-xl">
              {activeGame === "link" && "🔗 Suspicious Link Catcher"}
              {activeGame === "money" && "💰 Money Escape"}
              {activeGame === "crack" && "🔓 Password Defense"}
              {activeGame === "space" && "🚀 Space Defender"}
              {activeGame === "snake" && "🐍 Cyber Snake"}
              {activeGame === "blaster" && "🎯 Virus Blaster"}
            </h3>
            <button
              onClick={handleGameClose}
              className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/10 sm:px-4 sm:py-2 sm:text-sm"
            >
              ✕ Close
            </button>
          </div>

          {/* Rotate hint — shown when user opened in portrait on mobile, before playing */}
          {showRotateHint ? (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="flex h-20 w-12 flex-col items-center justify-between rounded-lg border-2 border-cyan-400 p-1.5">
                  <div className="h-1 w-5 rounded-full bg-cyan-400" />
                  <div className="h-1 w-5 rounded-full bg-cyan-400" />
                  <div className="h-1 w-5 rounded-full bg-cyan-400" />
                </div>
                <Rotate3d className="animate-pulse text-cyan-400" size={40} />
              </div>
              <h4 className="text-xl font-bold text-white">Rotate your phone</h4>
              <p className="mt-3 max-w-xs text-sm text-slate-400">
                Turn your phone sideways (landscape) for the best gaming experience
              </p>
              <button
                onClick={handleContinue}
                className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Continue anyway
              </button>
            </div>
          ) : (
            <div className="flex flex-1 overflow-auto">
              <div className="flex w-full items-start justify-center p-2 sm:p-4 md:p-6">
                {activeGame === "link" && <LinkCatcherGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.link} updateBest={(s) => updateBest("link", s)} onExit={handleGameClose} />}
                {activeGame === "money" && <MoneyEscapeGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.money} updateBest={(s) => updateBest("money", s)} onExit={handleGameClose} />}
                {activeGame === "crack" && <CrackDefenseGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.crack} updateBest={(s) => updateBest("crack", s)} onExit={handleGameClose} />}
                {activeGame === "space" && <SpaceDefenderGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.space} updateBest={(s) => updateBest("space", s)} onExit={handleGameClose} />}
                {activeGame === "snake" && <SnakeGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.snake} updateBest={(s) => updateBest("snake", s)} onExit={handleGameClose} />}
                {activeGame === "blaster" && <VirusBlasterGame setXp={setXp} setStreak={setStreak} showToast={showToast} best={bestScores.blaster} updateBest={(s) => updateBest("blaster", s)} onExit={handleGameClose} />}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ============================================
// SHARED UI
// ============================================
function GameShell({ title, onExit, children }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-base font-bold sm:text-xl">{title}</h3>
        <button onClick={onExit} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 sm:text-sm">← Back</button>
      </div>
      {children}
    </div>
  );
}

function GameHud({ items }) {
  return (
    <div className="mb-3 grid gap-2 sm:mb-4 sm:gap-3" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((it, i) => (
        <div key={i} className={`rounded-xl border ${it.color} px-2 py-1.5 text-center sm:px-4 sm:py-3`}>
          <p className="text-[9px] uppercase tracking-widest sm:text-[10px]">{it.label}</p>
          <p className="text-sm font-extrabold text-white sm:text-xl">{it.value}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// GAME 1 — LINK CATCHER
// ============================================
function LinkCatcherGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const [dims, setDims] = useState({ w: 700, h: 480 });
  const GAME_DURATION = 45;

  useEffect(() => {
    const update = () => {
      const maxW = Math.min(window.innerWidth - 24, 900);
      const maxH = Math.min(window.innerHeight * 0.7, 480);
      const ratio = 700 / 480;
      let w = maxW, h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      setDims({ w: Math.round(w), h: Math.round(h) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const AREA_W = dims.w;
  const AREA_H = dims.h;

  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState([]);
  const [flash, setFlash] = useState(null);
  const [bestLocal, setBestLocal] = useState(best || 0);
  const [gameOver, setGameOver] = useState(false);

  const idRef = useRef(0);
  const loopRef = useRef(null);
  const tickRef = useRef(null);
  const areaHRef = useRef(AREA_H);
  const areaWRef = useRef(AREA_W);
  areaHRef.current = AREA_H;
  areaWRef.current = AREA_W;

  const goodLinks = ["google.com", "github.com", "wikipedia.org", "amazon.in", "linkedin.com"];
  const badLinks = ["bit.ly/win", "free-money.xyz", "insta-verify.me", "kyc-update.tk", "bank-login.co"];

  const spawn = useCallback(() => {
    const isBad = Math.random() < 0.65;
    const text = isBad ? badLinks[Math.floor(Math.random() * badLinks.length)] : goodLinks[Math.floor(Math.random() * goodLinks.length)];
    const id = ++idRef.current;
    const x = Math.random() * (areaWRef.current - 120) + 10;
    setItems((prev) => [...prev, { id, x, y: -40, isBad, text, speed: 1.2 + Math.random() * 1.3 }]);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const spawnInterval = setInterval(() => spawn(), 700);
    loopRef.current = setInterval(() => {
      setItems((prev) => {
        const next = [];
        for (const it of prev) {
          const newY = it.y + it.speed;
          if (newY > areaHRef.current + 40) {
            if (it.isBad) { setLives((l) => l - 1); setFlash("bad"); setTimeout(() => setFlash(null), 200); }
          } else next.push({ ...it, y: newY });
        }
        return next;
      });
    }, 40);
    tickRef.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { setPlaying(false); setGameOver(true); return 0; } return t - 1; });
    }, 1000);
    return () => { clearInterval(spawnInterval); clearInterval(loopRef.current); clearInterval(tickRef.current); };
  }, [playing, spawn]);

  useEffect(() => { if (lives <= 0 && playing) { setPlaying(false); setGameOver(true); } }, [lives, playing]);
  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  const clickItem = (item, e) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    if (item.isBad) {
      setScore((s) => s + 10); setXp((x) => x + 10); setStreak((s) => s + 1); setFlash("good");
      showToast("+10 XP 🎯 Blocked!", "success");
      if (e) burstConfetti(e.clientX, e.clientY);
      setTimeout(() => setFlash(null), 150);
    } else {
      setLives((l) => l - 1); setStreak(0); setFlash("bad");
      showToast("❌ That was a safe link!", "error");
      setTimeout(() => setFlash(null), 200);
    }
  };

  const start = () => { setPlaying(true); setGameOver(false); setTimeLeft(GAME_DURATION); setScore(0); setLives(3); setItems([]); };

  return (
    <GameShell title="🔗 Suspicious Link Catcher" onExit={onExit}>
      <GameHud
        items={[
          { label: "Time", value: `${timeLeft}s`, color: "border-cyan-400/30 bg-cyan-400/10" },
          { label: "Score", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "Lives", value: "❤️".repeat(Math.max(0, lives)), color: "border-red-400/30 bg-red-400/10" },
        ]}
      />
      <div
        className={`relative mx-auto overflow-hidden rounded-2xl border-2 transition ${flash === "good" ? "border-emerald-400" : flash === "bad" ? "border-red-400" : "border-white/10"}`}
        style={{ width: AREA_W, height: AREA_H, background: "linear-gradient(to bottom, #07111f, #030712)", maxWidth: "100%" }}
      >
        <div className="absolute inset-x-0 bottom-0 h-12 border-t border-cyan-400/20 bg-cyan-400/5" />
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-cyan-400/60">⬇ Your Inbox</p>
        {items.map((it) => (
          <button key={it.id} onClick={(e) => clickItem(it, e)} className={`absolute rounded-lg border-2 px-2 py-0.5 font-mono text-[9px] font-bold shadow-lg transition sm:px-3 sm:py-1 sm:text-xs ${it.isBad ? "border-red-400/60 bg-red-500/20 text-red-200" : "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"}`} style={{ left: Math.min(it.x, AREA_W - 90), top: it.y }}>
            {it.isBad ? "🚨 " : "✅ "}{it.text}
          </button>
        ))}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-3 text-center">
            {gameOver ? (
              <>
                <p className="text-3xl sm:text-5xl">🎯</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Game Over</h4>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-lg">Score: <strong className="text-cyan-400">{score}</strong></p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={14} /> Play Again</button>
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-5xl">🔗</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Catch the Bad Links</h4>
                <p className="mt-2 max-w-xs text-xs text-slate-300 sm:mt-3 sm:max-w-md sm:text-sm">Click <strong className="text-red-300">RED (bad)</strong> links.<br /><strong className="text-emerald-300">DON'T click GREEN (safe)</strong>!</p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={14} /> START</button>
              </>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}

// ============================================
// GAME 2 — MONEY ESCAPE
// ============================================
function MoneyEscapeGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const [dims, setDims] = useState({ w: 700, h: 420 });

  useEffect(() => {
    const update = () => {
      const maxW = Math.min(window.innerWidth - 24, 900);
      const maxH = Math.min(window.innerHeight * 0.65, 420);
      const ratio = 700 / 420;
      let w = maxW, h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      setDims({ w: Math.round(w), h: Math.round(h) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const AREA_W = dims.w;
  const AREA_H = dims.h;
  const PLAYER_SIZE = Math.max(30, Math.round(AREA_W * 0.06));
  const SCAM_SIZE = Math.max(26, Math.round(AREA_W * 0.055));

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [player, setPlayer] = useState({ x: AREA_W / 2 - PLAYER_SIZE / 2, y: AREA_H - PLAYER_SIZE - 10 });
  const [scams, setScams] = useState([]);
  const [bestLocal, setBestLocal] = useState(best || 0);
  const [flash, setFlash] = useState(false);
  const [paused, setPaused] = useState(false);

  const keysRef = useRef({});
  const idRef = useRef(0);
  const rafRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const containerRef = useRef(null);
  const playerRef = useRef(player);
  const dimsRef = useRef(dims);
  playerRef.current = player;
  dimsRef.current = dims;

  useEffect(() => {
    const down = (e) => { keysRef.current[e.key.toLowerCase()] = true; };
    const up = (e) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  const onPointerMove = (e) => {
    if (!playing || paused) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPlayer((p) => ({
      x: Math.max(0, Math.min(dimsRef.current.w - PLAYER_SIZE, x - PLAYER_SIZE / 2)),
      y: Math.max(0, Math.min(dimsRef.current.h - PLAYER_SIZE, y - PLAYER_SIZE / 2)),
    }));
  };

  useEffect(() => {
    if (!playing || paused) return;
    let lastT = performance.now();
    let lastRender = 0;
    const step = (t) => {
      const dt = Math.min(0.05, (t - lastT) / 1000);
      lastT = t;
      const minFrame = window.innerWidth < 768 ? 33 : 20;
      if (t - lastRender < minFrame) { rafRef.current = requestAnimationFrame(step); return; }
      lastRender = t;

      const speed = 300;
      const { w, h } = dimsRef.current;
      setPlayer((p) => {
        let nx = p.x, ny = p.y;
        const k = keysRef.current;
        if (k["arrowleft"] || k["a"]) nx -= speed * dt;
        if (k["arrowright"] || k["d"]) nx += speed * dt;
        if (k["arrowup"] || k["w"]) ny -= speed * dt;
        if (k["arrowdown"] || k["s"]) ny += speed * dt;
        return { x: Math.max(0, Math.min(w - PLAYER_SIZE, nx)), y: Math.max(0, Math.min(h - PLAYER_SIZE, ny)) };
      });
      if (t - lastSpawnRef.current > Math.max(400, 850 - score * 5)) {
        lastSpawnRef.current = t;
        const id = ++idRef.current;
        const x = Math.random() * (w - SCAM_SIZE);
        const labels = ["💀 Scam", "🎣 Phish", "📧 Spam", "💰 Trap", "🔓 Hack"];
        setScams((s) => [...s, { id, x, y: -SCAM_SIZE, vy: 160 + Math.random() * 100, label: labels[Math.floor(Math.random() * labels.length)] }]);
      }
      setScams((prev) => {
        const next = [];
        const pl = playerRef.current;
        for (const s of prev) {
          const ny = s.y + s.vy * dt;
          const hit = s.x + SCAM_SIZE > pl.x && s.x < pl.x + PLAYER_SIZE && ny + SCAM_SIZE > pl.y && ny < pl.y + PLAYER_SIZE;
          if (hit) { setGameOver(true); setPlaying(false); setFlash(true); setStreak(0); showToast("💥 Hit by a scam!", "error"); return []; }
          if (ny > h + SCAM_SIZE) { setScore((sc) => sc + 1); setXp((x) => x + 5); setStreak((st) => st + 1); }
          else next.push({ ...s, y: ny });
        }
        return next;
      });
      setTimeLeft((t0) => { if (t0 <= 0.05) { setPlaying(false); setGameOver(true); return 0; } return t0 - dt; });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, paused, score, setXp, setStreak, showToast]);

  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  const start = () => {
    setPlaying(true); setGameOver(false); setScore(0); setTimeLeft(40);
    setScams([]); setPlayer({ x: AREA_W / 2 - PLAYER_SIZE / 2, y: AREA_H - PLAYER_SIZE - 10 });
    setFlash(false); lastSpawnRef.current = 0;
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-base font-bold sm:text-xl">💰 Money Escape</h3>
        <div className="flex gap-2">
          {playing && <button onClick={() => setPaused((p) => !p)} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 sm:text-sm"><Pause size={13} className="inline" /> {paused ? "Resume" : "Pause"}</button>}
          <button onClick={onExit} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 sm:text-sm">← Back</button>
        </div>
      </div>
      <GameHud
        items={[
          { label: "Time", value: `${Math.ceil(timeLeft)}s`, color: "border-cyan-400/30 bg-cyan-400/10" },
          { label: "Dodged", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "Best", value: bestLocal, color: "border-amber-400/30 bg-amber-400/10" },
        ]}
      />
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerDown={onPointerMove}
        className={`relative mx-auto overflow-hidden rounded-2xl border-2 transition touch-none ${flash ? "border-red-500" : "border-white/10"}`}
        style={{ width: AREA_W, height: AREA_H, background: "radial-gradient(circle at center, #07111f, #030712)", cursor: playing ? "none" : "default", maxWidth: "100%" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute flex items-center justify-center rounded-full border-2 border-amber-400 bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg shadow-amber-500/50" style={{ width: PLAYER_SIZE, height: PLAYER_SIZE, left: player.x, top: player.y }}>
          <span className="font-extrabold text-amber-900" style={{ fontSize: PLAYER_SIZE * 0.5 }}>₹</span>
        </div>
        {scams.map((s) => (
          <div key={s.id} className="absolute flex items-center justify-center rounded-lg border-2 border-red-400/60 bg-red-500/20 text-[9px] font-bold text-red-100 shadow-lg shadow-red-500/20 sm:text-[10px]" style={{ width: SCAM_SIZE + 20, height: SCAM_SIZE, left: s.x, top: s.y }}>
            {s.label}
          </div>
        ))}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 p-4 text-center">
            {gameOver ? (
              <>
                <p className="text-3xl sm:text-5xl">💥</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">{timeLeft > 0 ? "Hit a Scam!" : "Survived!"}</h4>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-lg">Dodged: <strong className="text-cyan-400">{score}</strong></p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={14} /> Play Again</button>
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-5xl">💰</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Money Escape</h4>
                <p className="mt-2 max-w-xs text-xs text-slate-300 sm:mt-3 sm:max-w-md sm:text-sm">
                  Dodge the falling scams.<br />
                  <strong>Desktop:</strong> Arrow keys / WASD<br />
                  <strong>Mobile:</strong> Drag to move
                </p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={14} /> START</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// GAME 3 — PASSWORD DEFENSE
// ============================================
function CrackDefenseGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [hackProgress, setHackProgress] = useState(0);
  const [markerPos, setMarkerPos] = useState(0);
  const [safeZone, setSafeZone] = useState({ start: 35, width: 25 });
  const [flash, setFlash] = useState(null);
  const [bestLocal, setBestLocal] = useState(best || 0);
  const [feedback, setFeedback] = useState(null);

  const rafRef = useRef(null);
  const lastTRef = useRef(0);
  const markerRef = useRef(0);
  const dirRef = useRef(1);
  const hackRef = useRef(0);

  const SPEED = 90;
  const HACK_SPEED = 8;

  useEffect(() => {
    if (!playing) return;
    lastTRef.current = performance.now();
    let lastRender = 0;
    const step = (t) => {
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000);
      lastTRef.current = t;
      const minFrame = window.innerWidth < 768 ? 33 : 20;
      if (t - lastRender < minFrame) { rafRef.current = requestAnimationFrame(step); return; }
      lastRender = t;
      markerRef.current += SPEED * dt * dirRef.current;
      if (markerRef.current >= 100) { markerRef.current = 100; dirRef.current = -1; }
      if (markerRef.current <= 0) { markerRef.current = 0; dirRef.current = 1; }
      setMarkerPos(markerRef.current);
      hackRef.current += HACK_SPEED * dt;
      if (hackRef.current >= 100) {
        hackRef.current = 100;
        setHackProgress(100);
        setLives((l) => { const nl = l - 1; if (nl <= 0) { setPlaying(false); setGameOver(true); } return nl; });
        hackRef.current = 0; setHackProgress(0); setStreak(0); setFlash("bad"); setFeedback("💀 Hacker broke in! -1 life");
        setTimeout(() => setFlash(null), 300); setTimeout(() => setFeedback(null), 1500);
      } else setHackProgress(hackRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, setStreak]);

  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  const press = useCallback(() => {
    if (!playing) return;
    const inZone = markerPos >= safeZone.start && markerPos <= safeZone.start + safeZone.width;
    if (inZone) {
      setScore((s) => s + 1); setXp((x) => x + 10); setStreak((s) => s + 1); setFlash("good"); setFeedback("🛡️ Blocked!");
      showToast("+10 XP 🛡️ Blocked!", "success");
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
      hackRef.current = Math.max(0, hackRef.current - 15);
      setSafeZone({ start: 15 + Math.random() * 60, width: Math.max(12, 25 - score * 0.5) });
    } else {
      hackRef.current = Math.min(100, hackRef.current + 12);
      setStreak(0); setFlash("bad"); setFeedback("❌ Missed! Hacker advances");
      showToast("❌ Missed timing", "error");
    }
    setTimeout(() => setFlash(null), 250); setTimeout(() => setFeedback(null), 1000);
  }, [playing, markerPos, safeZone, score, setXp, setStreak, showToast]);

  useEffect(() => {
    const kd = (e) => { if (e.code === "Space" && playing) { e.preventDefault(); press(); } };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [playing, press]);

  const start = () => { setPlaying(true); setGameOver(false); setScore(0); setLives(3); setHackProgress(0); setMarkerPos(0); markerRef.current = 0; dirRef.current = 1; hackRef.current = 0; setSafeZone({ start: 35, width: 25 }); };

  return (
    <GameShell title="🔓 Password Defense" onExit={onExit}>
      <GameHud
        items={[
          { label: "Blocked", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "Lives", value: "❤️".repeat(Math.max(0, lives)), color: "border-red-400/30 bg-red-400/10" },
          { label: "Best", value: bestLocal, color: "border-amber-400/30 bg-amber-400/10" },
        ]}
      />
      <div className={`relative overflow-hidden rounded-2xl border-2 bg-[#07111f] p-4 sm:p-6 lg:p-8 transition ${flash === "good" ? "border-emerald-400" : flash === "bad" ? "border-red-400" : "border-white/10"}`}>
        <div className="mb-2 flex justify-between text-xs font-bold"><span className="text-red-400">💀 HACKER</span><span className="text-slate-400">{Math.round(hackProgress)}%</span></div>
        <div className="h-3 overflow-hidden rounded-full border border-red-400/30 bg-black/40 sm:h-4"><div className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-200" style={{ width: `${hackProgress}%` }} /></div>
        <div className="mt-6 sm:mt-8">
          <div className="mb-2 flex flex-wrap justify-between gap-2 text-xs font-bold"><span className="text-cyan-400">🛡️ DEFENSE</span><span className="text-slate-400">Hit SPACE inside the green zone</span></div>
          <div className="relative h-12 overflow-hidden rounded-2xl border-2 border-white/10 bg-black/40 sm:h-16">
            <div className="absolute inset-y-0 bg-emerald-400/20 border-x-2 border-emerald-400" style={{ left: `${safeZone.start}%`, width: `${safeZone.width}%` }}>
              <div className="absolute inset-0 flex items-center justify-center text-emerald-300 font-bold text-xs">SAFE</div>
            </div>
            <div className="absolute inset-y-0 w-1.5 bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" style={{ left: `${markerPos}%` }} />
          </div>
        </div>
        {feedback && <p className={`mt-4 animate-pop text-center text-base font-bold sm:text-lg ${feedback.includes("Blocked") ? "text-emerald-400" : "text-red-400"}`}>{feedback}</p>}
        {playing && <button onClick={press} className="mt-5 w-full rounded-2xl border-2 border-cyan-400/50 bg-cyan-400/10 py-4 text-sm font-bold text-cyan-300 transition hover:scale-[1.02] hover:bg-cyan-400/20 active:scale-95 sm:py-6 sm:text-lg">PRESS SPACE (or tap here)</button>}
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6 text-center">
            {gameOver ? (
              <>
                <p className="text-4xl sm:text-5xl">🔓</p>
                <h4 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Hacked!</h4>
                <p className="mt-2 text-base text-slate-300 sm:text-lg">Blocked: <strong className="text-cyan-400">{score}</strong></p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                <button onClick={start} className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={15} /> Try Again</button>
              </>
            ) : (
              <>
                <p className="text-4xl sm:text-5xl">🔐</p>
                <h4 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">Password Defense</h4>
                <p className="mt-3 max-w-md text-sm text-slate-300">A hacker is trying to break in.<br /><strong className="text-cyan-300">Press SPACE</strong> when the marker is in the <strong className="text-emerald-300">green zone</strong>.</p>
                <button onClick={start} className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={15} /> START</button>
              </>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}

// ============================================
// GAME 4 — SPACE DEFENDER
// ============================================
function SpaceDefenderGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const [dims, setDims] = useState({ w: 700, h: 460 });
  const GAME_DURATION = 45;

  useEffect(() => {
    const update = () => {
      const maxW = Math.min(window.innerWidth - 24, 900);
      const maxH = Math.min(window.innerHeight * 0.65, 460);
      const ratio = 700 / 460;
      let w = maxW, h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      setDims({ w: Math.round(w), h: Math.round(h) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const AREA_W = dims.w;
  const AREA_H = dims.h;

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [enemies, setEnemies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [bestLocal, setBestLocal] = useState(best || 0);

  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTRef = useRef(0);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  const start = () => {
    setPlaying(true); setGameOver(false); setTimeLeft(GAME_DURATION);
    setScore(0); setHealth(100); setEnemies([]); setBullets([]);
    lastSpawnRef.current = 0;
  };

  const shoot = (e) => {
    if (!playing || !containerRef.current) return;
    const { w, h } = dimsRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const tx = e.clientX - rect.left;
    const ty = e.clientY - rect.top;
    const id = ++idRef.current;
    setBullets((b) => [...b, { id, x: w / 2, y: h - 40, tx, ty, progress: 0 }]);
  };

  useEffect(() => {
    if (!playing) return;
    lastTRef.current = performance.now();
    let lastRender = 0;
    const step = (t) => {
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000);
      lastTRef.current = t;
      const minFrame = window.innerWidth < 768 ? 33 : 20;
      if (t - lastRender < minFrame) { rafRef.current = requestAnimationFrame(step); return; }
      lastRender = t;
      const { w, h } = dimsRef.current;

      if (t - lastSpawnRef.current > Math.max(500, 1200 - score * 8)) {
        lastSpawnRef.current = t;
        const id = ++idRef.current;
        const icons = ["👾", "🦠", "💀", "🎣", "⚠️"];
        const x = 60 + Math.random() * (w - 120);
        setEnemies((e) => [...e, { id, x, y: -40, vy: 55 + Math.random() * 55, vx: (Math.random() - 0.5) * 60, icon: icons[Math.floor(Math.random() * icons.length)], points: 10 }]);
      }

      setEnemies((prev) => {
        const next = [];
        let dmg = 0;
        for (const en of prev) {
          const nx = en.x + en.vx * dt;
          const ny = en.y + en.vy * dt;
          const dx = nx - w / 2;
          const dy = ny - (h - 40);
          if (Math.abs(dx) < 25 && Math.abs(dy) < 25) { dmg += 15; continue; }
          if (ny > h + 40) continue;
          next.push({ ...en, x: nx, y: ny });
        }
        if (dmg > 0) {
          setHealth((hh) => { const nh = Math.max(0, hh - dmg); if (nh <= 0) { setPlaying(false); setGameOver(true); } return nh; });
          showToast(`💥 Server hit! -${dmg}%`, "error");
        }
        return next;
      });

      setBullets((prev) => {
        const next = [];
        for (const b of prev) {
          const p = b.progress + 4 * dt;
          if (p >= 1) {
            let hitCount = 0;
            setEnemies((enemies) => {
              const remaining = [];
              for (const en of enemies) {
                const d = Math.hypot(en.x - b.tx, en.y - b.ty);
                if (d < 40) { hitCount++; setScore((s) => s + en.points); setXp((x) => x + en.points); setStreak((s) => s + 1); burstConfetti(b.tx, b.ty); }
                else remaining.push(en);
              }
              if (hitCount > 0) showToast(`+${hitCount * 10} XP 🎯 Hit!`, "success");
              return remaining;
            });
            continue;
          }
          next.push({ ...b, progress: p });
        }
        return next;
      });

      setTimeLeft((tl) => { if (tl <= 0.05) { setPlaying(false); setGameOver(true); return 0; } return tl - dt; });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, score, setXp, setStreak, showToast]);

  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  return (
    <GameShell title="🚀 Space Defender" onExit={onExit}>
      <GameHud
        items={[
          { label: "Time", value: `${Math.ceil(timeLeft)}s`, color: "border-cyan-400/30 bg-cyan-400/10" },
          { label: "Score", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "HP", value: `${Math.round(health)}%`, color: "border-red-400/30 bg-red-400/10" },
          { label: "Best", value: bestLocal, color: "border-amber-400/30 bg-amber-400/10" },
        ]}
      />

      <div
        ref={containerRef}
        onClick={shoot}
        className={`relative mx-auto overflow-hidden rounded-2xl border-2 transition touch-none cursor-crosshair ${health < 40 ? "border-red-500" : "border-white/10"}`}
        style={{ width: AREA_W, height: AREA_H, background: "radial-gradient(ellipse at bottom, #0a1a2e, #030712 60%)", maxWidth: "100%" }}
      >
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/40" style={{ left: `${(i * 73) % 100}%`, top: `${(i * 47) % 100}%`, width: 1 + (i % 3), height: 1 + (i % 3) }} />
          ))}
        </div>

        <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400 bg-cyan-400/20 shadow-lg shadow-cyan-500/40 sm:h-12 sm:w-12" style={{ left: AREA_W / 2 - 20, top: AREA_H - 60 }}>
          <Crosshair className="text-cyan-300" size={18} />
        </div>

        {enemies.map((en) => (
          <div key={en.id} className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-400/60 bg-red-500/20 text-xl shadow-lg shadow-red-500/30 sm:h-12 sm:w-12 sm:text-2xl" style={{ left: en.x - 20, top: en.y - 20 }}>
            {en.icon}
          </div>
        ))}

        {bullets.map((b) => {
          const x = b.x + (b.tx - b.x) * b.progress;
          const y = b.y + (b.ty - b.y) * b.progress;
          return <div key={b.id} className="pointer-events-none absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]" style={{ left: x - 4, top: y - 4 }} />;
        })}

        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
            {gameOver ? (
              <>
                <p className="text-3xl sm:text-5xl">🚀</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">{health > 0 ? "Mission Complete!" : "Server Down!"}</h4>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-lg">Score: <strong className="text-cyan-400">{score}</strong></p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={14} /> Play Again</button>
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-5xl">🚀</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Space Defender</h4>
                <p className="mt-2 max-w-xs text-xs text-slate-300 sm:mt-3 sm:max-w-md sm:text-sm">
                  Tap the sky to shoot hacker bots 👾🦠💀<br />
                  before they reach your server!
                </p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={14} /> START</button>
              </>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}

// ============================================
// GAME 5 — CYBER SNAKE
// ============================================
function SnakeGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const COLS = 20;
  const ROWS = 15;
  const [cellSize, setCellSize] = useState(28);

  useEffect(() => {
    const updateCell = () => {
      const w = window.innerWidth;
      if (w < 400) setCellSize(14);
      else if (w < 640) setCellSize(16);
      else if (w < 900) setCellSize(22);
      else setCellSize(28);
    };
    updateCell();
    window.addEventListener("resize", updateCell);
    return () => window.removeEventListener("resize", updateCell);
  }, []);

  const CELL = cellSize;

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 7 }]);
  const [food, setFood] = useState({ x: 15, y: 7, type: "data" });
  const [bestLocal, setBestLocal] = useState(best || 0);
  const [paused, setPaused] = useState(false);

  const dirRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 10, y: 7 }]);
  const foodRef = useRef({ x: 15, y: 7, type: "data" });
  const tickRef = useRef(null);

  const spawnFood = useCallback(() => {
    const free = [];
    for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) {
      if (!snakeRef.current.some((s) => s.x === x && s.y === y)) free.push({ x, y });
    }
    if (free.length === 0) return;
    const cell = free[Math.floor(Math.random() * free.length)];
    foodRef.current = { ...cell, type: Math.random() < 0.75 ? "data" : "virus" };
    setFood(foodRef.current);
  }, []);

  const start = () => {
    const init = [{ x: 10, y: 7 }];
    setPlaying(true); setGameOver(false); setScore(0);
    setSnake(init); snakeRef.current = init;
    dirRef.current = { x: 1, y: 0 };
    foodRef.current = { x: 15, y: 7, type: "data" }; setFood(foodRef.current);
    setPaused(false);
  };

  useEffect(() => {
    const kd = (e) => {
      const k = e.key.toLowerCase();
      const cur = dirRef.current;
      if ((k === "arrowup" || k === "w") && cur.y === 0) dirRef.current = { x: 0, y: -1 };
      else if ((k === "arrowdown" || k === "s") && cur.y === 0) dirRef.current = { x: 0, y: 1 };
      else if ((k === "arrowleft" || k === "a") && cur.x === 0) dirRef.current = { x: -1, y: 0 };
      else if ((k === "arrowright" || k === "d") && cur.x === 0) dirRef.current = { x: 1, y: 0 };
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, []);

  const touchRef = useRef({ x: 0, y: 0 });
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchMove = (e) => {
    const t = e.touches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
    const cur = dirRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && cur.x === 0) dirRef.current = { x: 1, y: 0 };
      else if (dx < 0 && cur.x === 0) dirRef.current = { x: -1, y: 0 };
    } else {
      if (dy > 0 && cur.y === 0) dirRef.current = { x: 0, y: 1 };
      else if (dy < 0 && cur.y === 0) dirRef.current = { x: 0, y: -1 };
    }
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  useEffect(() => {
    if (!playing || paused) return;
    const tickInterval = Math.max(90, 180 - Math.floor(score / 20) * 10);
    tickRef.current = setInterval(() => {
      const cur = dirRef.current;
      const head = snakeRef.current[0];
      const newHead = { x: head.x + cur.x, y: head.y + cur.y };

      if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS) {
        setPlaying(false); setGameOver(true); setStreak(0);
        showToast("💥 Hit the wall!", "error");
        return;
      }
      if (snakeRef.current.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        setPlaying(false); setGameOver(true); setStreak(0);
        showToast("💥 Bit yourself!", "error");
        return;
      }

      const ateFood = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;
      let newSnake;
      if (ateFood) {
        if (foodRef.current.type === "data") {
          setScore((s) => s + 10); setXp((x) => x + 10); setStreak((s) => s + 1);
          showToast("+10 XP 📦 Data eaten!", "success");
          newSnake = [newHead, ...snakeRef.current];
          burstConfetti(window.innerWidth / 2, window.innerHeight / 2);
        } else {
          showToast("🦠 Virus! Snake shrunk", "error");
          newSnake = [newHead, ...snakeRef.current.slice(0, Math.max(1, snakeRef.current.length - 2))];
          setStreak(0);
        }
        snakeRef.current = newSnake;
        setSnake(newSnake);
        spawnFood();
      } else {
        newSnake = [newHead, ...snakeRef.current.slice(0, -1)];
        snakeRef.current = newSnake;
        setSnake(newSnake);
      }
    }, tickInterval);
    return () => clearInterval(tickRef.current);
  }, [playing, paused, score, setXp, setStreak, showToast, spawnFood]);

  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <h3 className="text-base font-bold sm:text-xl">🐍 Cyber Snake</h3>
        <div className="flex gap-2">
          {playing && <button onClick={() => setPaused((p) => !p)} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 sm:text-sm"><Pause size={13} className="inline" /> {paused ? "Resume" : "Pause"}</button>}
          <button onClick={onExit} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-white/[0.08] hover:text-white sm:px-4 sm:py-2 sm:text-sm">← Back</button>
        </div>
      </div>

      <GameHud
        items={[
          { label: "Score", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "Length", value: snake.length, color: "border-cyan-400/30 bg-cyan-400/10" },
          { label: "Best", value: bestLocal, color: "border-amber-400/30 bg-amber-400/10" },
        ]}
      />

      <div className="flex justify-center">
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-[#030712] touch-none"
          style={{ width: COLS * CELL, height: ROWS * CELL, maxWidth: "100%" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(rgba(0,240,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.15) 1px, transparent 1px)", backgroundSize: `${CELL}px ${CELL}px` }} />

          <div className={`absolute flex items-center justify-center ${food.type === "data" ? "text-emerald-400" : "text-red-400"}`} style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL, fontSize: CELL * 0.7 }}>
            {food.type === "data" ? "📦" : "🦠"}
          </div>

          {snake.map((s, i) => (
            <div key={i} className={`absolute rounded ${i === 0 ? "bg-cyan-400 shadow-lg shadow-cyan-500/50" : "bg-cyan-500/60"}`} style={{ left: s.x * CELL + 1, top: s.y * CELL + 1, width: CELL - 2, height: CELL - 2 }} />
          ))}

          {!playing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
              {gameOver ? (
                <>
                  <p className="text-4xl sm:text-5xl">🐍</p>
                  <h4 className="mt-3 text-2xl font-extrabold text-white sm:mt-4 sm:text-3xl">Game Over</h4>
                  <p className="mt-2 text-base text-slate-300 sm:text-lg">Score: <strong className="text-cyan-400">{score}</strong></p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                  <button onClick={start} className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={15} /> Play Again</button>
                </>
              ) : (
                <>
                  <p className="text-4xl sm:text-5xl">🐍</p>
                  <h4 className="mt-3 text-2xl font-extrabold text-white sm:mt-4 sm:text-3xl">Cyber Snake</h4>
                  <p className="mt-3 max-w-xs text-xs text-slate-300 sm:text-sm">
                    Eat <strong className="text-emerald-300">📦 data packets</strong> to grow.<br />
                    Avoid <strong className="text-red-300">🦠 viruses</strong> and walls.<br />
                    <strong>Desktop:</strong> Arrow keys / WASD<br />
                    <strong>Mobile:</strong> Swipe to turn
                  </p>
                  <button onClick={start} className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={15} /> START</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// GAME 6 — VIRUS BLASTER
// ============================================
function VirusBlasterGame({ setXp, setStreak, showToast, best, updateBest, onExit }) {
  const [dims, setDims] = useState({ w: 700, h: 460 });
  const GAME_DURATION = 40;

  useEffect(() => {
    const update = () => {
      const maxW = Math.min(window.innerWidth - 24, 900);
      const maxH = Math.min(window.innerHeight * 0.65, 460);
      const ratio = 700 / 460;
      let w = maxW, h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      setDims({ w: Math.round(w), h: Math.round(h) });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const AREA_W = dims.w;
  const AREA_H = dims.h;

  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [viruses, setViruses] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [bestLocal, setBestLocal] = useState(best || 0);

  const rafRef = useRef(null);
  const lastTRef = useRef(0);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const dimsRef = useRef(dims);
  dimsRef.current = dims;

  const start = () => {
    setPlaying(true); setGameOver(false); setTimeLeft(GAME_DURATION);
    setScore(0); setMisses(0); setViruses([]); setExplosions([]);
    lastSpawnRef.current = 0;
  };

  const clickVirus = (v, e) => {
    if (!playing) return;
    const id = ++idRef.current;
    setExplosions((ex) => [...ex, { id, x: v.x, y: v.y, born: performance.now() }]);
    setViruses((prev) => prev.filter((x) => x.id !== v.id));
    setScore((s) => s + v.points);
    setXp((x) => x + v.points);
    setStreak((s) => s + 1);
    showToast(`+${v.points} XP 🎯 Destroyed!`, "success");
    if (e) burstConfetti(e.clientX, e.clientY);
  };

  useEffect(() => {
    if (!playing) return;
    lastTRef.current = performance.now();
    let lastRender = 0;
    const step = (t) => {
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000);
      lastTRef.current = t;
      const minFrame = window.innerWidth < 768 ? 33 : 20;
      if (t - lastRender < minFrame) { rafRef.current = requestAnimationFrame(step); return; }
      lastRender = t;
      const { w, h } = dimsRef.current;

      if (t - lastSpawnRef.current > Math.max(350, 750 - score * 3)) {
        lastSpawnRef.current = t;
        const id = ++idRef.current;
        const icons = ["🦠", "👾", "💀", "🎣", "⚠️", "🧬"];
        setViruses((prev) => [...prev, { id, x: 40 + Math.random() * (w - 80), y: -30, vy: 55 + Math.random() * 70, vx: (Math.random() - 0.5) * 30, points: 10, icon: icons[Math.floor(Math.random() * icons.length)], size: 36 + Math.random() * 16 }]);
      }

      setViruses((prev) => {
        const next = [];
        let miss = 0;
        for (const v of prev) {
          const ny = v.y + v.vy * dt;
          const nx = v.x + v.vx * dt;
          if (ny > h + 30) { miss++; continue; }
          next.push({ ...v, x: nx, y: ny });
        }
        if (miss > 0) {
          setMisses((m) => m + miss);
          setStreak(0);
          showToast(`❌ ${miss} virus slipped!`, "error");
        }
        return next;
      });

      setExplosions((prev) => prev.filter((e) => t - e.born < 500));

      setTimeLeft((tl) => { if (tl <= 0.05) { setPlaying(false); setGameOver(true); return 0; } return tl - dt; });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, score, setXp, setStreak, showToast]);

  useEffect(() => { if (gameOver) { updateBest(score); setBestLocal((b) => Math.max(b, score)); } }, [gameOver]);

  return (
    <GameShell title="🎯 Virus Blaster" onExit={onExit}>
      <GameHud
        items={[
          { label: "Time", value: `${Math.ceil(timeLeft)}s`, color: "border-cyan-400/30 bg-cyan-400/10" },
          { label: "Score", value: score, color: "border-emerald-400/30 bg-emerald-400/10" },
          { label: "Missed", value: misses, color: "border-red-400/30 bg-red-400/10" },
          { label: "Best", value: bestLocal, color: "border-amber-400/30 bg-amber-400/10" },
        ]}
      />

      <div
        className="relative mx-auto overflow-hidden rounded-2xl border-2 border-white/10 cursor-crosshair"
        style={{ width: AREA_W, height: AREA_H, background: "radial-gradient(ellipse at top, #1a0a2e, #030712 60%)", maxWidth: "100%" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="absolute bottom-0 left-0 right-0 h-10 border-t-2 border-cyan-400/50 bg-gradient-to-t from-cyan-400/20 to-transparent" />
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-cyan-300">🖥️ Your Server</p>

        {viruses.map((v) => (
          <button key={v.id} onClick={(e) => clickVirus(v, e)} className="absolute flex items-center justify-center rounded-full border-2 border-red-400/60 bg-red-500/20 shadow-lg shadow-red-500/40 transition hover:scale-110" style={{ left: v.x - v.size / 2, top: v.y - v.size / 2, width: v.size, height: v.size, fontSize: v.size * 0.5 }}>
            {v.icon}
          </button>
        ))}

        {explosions.map((ex) => (
          <div key={ex.id} className="pointer-events-none absolute animate-pop rounded-full border-2 border-amber-400 bg-amber-400/40" style={{ left: ex.x - 30, top: ex.y - 30, width: 60, height: 60, boxShadow: "0 0 30px rgba(251,191,36,0.8)" }} />
        ))}

        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center">
            {gameOver ? (
              <>
                <p className="text-3xl sm:text-5xl">🎯</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Round Complete!</h4>
                <p className="mt-1 text-sm text-slate-300 sm:mt-2 sm:text-lg">Score: <strong className="text-cyan-400">{score}</strong></p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">Best: {Math.max(bestLocal, score)}</p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-6 sm:py-3"><RotateCcw size={14} /> Play Again</button>
              </>
            ) : (
              <>
                <p className="text-3xl sm:text-5xl">🎯</p>
                <h4 className="mt-2 text-xl font-extrabold text-white sm:mt-4 sm:text-3xl">Virus Blaster</h4>
                <p className="mt-2 max-w-xs text-xs text-slate-300 sm:mt-3 sm:max-w-md sm:text-sm">
                  Tap falling viruses 🦠👾💀 to destroy them<br />
                  before they reach your server!
                </p>
                <button onClick={start} className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:mt-6 sm:px-8 sm:py-3"><Play size={14} /> START</button>
              </>
            )}
          </div>
        )}
      </div>
    </GameShell>
  );
}

export default App;