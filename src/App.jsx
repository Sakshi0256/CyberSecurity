import { useState } from "react";
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
  Clock3,
  Users,
  Award,
  ChevronDown,
  Check,
  AlertTriangle,
  Zap,
} from "lucide-react";

const topics = [
  {
    icon: MailWarning,
    title: "Phishing & Scams",
    description:
      "Learn how to identify suspicious emails, fake websites, malicious links and social engineering attacks.",
    level: "Essential",
  },
  {
    icon: KeyRound,
    title: "Passwords & MFA",
    description:
      "Build stronger authentication habits and understand why multi-factor authentication matters.",
    level: "Essential",
  },
  {
    icon: Smartphone,
    title: "Device Security",
    description:
      "Protect your phones, laptops and personal devices from common attacks and unauthorized access.",
    level: "Practical",
  },
  {
    icon: Globe,
    title: "Safe Browsing",
    description:
      "Understand unsafe websites, malicious downloads, browser threats and secure online behavior.",
    level: "Practical",
  },
  {
    icon: Database,
    title: "Data Protection",
    description:
      "Learn how sensitive information gets exposed and what you can do to protect it.",
    level: "Advanced",
  },
  {
    icon: Shield,
    title: "Security Hygiene",
    description:
      "Develop simple everyday habits that reduce your risk across work and personal environments.",
    level: "Essential",
  },
];

const schedule = [
  {
    time: "10:00 AM",
    title: "Cybersecurity Fundamentals",
    description: "Understanding today's digital threat landscape.",
  },
  {
    time: "11:00 AM",
    title: "Phishing & Social Engineering",
    description: "Spot the warning signs before you click.",
  },
  {
    time: "12:00 PM",
    title: "Passwords & MFA",
    description: "Build stronger authentication habits.",
  },
  {
    time: "02:00 PM",
    title: "Device & Data Protection",
    description: "Secure the devices and information you use every day.",
  },
  {
    time: "03:00 PM",
    title: "Interactive Security Quiz",
    description: "Test your knowledge with real-world scenarios.",
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

const quizQuestions = [
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
    question:
      "Which password is the strongest?",
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
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-white">
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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["home", "Home"],
              ["about", "About"],
              ["topics", "Topics"],
              ["schedule", "Schedule"],
              ["quiz", "Quiz"],
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

          <div className="hidden md:block">
            <button
              onClick={() => setRegisterOpen(true)}
              className="group flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Register
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile menu */}
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
                ["schedule", "Schedule"],
                ["quiz", "Quiz"],
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
                onClick={() => {
                  setMenuOpen(false);
                  setRegisterOpen(true);
                }}
                className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
              >
                Register for Workshop
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section
          id="home"
          className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8"
        >
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                Cybersecurity Awareness Workshop
              </div>

              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Stay Smart.
                <br />
                <span className="text-cyan-400">Stay Secure.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                Learn how to recognize cyber threats, protect your digital
                identity and build security habits that actually keep you safe.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Join the Workshop
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <button
                  onClick={() => scrollToSection("topics")}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Explore Topics
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

            {/* Security visual */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-[80px]" />

              <div className="relative rounded-[2rem] border border-cyan-400/20 bg-white/[0.025] p-5 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl">
                <div className="rounded-3xl border border-white/10 bg-[#07111f] p-7">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Security Status
                      </p>
                      <p className="mt-1 font-semibold">System Protected</p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400/10">
                      <Check className="text-emerald-400" />
                    </div>
                  </div>

                  <div className="flex justify-center py-8">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-cyan-400/20">
                      <div className="absolute inset-5 rounded-full border border-cyan-400/20" />
                      <div className="absolute inset-10 rounded-full border border-cyan-400/20" />

                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_50px_rgba(34,211,238,0.15)]">
                        <Shield size={48} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-slate-500">Threat Level</p>
                      <p className="mt-1 font-bold text-emerald-400">LOW</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-slate-500">Awareness</p>
                      <p className="mt-1 font-bold text-cyan-400">HIGH</p>
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
              ["6+", "Security topics"],
              ["100%", "Practical awareness"],
              ["1", "Interactive quiz"],
            ].map(([number, text]) => (
              <div key={text} className="px-6 py-10 text-center">
                <p className="text-3xl font-extrabold text-cyan-400">
                  {number}
                </p>
                <p className="mt-2 text-xs text-slate-500 sm:text-sm">
                  {text}
                </p>
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

        {/* TOPICS */}
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
                No unnecessary jargon. Just practical knowledge you can apply
                immediately.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {topics.map((topic, index) => {
                const Icon = topic.icon;

                return (
                  <div
                    key={topic.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#07111f] p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyber"
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
                        <span className="text-xs font-semibold text-cyan-400">
                          {topic.level}
                        </span>

                        <ArrowRight
                          size={17}
                          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SCHEDULE */}
        <section id="schedule" className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Workshop Schedule
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                One day.
                <br />
                <span className="text-cyan-400">Better security.</span>
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                A structured session designed to take you from cybersecurity
                basics to practical decision-making.
              </p>

              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Clock3 className="text-cyan-400" size={22} />
                </div>

                <div>
                  <p className="font-semibold">Full-day workshop</p>
                  <p className="text-sm text-slate-500">
                    10:00 AM — 4:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={item.title}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:border-cyan-400/30"
                >
                  <div className="w-20 shrink-0 pt-1 text-sm font-bold text-cyan-400">
                    {item.time}
                  </div>

                  <div className="relative flex-1 border-l border-white/10 pl-6">
                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz" className="bg-white/[0.015] py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Test Your Awareness
              </p>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Would you spot the threat?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-slate-400">
                Try a few realistic scenarios and see how strong your
                cybersecurity instincts are.
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
                        style =
                          "border-red-400/40 bg-red-400/10 text-red-300";
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
                    className="mt-8 rounded-xl border border-white/10 px-6 py-3 font-semibold transition hover:bg-white/5"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SPEAKERS */}
        <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              Learn From Experts
            </p>

            <h2 className="text-4xl font-bold sm:text-5xl">
              Practical. Clear. Relevant.
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
            {[
              ["01", "Security Awareness", "Learn how attackers manipulate human behavior."],
              ["02", "Digital Protection", "Protect accounts, devices and personal information."],
              ["03", "Incident Response", "Know what to do when something suspicious happens."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-7 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-400">
                  {number}
                </div>

                <h3 className="mt-6 font-bold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </div>
            ))}
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
                onClick={() => setRegisterOpen(true)}
                className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Register for the Workshop
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
            <button onClick={() => scrollToSection("schedule")}>
              Schedule
            </button>
            <button onClick={() => scrollToSection("quiz")}>Quiz</button>
            <button onClick={() => scrollToSection("faq")}>FAQ</button>
          </div>

          <p className="text-xs text-slate-600">
            © 2026 CyberShield
          </p>
        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      {registerOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
          onClick={() => setRegisterOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#07111f] p-7 shadow-2xl sm:p-9"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                  Registration
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Reserve your seat
                </h2>
              </div>

              <button
                onClick={() => setRegisterOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Registration submitted successfully!");
                setRegisterOpen(false);
              }}
            >
              <input
                required
                placeholder="Full name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
              />

              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
              />

              <input
                placeholder="Organization / College"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;