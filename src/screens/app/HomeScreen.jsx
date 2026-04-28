import React, { useState } from 'react';
import { 
  Sparkles, Play, BookOpen, Clock, ChevronRight, Heart, 
  Calendar, Star, ArrowRight, Activity, Smile, Frown, 
  Moon, Zap, Battery, Home, User, PlusCircle, MessageCircle,
  Apple, Droplets, Wind, ChevronLeft, CheckCircle2 as CheckIcon,
  Users, Trophy, X, Send
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [moodNotes, setMoodNotes] = useState('');
  const [isSubmittingMood, setIsSubmittingMood] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [catStartIndex, setCatStartIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const moods = [
    { icon: Smile, label: 'Happy',      color: '#CCAA3D', bg: '#FFF9EE', question: "What made you smile today, Meri Sakhi? ✨", suggestions: ['Achievement', 'Good Food', 'Nature', 'Friends'] },
    { icon: Frown, label: 'Sad',        color: '#9079C1', bg: '#F5F1FE', question: "I'm here for you. Want to talk about what's bothering you? 🌸", suggestions: ['Loneliness', 'Conflict', 'Unknown', 'Health'] },
    { icon: Moon,  label: 'Tired',      color: '#64748B', bg: '#F1F5F9', question: "You've worked hard. What drained your energy today? 🌙", suggestions: ['Work', 'Lack of Sleep', 'Socializing', 'Physical'] },
    { icon: Zap,   label: 'Stressed',   color: '#D17B88', bg: '#FDEEF1', question: "Let's breathe together. What's weighing on your mind? 🌿", suggestions: ['Deadlines', 'Family', 'Finance', 'Overthinking'] },
    { icon: Heart, label: 'Grateful',   color: '#059669', bg: '#ECFDF5', question: "The universe is kind. What are you thankful for? 🙏", suggestions: ['Support', 'Small Wins', 'Self Love', 'Life'] },
    { icon: Battery, label: 'Low Energy', color: '#D97706', bg: '#FFF7ED', question: "Your light is just dim, not gone. How are you feeling? 🔋", suggestions: ['Body Pain', 'Emotional', 'Recovery', 'Hunger'] },
  ];

  const categories = [
    { name: 'Women Health', icon: User, color: '#ff69b4', bg: '#FFF1F2' },
    { name: 'Heart Care', icon: Heart, color: '#ef4444', bg: '#FEF2F2' },
    { name: 'Mental Healing', icon: Sparkles, color: '#8b5cf6', bg: '#F5F3FF' },
    { name: 'Relationships', icon: MessageCircle, color: '#ec4899', bg: '#FDF2F8' },
    { name: 'Cravings', icon: Apple, color: '#10b981', bg: '#ECFDF5' },
  ];

  const [continueItems, setContinueItems] = useState([
    { title: 'The Mystery of Hunger', type: 'Video', progress: 65, duration: '15 min' },
    { title: 'Inner Healing Guide',   type: 'Book',  progress: 30, duration: '45 pgs' },
  ]);

  React.useEffect(() => {
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    const completedBooks = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    
    // Book titles mapping
    const bookTitles = {
      1: 'Hunger Mystery: Inner Healing',
      2: 'The Hormonal Roadmap',
      3: 'Mindful Sakhi: Peace Within',
      4: 'Heart-to-Heart Bonds',
      5: 'Digital Detox Guide'
    };

    const dynamicItems = [];
    
    // Add real book progress
    Object.entries(userProgress).forEach(([id, data]) => {
      if (bookTitles[id]) {
        const progress = parseInt(data.percent);
        dynamicItems.push({
          title: bookTitles[id],
          type: 'Book',
          progress: isNaN(progress) ? 0 : progress,
          duration: 'Interactive'
        });
      }
    });

    // If no progress found, keep some defaults but marked appropriately
    if (dynamicItems.length > 0) {
      // Add a default video if no real video progress tracking yet
      dynamicItems.push({ title: 'The Mystery of Hunger', type: 'Video', progress: 65, duration: '15 min' });
      setContinueItems(dynamicItems.slice(0, 3)); // Show top 3
    }
  }, []);

  const [mySessions, setMySessions] = useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('hs_booked_sessions') || '[]');
    setMySessions(saved);
  }, []);

  React.useEffect(() => {
    const pendingMood = localStorage.getItem('pendingMood');
    if (pendingMood) {
      // Need to find the mood object from the moods array defined below
      // But moods is defined inside the component, so we can access it here.
      const moodObj = moods.find(m => m.label.toLowerCase() === pendingMood.toLowerCase());
      if (moodObj) {
        setSelectedMood(moodObj);
        setShowMoodModal(true);
      }
      localStorage.removeItem('pendingMood');
    }
  }, []);

  const allVideos = [
    { title: 'PCOD & Hormones: Understanding Your Cycle', duration: '18 min', tag: 'Women Health', views: '12.4k' },
    { title: 'Heart Health: Daily Habits for a Stronger You', duration: '25 min', tag: 'Heart Care', views: '5.1k' },
    { title: 'Anxiety Relief: 10 Min Meditation', duration: '10 min', tag: 'Mental Healing', views: '20.2k' },
    { title: 'Building Healthy Boundaries in Love', duration: '15 min', tag: 'Relationships', views: '9.3k' },
    { title: 'Emotional Eating — Heal From Within', duration: '22 min', tag: 'Cravings', views: '8.2k' },
    { title: 'Pregnancy Care: First Trimester Guide', duration: '30 min', tag: 'Women Health', views: '14.8k' },
    { title: 'Stress Management: The Breathing Technique', duration: '12 min', tag: 'Mental Healing', views: '15.1k' },
  ];

  const featuredVideos = selectedCategory 
    ? allVideos.filter(v => v.tag === selectedCategory)
    : allVideos;

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setShowMoodModal(true);
  };

  const submitMoodPulse = () => {
    setIsSubmittingMood(true);
    setTimeout(() => {
      setIsSubmittingMood(false);
      setShowMoodModal(false);
      setMoodNotes('');
      if (selectedMood) {
        navigate(`/app/mood/${selectedMood.label.toLowerCase()}`);
      }
    }, 1500);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
    
    // Sync with Deep Processing (Continue Journey)
    const newItem = { 
      title: video.title, 
      type: 'Video', 
      progress: 5, // Start with 5%
      duration: video.duration 
    };

    setContinueItems(prev => {
      const exists = prev.find(p => p.title === video.title);
      if (exists) return prev;
      return [newItem, ...prev].slice(0, 3);
    });

    // Save to localStorage
    const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    userProgress[video.title] = { percent: 5, type: 'Video' };
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full pb-20"
    >
      <div className="space-y-12 pt-8">
        
        {/* Greeting Section */}
        <motion.section variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: '#2D1520' }}>Namaste, Sakhi 🌸</h2>
             <div className="flex flex-col gap-1">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: '#C4A0AC' }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                <motion.p 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="text-[9px] md:text-[10px] font-bold text-[#ff69b4] italic"
                >
                   "Day 14 of your cycle. Your energy is peaking beautifully! ✨"
                </motion.p>
             </div>
          </div>
          <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               onClick={() => navigate('/app/rewards')}
               className="px-4 md:px-6 py-3 md:py-4 bg-white border border-[#F5E6EA] rounded-2xl md:rounded-3xl shadow-sm text-center cursor-pointer shrink-0"
             >
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#C4A0AC] mb-1">Streak</p>
                <p className="text-lg md:text-xl font-black text-[#ff69b4]">12 Days 🔥</p>
             </motion.div>
             <motion.div 
               whileHover={{ scale: 1.05 }}
               onClick={() => navigate('/app/rewards')}
               className="px-4 md:px-6 py-3 md:py-4 bg-white border border-[#F5E6EA] rounded-2xl md:rounded-3xl shadow-sm text-center cursor-pointer shrink-0"
             >
                <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-[#C4A0AC] mb-1">Vitality</p>
                <p className="text-lg md:text-xl font-black text-[#ff69b4]">85% 💚</p>
             </motion.div>
          </div>
        </motion.section>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Upcoming Session Reminder */}
            <AnimatePresence>
              {mySessions.length > 0 && (
                <motion.section initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative">
                   <div className="bg-gradient-to-br from-[#2D1520] to-[#1a0c13] rounded-[3rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff69b4]/10 rounded-full blur-[60px] -mr-24 -mt-24" />
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                         <div className="flex items-center gap-6">
                            <div className="relative">
                               <img src={mySessions[0].advisorImg} className="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-white/20" alt="" />
                               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#2D1520] rounded-full" />
                            </div>
                            <div>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-[#ff69b4] bg-[#ff69b4]/10 px-2 py-0.5 rounded-full">Next Appointment</span>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">ID: {mySessions[0].id}</span>
                               </div>
                               <h3 className="text-xl font-black mb-1">Session with {mySessions[0].advisor}</h3>
                               <div className="flex items-center gap-4 text-xs font-bold text-white/60">
                                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-[#ff69b4]" /> {mySessions[0].date}</div>
                                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-[#ff69b4]" /> {mySessions[0].slot}</div>
                               </div>
                            </div>
                         </div>
                         <button onClick={() => navigate('/app/sessions')}
                           className="w-full md:w-auto px-10 py-4 bg-[#ff69b4] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-rose-900/40">
                            Join Room ⚡
                         </button>
                      </div>
                   </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Mood Selector */}
            <motion.section variants={item}>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: '#C4A0AC' }}>Internal Resonance</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {moods.map((mood) => {
                  const isSelected = selectedMood?.label === mood.label;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      key={mood.label}
                      onClick={() => handleMoodClick(mood)}
                      className="flex flex-col items-center gap-3 md:gap-4 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border transition-all shadow-sm group bg-white"
                      style={{
                        borderColor: isSelected ? '#ff69b4' : '#F5E6EA',
                      }}
                    >
                      <div 
                        className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 shadow-inner group-hover:scale-110"
                        style={{ background: mood.bg }}
                      >
                        <mood.icon size={28} style={{ color: mood.color }} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1520]">{mood.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            {/* Quick Access Bar */}
            <motion.section variants={item}>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: '#C4A0AC' }}>Quick Access</h3>
               <div className="flex flex-wrap gap-4">
                  {[
                    { label: 'Period Tracker', path: '/app/period', icon: Droplets, color: '#ff69b4' },
                    { label: 'Community', path: '/app/community', icon: Users, color: '#8b5cf6' },
                    { label: 'Rewards', path: '/app/rewards', icon: Trophy, color: '#f59e0b' },
                    { label: 'AI Sakhi', path: '/app/ai-sakhi', icon: Sparkles, color: '#0ea5e9' },
                  ].map((btn) => (
                    <button 
                      key={btn.label}
                      onClick={() => navigate(btn.path)}
                      className="flex-1 min-w-[140px] md:min-w-0 flex flex-col items-start gap-1 px-4 md:px-6 py-4 md:py-5 bg-white border border-[#F5E6EA] rounded-2xl hover:border-[#ff69b4] hover:bg-rose-50 transition-all shadow-sm group"
                    >
                       <div className="flex items-center gap-3">
                          <btn.icon size={18} style={{ color: btn.color }} />
                          <span className="text-[11px] font-black uppercase tracking-widest text-[#2D1520]">{btn.label}</span>
                       </div>
                       {btn.label === 'Period Tracker' && (
                         <span className="text-[9px] font-bold text-[#ff69b4] ml-7">Day 14 - High Fertility</span>
                       )}
                    </button>
                  ))}
               </div>
            </motion.section>


            {/* Journey Categories */}
            <motion.section variants={item} className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#C4A0AC' }}>Neural Pathways</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCatStartIndex(prev => Math.max(0, prev - 1))}
                    disabled={catStartIndex === 0}
                    className="w-10 h-10 rounded-full bg-white border border-[#F5E6EA] flex items-center justify-center text-[#C4A0AC] hover:bg-[#ff69b4] hover:text-white transition-all shadow-sm disabled:opacity-20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={() => setCatStartIndex(prev => Math.min(categories.length - 3, prev + 1))}
                    disabled={catStartIndex >= categories.length - 3}
                    className="w-10 h-10 rounded-full bg-white border border-[#F5E6EA] flex items-center justify-center text-[#C4A0AC] hover:bg-[#ff69b4] hover:text-white transition-all shadow-sm disabled:opacity-20"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden py-4 -my-4">
                <motion.div 
                  className="flex gap-4"
                  animate={{ x: `-${catStartIndex * (100 / 3)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {categories.map((cat, i) => {
                    const isActive = selectedCategory === cat.name;
                    return (
                      <motion.button 
                        whileHover={{ y: -5 }}
                        key={i} 
                        onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                        className="flex-shrink-0 flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-[1.5rem] border transition-all shadow-sm w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] bg-white"
                        style={{
                          borderColor: isActive ? '#ff69b4' : '#F5E6EA',
                          background: isActive ? '#FFF1F2' : 'white'
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cat.bg }}>
                          <cat.icon size={18} style={{ color: cat.color }} />
                        </div>
                        <span className={`text-[11px] md:text-[12px] font-black uppercase tracking-widest truncate ${isActive ? 'text-[#ff69b4]' : 'text-[#2D1520]'}`}>{cat.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.section>


            <motion.section 
              variants={item} 
              className="bg-white rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-14 border shadow-sm group hover:shadow-2xl hover:shadow-[#ff69b4]/5 transition-all duration-700 cursor-pointer" 
              style={{ borderColor: '#F5E6EA' }}
              onClick={() => navigate('/app/explore', { state: { category: selectedCategory } })}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-[#ff69b4]"><Sparkles size={24} /></div>
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: '#2D1520' }}>
                     {selectedCategory ? `${selectedCategory}` : 'Curated for you'}
                  </h3>
                </div>
                <ArrowRight size={20} className="text-[#C4A0AC] group-hover:translate-x-2 transition-transform" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {featuredVideos.map((video, i) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={video.title} 
                      onClick={(e) => { e.stopPropagation(); handleVideoClick(video); }}
                      className="group/card cursor-pointer"
                    >
                      <div className="h-44 rounded-[2.5rem] overflow-hidden relative mb-4 bg-rose-50 border border-[#F5E6EA]">
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all bg-[#2D1520]/10 backdrop-blur-[2px]">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-2xl scale-75 group-hover/card:scale-100 transition-all duration-500">
                               <Play size={20} fill="#ff69b4" style={{ color: '#ff69b4' }} className="ml-1" />
                            </div>
                         </div>
                         <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm" style={{ color: '#ff69b4' }}>
                            {video.tag}
                         </div>
                      </div>
                      <h4 className="font-black text-sm leading-tight transition-colors mb-1" style={{ color: '#2D1520' }}>{video.title}</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-none">{video.duration} • {video.views} views</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Upcoming Tasks Card */}
            <motion.section variants={item} className="bg-[#2D1520] rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl group cursor-pointer" onClick={() => navigate('/app/todo')}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/5 rounded-full blur-3xl -mr-16 -mt-16" />
               <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff69b4]">Upcoming Focus</h3>
                  <CheckIcon size={16} className="text-[#ff69b4]" />
               </div>
               <div className="space-y-5 relative z-10">
                  {[
                    { text: "Morning Yoga Session", time: "09:00 AM" },
                    { text: "Finance Review", time: "02:00 PM" },
                    { text: "Daily Affirmation", time: "Evening" }
                  ].map((todo, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                       <div className="w-5 h-5 rounded-lg border-2 border-white/20 flex items-center justify-center group-hover/item:border-[#ff69b4] transition-colors">
                          <div className="w-2 h-2 bg-[#ff69b4] rounded-sm opacity-0 group-hover/item:opacity-100 transition-opacity" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[11px] font-bold group-hover/item:text-[#ff69b4] transition-colors">{todo.text}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{todo.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/30 group-hover:text-white transition-colors">
                  <span>Go to My To-Do List</span>
                  <ArrowRight size={12} />
               </div>
            </motion.section>

            {/* Daily Rituals */}
            <motion.section variants={item} className="bg-white rounded-[3rem] p-8 border shadow-sm hover:shadow-xl transition-all duration-500" style={{ borderColor: '#F5E6EA' }}>
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6" style={{ color: '#C4A0AC' }}>Daily Rituals</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Morning Hydration', icon: Droplets, color: '#0ea5e9', bg: '#f0f9ff', path: '/app/todo' },
                    { label: '5-min Breathing', icon: Wind, color: '#8b5cf6', bg: '#f5f3ff', path: '/app/meditation' },
                    { label: 'Log Mood Pulse', icon: Activity, color: '#ff69b4', bg: '#fff1f2', path: '/app/mood/happy' },
                    { label: 'Sacred Reading', icon: BookOpen, color: '#f59e0b', bg: '#fffbeb', path: '/app/books' },
                    { label: 'Sleep Hygiene', icon: Moon, color: '#6366f1', bg: '#eef2ff', path: '/app/todo' }
                  ].map((task, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 5 }}
                      onClick={() => navigate(task.path)}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-[#F5E6EA] hover:bg-rose-50/50 cursor-pointer transition-all group"
                    >
                       <div className="w-10 h-10 rounded-xl bg-white border flex items-center justify-center shadow-sm transition-all group-hover:scale-110" style={{ borderColor: '#F5E6EA', background: task.bg }}>
                          <task.icon size={18} style={{ color: task.color }} />
                       </div>
                       <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#2D1520' }}>{task.label}</span>
                       <div className="ml-auto w-5 h-5 rounded-full border-2 border-[#F5E6EA] group-hover:border-[#ff69b4]" />
                    </motion.div>
                  ))}
               </div>
            </motion.section>

            {/* Continue Journey */}
            <motion.section variants={item} className="bg-white rounded-[3rem] p-8 border shadow-sm" style={{ borderColor: '#F5E6EA' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#C4A0AC' }}>Deep Processing</h3>
                <Activity size={16} className="text-[#C4A0AC]" />
              </div>
              <div className="space-y-8">
                {continueItems.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: '#C4A0AC' }}>{item.type}</span>
                       <span className="text-[9px] font-black text-[#ff69b4]">{item.progress}% Synchronized</span>
                    </div>
                    <h4 className="text-[13px] font-black mb-3 text-[#2D1520] group-hover:text-[#ff69b4] transition-colors">{item.title}</h4>
                    <div className="h-1.5 w-full bg-rose-50 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full" 
                          style={{ background: '#ff69b4' }} 
                        />
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* AI Sakhi Quick Link */}
            <motion.section 
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="rounded-[3rem] p-10 flex flex-col items-center text-center group cursor-pointer border shadow-2xl shadow-[#ff69b4]/10 transition-all relative overflow-hidden" 
              style={{ background: '#2D1520' }}
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="w-16 h-16 rounded-[2rem] flex items-center justify-center mb-6 bg-white/10 text-white backdrop-blur shadow-xl border border-white/10 group-hover:scale-110 transition-transform">
                  <Sparkles size={28} />
               </div>
               <h3 className="font-black text-2xl mb-3 text-white tracking-tight">Need to talk?</h3>
               <p className="text-xs font-bold text-white/50 mb-8 max-w-[200px] leading-relaxed italic">
                  "Your AI Sakhi is active and observing your wellness nodes."
               </p>
               <Link to="/app/ai-sakhi" className="w-full">
                  <div className="py-4 bg-[#ff69b4] rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    Open AI Bridge <ArrowRight size={14} />
                  </div>
               </Link>
            </motion.section>
          </div>
        </main>
      </div>

      {/* ── Mood Interaction Modal ── */}
      <AnimatePresence>
        {showMoodModal && selectedMood && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMoodModal(false)} className="absolute inset-0 bg-[#2D1520]/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="w-full max-w-lg bg-white rounded-[3rem] p-10 relative z-10 shadow-2xl overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16" />
              
              <button onClick={() => setShowMoodModal(false)} className="absolute top-8 right-8 text-[#C4A0AC] hover:text-[#2D1520] transition-colors"><X size={20} /></button>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-inner"
                    style={{ background: selectedMood.bg }}
                  >
                    <selectedMood.icon size={40} style={{ color: selectedMood.color }} />
                  </div>
                  <h3 className="text-2xl font-black text-[#2D1520] tracking-tight">{selectedMood.question}</h3>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {selectedMood.suggestions.map(s => (
                    <button 
                      key={s} 
                      onClick={() => setMoodNotes(prev => prev ? prev + ', ' + s : s)}
                      className="px-6 py-3 bg-rose-50/50 border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#2D1520] hover:bg-[#ff69b4] hover:text-white transition-all shadow-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <textarea 
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                    placeholder="Tell Sakhi more..." 
                    className="w-full h-32 p-6 bg-rose-50/30 border border-rose-100 rounded-3xl text-sm font-medium outline-none focus:border-[#ff69b4] transition-all resize-none"
                  />
                </div>

                <button 
                  onClick={submitMoodPulse}
                  disabled={isSubmittingMood}
                  className="w-full py-5 bg-[#ff69b4] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-100/50 flex items-center justify-center gap-2"
                >
                  {isSubmittingMood ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Log Mood Pulse <Send size={14} /></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* ── Video Player Modal ── */}
      <AnimatePresence>
        {showVideoModal && selectedVideo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowVideoModal(false)} className="absolute inset-0 bg-[#2D1520]/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden relative z-10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
              
              {/* Video Player Area */}
              <div className="flex-[1.5] bg-black relative group min-h-[300px] md:min-h-0">
                <video 
                  key={selectedVideo.title}
                  className="w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  controls
                >
                  <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Visual Backdrop for Video Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 text-white z-10">
                   <span className="px-3 py-1 bg-[#ff69b4] rounded-lg text-[9px] font-black uppercase tracking-widest mb-2 inline-block shadow-lg">{selectedVideo.tag}</span>
                   <h3 className="text-xl md:text-2xl font-black drop-shadow-md">{selectedVideo.title}</h3>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-96 bg-white p-6 md:p-10 flex flex-col justify-between border-l border-rose-50 overflow-y-auto custom-scrollbar">
                 <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Content Detail</h4>
                       <button onClick={() => setShowVideoModal(false)} className="text-[#C4A0AC] hover:text-[#2D1520] transition-colors"><X size={20} /></button>
                    </div>
                    
                    <div className="space-y-4">
                       <p className="text-xs font-bold text-[#2D1520] leading-relaxed italic">"Sakhi, this session is designed to help you align with your body's natural rhythm."</p>
                       <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 text-[#C4A0AC]">
                             <Clock size={14} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">{selectedVideo.duration} Session</span>
                          </div>
                          <div className="flex items-center gap-3 text-[#ff69b4]">
                             <Sparkles size={14} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">+50 Potential Coins</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                       <p className="text-[10px] font-bold text-[#2D1520] mb-2 uppercase tracking-widest">Key Takeaways</p>
                       <ul className="space-y-2">
                          {['Mindful Breathing', 'Hormonal Balance', 'Self-Awareness'].map(t => (
                            <li key={t} className="flex items-center gap-2 text-[9px] font-bold text-[#9A8A8E]">
                               <div className="w-1 h-1 rounded-full bg-[#ff69b4]" /> {t}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>

                 <button 
                   onClick={() => setShowVideoModal(false)}
                   className="w-full py-4 bg-[#2D1520] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ff69b4] transition-all shadow-xl mt-8"
                 >
                    Mark as Completed
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeScreen;
