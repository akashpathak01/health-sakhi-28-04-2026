import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Sparkles, BookOpen, Video, Users, Check, Star, ArrowRight, Play, Pause, MessageCircle, Activity, ShieldCheck, Zap, Globe, HeartPulse, DollarSign, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { defaultPlans, MEMBER_PLAN_KEY, PLAN_STORAGE_KEY } from '../data/planCatalog';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isYearly, setIsYearly] = useState(false);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Teacher, Mumbai",
      quote: "HealthSakhi changed my life. I finally understood my PCOD and healed naturally. The AI Sakhi chat felt like talking to my best friend — no judgment, pure love.",
      img: "/Images/image7.png"
    },
    {
      name: "Ananya Reddy",
      role: "IT Professional, Hyderabad",
      quote: "I was skeptical at first, but the emotional healing programs truly helped me manage stress. The mood check feature every morning is now part of my routine!",
      img: "/Images/image8.png"
    },
    {
      name: "Meera Pillai",
      role: "Homemaker, Kerala",
      quote: "The book library is incredible! I read the Hunger Mystery book and understood my cravings for the first time. The platform truly feels like a trusted sister.",
      img: "/Images/image9.png"
    },
    {
      name: "Kavitha Nair",
      role: "Entrepreneur, Bangalore",
      quote: "Premium membership is worth every rupee. The advisor sessions with certified consultants helped me tackle hormonal issues I had been ignoring for years.",
      img: "/Images/image10.png"
    },
    {
      name: "Sunita Patel",
      role: "Student, Ahmedabad",
      quote: "As a young woman navigating puberty and emotional changes, HealthSakhi was a safe space I never knew I needed. The gentle language makes you feel so understood.",
      img: "/Images/image11.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const [isPlayingDemo, setIsPlayingDemo] = useState(true);
  const [pricingPlans, setPricingPlans] = useState(defaultPlans);

  useEffect(() => {
    const savedPlans = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!savedPlans) return;
    try {
      const parsedPlans = JSON.parse(savedPlans);
      if (Array.isArray(parsedPlans) && parsedPlans.length > 0) {
        setPricingPlans(parsedPlans);
      }
    } catch (error) {
      setPricingPlans(defaultPlans);
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden" style={{ background: 'linear-gradient(135deg, rgb(252, 228, 236) 0%, rgb(237, 231, 246) 50%, rgb(255, 243, 224) 100%)' }}>
      <style>{`
        .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.8); }
        .hero-gradient { background: linear-gradient(135deg, rgb(252, 228, 236) 0%, rgb(237, 231, 246) 50%, rgb(255, 243, 224) 100%); }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient pt-[90px] w-full">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-block px-5 py-2 bg-[#F3E7ED] rounded-2xl mb-8 border border-white/50">
              <span className="text-[10px] font-bold text-[#A98DA4] tracking-[0.2em] uppercase">India's #1 Women Wellness Portal</span>
            </div>

            <h1 className="text-3xl md:text-[50px] font-bold text-[#2D1520] mb-6 leading-[1.1] tracking-tight">
              Your Personal <br />
              <span className="text-[#B197B0]">Wellness Sakhi</span> <br />
              is here for you
            </h1>

            <p className="text-[15px] text-[#6B5E63] leading-relaxed max-w-lg mb-8 font-medium opacity-90">
              A safe, beautiful space for women to heal, grow, and thrive. From PCOD guides to emotional healing — we understand you. 🌸
            </p>

            {/* Mood Selector */}
            <div className="mb-8">
              <p className="text-[12px] font-bold text-[#8E7F84] mb-4">How are you feeling today?</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Happy', icon: '😊', color: '#FEECEC', text: '#D17B88' },
                  { label: 'Tired', icon: '😴', color: '#F3EAFC', text: '#9079C1' },
                  { label: 'Stressed', icon: '😟', color: '#FEECEC', text: '#D17B88' },
                  { label: 'Low Energy', icon: '😴', color: '#FEF9E3', text: '#CCAA3D' },
                ].map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => {
                      localStorage.setItem('pendingMood', mood.label);
                      navigate('/login');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 shadow-sm border border-white/40"
                    style={{ backgroundColor: mood.color, color: mood.text }}
                  >
                    <span className="text-base">{mood.icon}</span>
                    <span className="text-[12px] font-bold">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <button
                className="px-8 py-3.5 text-white rounded-[2rem] font-bold text-[13px] shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
                style={{ background: 'linear-gradient(135deg, rgb(216, 167, 177), rgb(156, 123, 184))' }}
              >
                Begin My Healing Journey
              </button>
              <button className="px-8 py-3.5 bg-white border-2 border-[#F3E7ED] text-[#A98DA4] rounded-[2rem] font-bold text-[13px] hover:bg-rose-50/30 transition-all w-full sm:w-auto shadow-sm">
                Explore Features
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 md:gap-14 opacity-80">
              <div>
                <p className="text-xl font-bold text-[#2D1520]">50K+</p>
                <p className="text-[9px] font-bold text-[#6B5E63] uppercase tracking-widest mt-1">Women Healed</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D1520]">200+</p>
                <p className="text-[9px] font-bold text-[#6B5E63] uppercase tracking-widest mt-1">Healing Programs</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#2D1520]">98%</p>
                <p className="text-[9px] font-bold text-[#6B5E63] uppercase tracking-widest mt-1">Happy Members</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end lg:-mt-12"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-[400px] aspect-[1/1] lg:aspect-[4/4.2]">
              <div className="absolute inset-0 bg-[#F3E7ED] rounded-[4rem] rotate-2 scale-[1.05] -z-10 shadow-2xl opacity-40"></div>
              <div className="w-full h-full rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative">
                <img
                  src="/Images/image.png"
                  alt="Wellness Meditation"
                  className="w-full h-full object-cover"
                />

                {/* Glass Badge - Top Right */}
                <div className="absolute top-8 right-8 glass-card px-5 py-4 rounded-[1.5rem] flex flex-col shadow-xl">
                  <span className="text-[11px] font-bold text-[#8E7F84] uppercase tracking-tighter mb-1">Healing Streak</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#2D1520]">21 Days</span>
                    <span className="text-2xl">🔥</span>
                  </div>
                </div>

                {/* Glass Badge - Bottom Left */}
                <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:w-[300px] glass-card p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#A98DA4]/20 flex items-center justify-center">
                    <Heart size={20} className="text-[#A98DA4]" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#A98DA4] uppercase tracking-widest mb-1">AI Sakhi says</p>
                    <p className="text-base font-semibold text-[#2D1520] tracking-tight">You are doing amazing! ❤️</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#B197B0]/10 rounded-full blur-[80px] -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#FEECEC]/50 rounded-full blur-[100px] -z-10"></div>
          </motion.div>

        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" className="py-24 scroll-mt-20 bg-white w-full">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%]">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-[#FDF0F3] rounded-full mb-6">
              <span className="text-[10px] font-black text-[#D17B88] uppercase tracking-[0.2em]">Everything You Need</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D1520] mb-6 tracking-tight">
              Features made with <span className="text-[#B197B0]">love for you</span>
            </h2>
            <p className="text-[17px] text-[#8E7F84] max-w-2xl mx-auto leading-relaxed font-medium">
              Every feature was built with one woman in mind — you. Not a software dashboard, but a warm companion for your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Women's Health Hub",
                desc: "From PCOD to hormonal balance — deep expert guidance tailored just for you.",
                img: "/Images/image1.png",
                color: "#FDF0F3",
                iconBg: "#FDF0F3",
                iconColor: "#D17B88",
                icon: HeartPulse
              },
              {
                title: "Emotional Healing",
                desc: "Guided sessions, journaling prompts, and mindfulness tools for inner peace.",
                img: "/Images/image3.png",
                color: "#F5F1FE",
                iconBg: "#F5F1FE",
                iconColor: "#9079C1",
                icon: Sparkles
              },
              {
                title: "AI Sakhi Chat",
                desc: "Your 24/7 emotional companion — understands your feelings, never judges.",
                img: "/Images/image2.png",
                color: "#FFF9EE",
                iconBg: "#FFF9EE",
                iconColor: "#CCAA3D",
                icon: MessageCircle
              },
              {
                title: "Healing Book Library",
                desc: "Curated books on PCOD, weight, hunger, heart health — read at your pace.",
                img: "/Images/image4.png",
                color: "#FDF0F3",
                iconBg: "#FDF0F3",
                iconColor: "#D17B88",
                icon: BookOpen
              },
              {
                title: "Video Healing Courses",
                desc: "Netflix-style healing programs on puberty, pregnancy, stress and more.",
                img: "/Images/image5.png",
                color: "#F5F1FE",
                iconBg: "#F5F1FE",
                iconColor: "#9079C1",
                icon: Video
              },
              {
                title: "Advisor Sessions",
                desc: "Schedule 1-on-1 consultations with certified women wellness advisors.",
                img: "/Images/image6.png",
                color: "#FFF9EE",
                iconBg: "#FFF9EE",
                iconColor: "#CCAA3D",
                icon: Users
              },
              {
                title: "Meditation Sakhi",
                desc: "Find your inner calm with guided meditation and breathing exercises.",
                img: "/Images/image1.png",
                color: "#FDF0F3",
                iconBg: "#FDF0F3",
                iconColor: "#D17B88",
                icon: Play
              },
              {
                title: "Wealth Sakhi",
                desc: "Empower your financial future with smart wealth management tools.",
                img: "/Images/image3.png",
                color: "#F5F1FE",
                iconBg: "#F5F1FE",
                iconColor: "#9079C1",
                icon: DollarSign
              },
              {
                title: "To-Do List",
                desc: "Organize your daily growth and productivity effectively.",
                img: "/Images/image2.png",
                color: "#FFF9EE",
                iconBg: "#FFF9EE",
                iconColor: "#CCAA3D",
                icon: Check
              },
              {
                title: "Home Budget Sakhi",
                desc: "Manage your household expenses and savings with ease.",
                img: "/Images/image4.png",
                color: "#FDF0F3",
                iconBg: "#FDF0F3",
                iconColor: "#D17B88",
                icon: Zap
              },
              {
                title: "Affirmations",
                desc: "Start your day with positive energy and empowering affirmations.",
                img: "/Images/image5.png",
                color: "#F5F1FE",
                iconBg: "#F5F1FE",
                iconColor: "#9079C1",
                icon: Sparkles
              },
              {
                title: "Mental Health",
                desc: "Comprehensive support for your emotional and mental well-being.",
                img: "/Images/image6.png",
                color: "#FFF9EE",
                iconBg: "#FFF9EE",
                iconColor: "#CCAA3D",
                icon: HeartPulse
              },
              {
                title: "Love Sakhi",
                desc: "Nurture your bonds and build healthy relationships.",
                img: "/Images/image1.png",
                color: "#FDF0F3",
                iconBg: "#FDF0F3",
                iconColor: "#D17B88",
                icon: Users
              },
              {
                title: "Grooming Sakhi",
                desc: "Self-care and grooming tips to boost your confidence.",
                img: "/Images/image3.png",
                color: "#F5F1FE",
                iconBg: "#F5F1FE",
                iconColor: "#9079C1",
                icon: Star
              },
              {
                title: "Spiritual Sakhi",
                desc: "Spiritual solutions based on Bhagavad Gita wisdom.",
                img: "/Images/image2.png",
                color: "#FFF9EE",
                iconBg: "#FFF9EE",
                iconColor: "#CCAA3D",
                icon: Heart
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-[2rem] overflow-hidden flex flex-col h-full bg-white shadow-sm border border-black/5 hover:shadow-lg transition-all duration-500"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1" style={{ backgroundColor: feature.color }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white shadow-sm" style={{ color: feature.iconColor }}>
                      <feature.icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-[#2D1520] tracking-tight">{feature.title}</h3>
                  </div>
                  <p className="text-[14px] text-[#6B5E63] leading-relaxed opacity-80 font-medium">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS / JOURNEY SECTION ── */}
      <section id="how-it-works" className="py-16 scroll-mt-20 bg-[#FFF7F8]/50 overflow-hidden w-full">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%]">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-[#F3EAFC] rounded-full mb-6">
              <span className="text-[10px] font-black text-[#9079C1] uppercase tracking-[0.2em]">Simple Steps</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D1520] mb-6 tracking-tight">
              Your healing journey <span className="text-[#B197B0]">starts here</span>
            </h2>
            <p className="text-[17px] text-[#8E7F84] max-w-2xl mx-auto leading-relaxed font-medium">
              Just four gentle steps to begin transforming your health and happiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                desc: "Tell us about yourself — your health goals, feelings, and what you need most. Takes just 2 minutes.",
                color: "#FDF0F3",
                icon: Heart,
                iconColor: "#D17B88"
              },
              {
                step: "02",
                title: "Explore Your Journey",
                desc: "AI Sakhi curates a personalized healing path — videos, books, and programs just for you.",
                color: "#F5F1FE",
                icon: Globe,
                iconColor: "#9079C1"
              },
              {
                step: "03",
                title: "Heal & Grow Daily",
                desc: "Track your mood, complete healing sessions, and build healthy habits — one gentle step at a time.",
                color: "#FFF9EE",
                icon: Activity,
                iconColor: "#CCAA3D"
              },
              {
                step: "04",
                title: "Celebrate Your Wins",
                desc: "Watch your wellness score grow. Share milestones. Feel proud of every step forward.",
                color: "#FDF0F3",
                icon: Sparkles,
                iconColor: "#D17B88"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 rounded-[2.5rem] flex flex-col group h-full shadow-sm hover:shadow-lg transition-all duration-500 border border-white/40"
                style={{ backgroundColor: step.color }}
              >
                <div className="absolute top-8 right-8 text-[60px] font-black text-black/5 leading-none select-none tracking-tighter">
                  {step.step}
                </div>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6" style={{ color: step.iconColor }}>
                    <step.icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D1520] mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-[13px] leading-relaxed text-[#6B5E63] font-medium opacity-80">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card py-5 px-10 rounded-[2rem] text-center shadow-lg border border-white/60"
          >
            <p className="text-[16px] md:text-[18px] text-[#6B5E63] italic font-medium">
              "Healing takes time. One small step today matters." — <span className="font-bold text-[#2D1520]">HealthSakhi</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DEMO / HOW TO USE SECTION ── */}
      <section id="demo" className="py-24 bg-white w-full scroll-mt-20">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%]">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#FDF0F3] rounded-full mb-6">
              <span className="text-[10px] font-black text-[#D17B88] uppercase tracking-[0.2em]">Live Demo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#2D1520] mb-6 tracking-tight">
              How to use <span className="text-[#ff69b4]">Health Sakhi</span>
            </h2>
            <p className="text-lg text-[#6B5E63] max-w-2xl mx-auto font-medium opacity-80">
              Take a quick tour of our platform and see how easy it is to start your wellness journey today.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-[800px] mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] group border-[10px] border-white"
          >
            <div
              className="aspect-video bg-slate-900 relative cursor-pointer"
              onClick={() => setIsPlayingDemo(!isPlayingDemo)}
            >
              {/* Actual Video */}
              <video
                src="https://ik.imagekit.io/rty16p00ub/health%20sakhi%20video.mp4"
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) isPlayingDemo ? el.play() : el.pause();
                }}
              />

              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

              {/* Play/Pause Button Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlayingDemo ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-2xl hover:scale-110 active:scale-95 transition-all">
                  {isPlayingDemo ? (
                    <Pause size={40} className="text-white" fill="currentColor" />
                  ) : (
                    <Play size={40} className="text-white ml-2" fill="currentColor" />
                  )}
                </div>
              </div>
            </div>


            {/* Soft Glow Effect */}
            <div className="absolute -inset-4 bg-health-green/10 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-[#ff69b4] mx-auto shadow-sm">
                <Play size={24} fill="currentColor" />
              </div>
              <p className="font-black text-[#2D1520] uppercase text-xs tracking-widest">Easy Onboarding</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-[#ff69b4] mx-auto shadow-sm">
                <Zap size={24} fill="currentColor" />
              </div>
              <p className="font-black text-[#2D1520] uppercase text-xs tracking-widest">Real-time Insights</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-[#ff69b4] mx-auto shadow-sm">
                <CheckCircle size={24} fill="currentColor" />
              </div>
              <p className="font-black text-[#2D1520] uppercase text-xs tracking-widest">Expert Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING SECTION ── */}
      <section id="pricing" className="py-16 bg-[#FFF7F8]/30 scroll-mt-20 w-full">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%]">
          <div className="text-center mb-10">
            {/* ... header content ... */}
            <div className="inline-block px-4 py-1.5 bg-[#F3EAFC] rounded-full mb-4">
              <span className="text-[10px] font-black text-[#9079C1] uppercase tracking-[0.2em]">Pricing Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1520] mb-4 tracking-tight">
              Invest in <span className="text-[#B197B0]">your wellness</span>
            </h2>
            <p className="text-[15px] text-[#8E7F84] mx-auto leading-relaxed font-medium">
              Choose the plan that feels right for your healing journey. No pressure, no rush.
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex justify-center items-center">
              <div className="bg-[#E9DDE4] p-1.5 rounded-full flex items-center relative cursor-pointer min-w-[280px]" onClick={() => setIsYearly(!isYearly)}>
                {/* ... toggle pill ... */}
                <div
                  className={`absolute inset-y-1.5 transition-all duration-300 shadow-sm bg-[#B197B0] rounded-full ${isYearly ? 'left-1/2 right-1.5' : 'left-1.5 right-1/2'}`}
                />
                <div className={`flex-1 text-center relative z-10 py-2 text-xs font-bold transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-[#8E7F84]'}`}>
                  Monthly
                </div>
                <div className={`flex-1 text-center relative z-10 py-2 text-xs font-bold transition-colors duration-300 ${isYearly ? 'text-white' : 'text-[#8E7F84]'}`}>
                  Yearly <span className={`text-[9px] px-2 py-0.5 rounded-full ml-1 font-black transition-colors ${isYearly ? 'bg-white/20 text-white' : 'bg-[#FDF0F3] text-[#ff69b4]'}`}>Save 35%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end w-full mb-8">
            {pricingPlans.map((plan, idx) => {
              const yearlyPrice = plan.duration === '12 Months'
                ? Math.round(Number(plan.price || 0) * 0.65)
                : Number(plan.price || 0);
              const displayPrice = Number(plan.price || 0) === 0
                ? 'Free'
                : `₹${isYearly ? yearlyPrice.toLocaleString() : Number(plan.price).toLocaleString()}`;
              const isPopular = plan.highlightTag === 'Most Popular';
              const isInactive = plan.status !== 'Active';
              const isDarkCard = idx === 1;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${isDarkCard ? 'bg-[#1A0B13] text-white shadow-2xl scale-105 border border-white/5' : 'bg-[#FDF0F3] border border-white/50'} p-8 rounded-[2rem] relative ${isInactive ? 'opacity-70' : ''}`}
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#B197B0] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {isInactive ? 'Coming Soon' : (plan.highlightTag || 'Plan')}
                  </div>

                  <h3 className={`text-lg font-black mb-1 ${isDarkCard ? 'text-white' : 'text-[#2D1520]'}`}>{plan.name}</h3>
                  <p className={`text-[10px] font-medium mb-6 ${isDarkCard ? 'text-white/50' : 'text-[#8E7F84]'}`}>
                    {plan.shortDescription || `Built for ${plan.name} members.`}
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${isDarkCard ? 'text-white' : 'text-[#D17B88]'}`}>{displayPrice}</span>
                    {displayPrice !== 'Free' && (
                      <span className={`text-xs font-bold ${isDarkCard ? 'text-white/40' : 'text-[#8E7F84]/60'}`}>/{isYearly ? 'yr' : 'plan'}</span>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {(plan.features || [
                      `${plan.videos || 'Limited'} videos access`,
                      `${plan.books || 'Limited'} books / library`,
                      `${plan.advisorSessions || '0/month'} advisor sessions`,
                      plan.aiSakhiChat ? 'AI Sakhi chat enabled' : 'AI Sakhi chat disabled'
                    ]).map((feat, i) => (
                      <div key={i} className={`flex items-center gap-2.5 text-xs font-medium ${isDarkCard ? 'text-white/80' : 'text-[#6B5E63]'}`}>
                        <Check size={12} className={isDarkCard ? 'text-[#B197B0]' : 'text-[#D17B88]'} />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={isInactive}
                    onClick={() => {
                      localStorage.setItem(MEMBER_PLAN_KEY, plan.id);
                      navigate('/login');
                    }}
                    className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isDarkCard ? 'bg-gradient-to-r from-[#B197B0] to-[#9079C1] text-white shadow-lg hover:scale-105' : 'border-2 border-[#D17B88]/20 text-[#D17B88] hover:bg-[#D17B88] hover:text-white'} ${isInactive ? 'cursor-not-allowed opacity-70 hover:scale-100' : ''}`}
                  >
                    {isInactive ? 'Not Available Yet' : (isPopular ? 'Start Premium Journey' : 'Choose Plan')}
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            {/* <p className="text-[10px] font-medium text-[#8E7F84] opacity-50 italic">No credit card required for Free plan. Cancel anytime. 100% safe.</p> */}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION (RESPONSIVE) ── */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden scroll-mt-20 w-full">
        <div className="w-full px-4 sm:px-[6%] lg:px-[10%]">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#FDF0F3] rounded-full mb-4 sm:mb-6">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black text-[#D17B88] uppercase tracking-[0.15em] sm:tracking-[0.2em]">Real Stories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D1520] mb-4 sm:mb-6 tracking-tight">
              Women who <span className="text-[#B197B0]">transformed</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#8E7F84] max-w-2xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
              Real stories from real women. Their healing journey became their superpower.
            </p>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-4xl mx-auto px-2 sm:px-0">
            <div className="relative h-[280px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-lg md:shadow-xl bg-[#1A0B13] h-full"
                >
                  {/* Image Container */}
                  <div className="h-[140px] sm:h-[160px] md:h-auto overflow-hidden">
                    <img
                      src={testimonials[activeTestimonial].img}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center text-white relative">
                    <div className="text-2xl sm:text-3xl md:text-4xl text-white/20 font-serif mb-3 sm:mb-4">"</div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-relaxed sm:leading-relaxed md:leading-relaxed mb-4 sm:mb-6 opacity-95 tracking-tight line-clamp-3">
                      {testimonials[activeTestimonial].quote}
                    </p>
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg font-black mb-0.5 sm:mb-1 md:mb-1 tracking-tight">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/40 font-black uppercase tracking-widest mb-2 sm:mb-3">{testimonials[activeTestimonial].role}</p>
                      <div className="flex gap-0.5 sm:gap-1 text-[#D17B88]">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Avatar Navigation */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-10 pb-4 sm:pb-5 flex-wrap">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`rounded-full border-[2px] sm:border-[3px] overflow-hidden transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${activeTestimonial === i
                    ? 'border-[#B197B0] scale-110 shadow-lg'
                    : 'border-transparent opacity-40 hover:opacity-60'
                    }`}
                  aria-label={`View testimonial from ${t.name}`}
                >
                  <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 px-6 overflow-hidden mt-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/image12.png"
            className="w-full h-full object-cover"
            alt="Healing Atmosphere"
          />
          <div className="absolute inset-0 bg-[#2D1520]/60 mix-blend-multiply"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Begin Today</span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              YOU DESERVE <br />
              <span className="opacity-90">TO HEAL</span>
            </h2>

            <p className="text-base md:text-lg text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Join 50,000+ women who chose themselves. Your healing journey begins with one small step — and we'll walk every step with you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/login" className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-[#B197B0] to-[#9079C1] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all">
                <Heart size={16} fill="currentColor" />
                Start My Free Journey
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Learn More
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-[#ff69b4]" />
                100% Safe & Private
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                <Users size={16} className="text-[#ff69b4]" />
                Certified Advisors
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                <Activity size={16} className="text-[#ff69b4]" />
                Mobile Friendly
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

