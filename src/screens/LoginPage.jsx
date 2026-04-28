import React, { useState } from 'react';
import { Heart, ArrowRight, User, ShieldCheck, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // 'user', 'admin', 'affiliate'
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (email.includes('@') && email.includes('.')) {
      sessionStorage.setItem('temp_role', role);
      navigate('/otp');
    }
  };

  const roles = [
    { id: 'user', name: 'Member', icon: User, color: '#ff69b4' },
    { id: 'advisor', name: 'Advisor', icon: Heart, color: '#ff69b4' },
    { id: 'admin', name: 'Admin', icon: ShieldCheck, color: '#2D1520' },
    { id: 'affiliate', name: 'Partner', icon: Share2, color: '#2D1520' },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans" style={{ background: '#FFF7F8' }}>
      {/* Background Gradients */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] blur-[140px] rounded-full opacity-20" 
        style={{ background: '#ff69b4' }}
      ></motion.div>
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] blur-[120px] rounded-full opacity-30" 
        style={{ background: '#F5B4BC' }}
      ></motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-sm w-full mx-4 relative z-10"
      >
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-[#ff69b4]/5 border" style={{ borderColor: '#F5E6EA' }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-[#ff69b4]/20 transition-all" 
              style={{ background: '#ff69b4' }}
            >
              <Heart size={28} fill="currentColor" />
            </motion.div>
            <h1 className="text-2xl font-black tracking-tight" style={{ color: '#2D1520' }}>HealthSakhi</h1>
            <p className="font-bold text-[10px] mt-1 uppercase tracking-widest" style={{ color: '#C4A0AC' }}>Trusted Wellness Companion</p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-rose-50/50 p-1 rounded-2xl mb-8 border" style={{ borderColor: '#F5E6EA' }}>
            {roles.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all relative ${
                    isActive ? 'text-[#2D1520]' : 'text-[#C4A0AC]'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeRole"
                      className="absolute inset-0 bg-white rounded-xl shadow-md border"
                      style={{ borderColor: '#F5E6EA' }}
                    />
                  )}
                  <span className="relative z-10"><r.icon size={16} style={{ color: isActive ? r.color : undefined }} /></span>
                  <span className="relative z-10 text-[8px] font-black uppercase tracking-widest">{r.name}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] ml-2" style={{ color: '#C4A0AC' }}>
                Secure Login
              </label>
              <input 
                type="email" 
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                className="w-full h-14 px-5 rounded-2xl border bg-rose-50/20 focus:bg-white focus:shadow-xl outline-none transition-all text-xs font-bold shadow-inner"
                style={{ borderColor: '#F5E6EA' }}
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!email.includes('@') || !email.includes('.')}
              className="w-full py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white rounded-[2rem] shadow-2xl transition-all disabled:grayscale disabled:opacity-30 disabled:shadow-none flex items-center justify-center gap-3"
              style={{ background: '#ff69b4' }}
            >
              Access Portal
              <ArrowRight size={18} />
            </motion.button>

            <div className="text-center pt-2">
              <p className="text-[9px] leading-relaxed font-bold uppercase tracking-[0.2em]" style={{ color: '#C4A0AC' }}>
                Encrypted Connection <br /> 
                <span className="underline underline-offset-4 cursor-pointer hover:text-[#ff69b4]" style={{ color: '#2D1520' }}>Security Protocol</span>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
      
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.6em] z-10 text-center w-full opacity-40" style={{ color: '#C4A0AC' }}>
        HEALTHSAKHI GLOBAL NODES
      </p>
    </div>
  );
};

export default LoginPage;

