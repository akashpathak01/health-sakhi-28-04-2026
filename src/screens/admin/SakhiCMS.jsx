import React, { useState } from 'react';
import {
  Play, Sparkles, User, Zap, Plus, Search,
  Filter, MoreVertical, Edit, Trash2, CheckCircle, X, UploadCloud, Video, BookOpen, Clock, Tag, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SakhiCMS = () => {
  const [activeTab, setActiveTab] = useState('meditation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
    author: 'Admin'
  });

  const tabs = [
    { id: 'meditation', name: 'Meditation', icon: Play, count: 24 },
    { id: 'affirmations', name: 'Affirmations', icon: Sparkles, count: 156 },
    { id: 'grooming', name: 'Grooming', icon: User, count: 18 },
    { id: 'spiritual', name: 'Gita Wisdom', icon: Zap, count: 42 },
  ];

  const contentLists = {
    meditation: [
      { id: 1, title: 'Inner Peace Journey', author: 'Dr. Sakshi', duration: '15:00', status: 'Published' },
      { id: 2, title: 'Anxiety Relief', author: 'Self Care', duration: '10:00', status: 'Draft' },
    ],
    affirmations: [
      { id: 1, text: 'I am worthy of all the love and happiness in the world.', category: 'Self Love', status: 'Published' },
      { id: 2, text: 'I radiate abundance and success wherever I go.', category: 'Success', status: 'Published' },
    ]
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    // Logic to add content would go here
    setIsModalOpen(false);
    setFormData({ title: '', description: '', duration: '', category: '', author: 'Admin' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#2D1520]">Sakhi Content Hub</h1>
          <p className="text-[#C4A0AC] font-bold">Manage and publish wellness module content</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#ff69b4] text-white rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all"
        >
          <Plus size={18} /> Add New Content
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-rose-100 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 flex items-center gap-3 font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                ? 'border-[#ff69b4] text-[#ff69b4]'
                : 'border-transparent text-[#9A8A8E] hover:text-[#2D1520]'
              }`}
          >
            <tab.icon size={18} />
            {tab.name}
            <span className="text-[10px] bg-rose-50 px-2 py-0.5 rounded-full text-[#ff69b4]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4A0AC]" size={18} />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520]"
          />
        </div>
        <button className="px-6 py-3 bg-white border border-rose-100 rounded-2xl font-bold text-[#2D1520] flex items-center gap-2 hover:bg-rose-50 transition-all">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-[2rem] border border-rose-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-rose-50/50 border-b border-rose-100">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Title / Content</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Category</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-50">
            {(contentLists[activeTab] || contentLists.meditation).map((item) => (
              <tr key={item.id} className="hover:bg-rose-50/30 transition-all group">
                <td className="px-6 py-5">
                  <p className="font-bold text-[#2D1520]">{item.title || item.text.substring(0, 40) + '...'}</p>
                  <span className="text-[10px] font-bold text-[#C4A0AC]">{item.author || item.category}</span>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 bg-white border border-rose-100 rounded-lg text-[10px] font-black text-[#2D1520]">{item.duration || item.category || 'Standard'}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className={item.status === 'Published' ? 'text-green-500' : 'text-[#C4A0AC]'} />
                    <span className={`text-[11px] font-black uppercase tracking-widest ${item.status === 'Published' ? 'text-green-600' : 'text-[#C4A0AC]'}`}>{item.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-[#ff69b4] hover:text-white rounded-lg transition-all text-[#C4A0AC]"><Edit size={16} /></button>
                    <button className="p-2 hover:bg-rose-100 rounded-lg transition-all text-red-500"><Trash2 size={16} /></button>
                    <button className="p-2 text-[#C4A0AC]"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Content Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D1520]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-rose-50 flex items-center justify-between bg-rose-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff69b4] flex items-center justify-center text-white shadow-lg">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#2D1520] tracking-tight">Add New Sakhi Content</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Active Tab: {activeTab}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#C4A0AC] hover:bg-rose-100 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto no-scrollbar">
                <form onSubmit={handleAddContent} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Common Header Field based on Tab */}
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">
                        {activeTab === 'affirmations' ? 'Affirmation Text' : 'Content Title'}
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder={activeTab === 'affirmations' ? 'I am powerful...' : 'e.g. Deep Breathing 101'}
                        className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520]"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    {/* Meditation Specific Fields */}
                    {activeTab === 'meditation' && (
                      <>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Duration (Mins)</label>
                          <input 
                            type="text" placeholder="e.g. 15:00"
                            className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520]"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Lead Advisor</label>
                          <input 
                            type="text" placeholder="Dr. Sakshi"
                            className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520]"
                            value={formData.author}
                            onChange={(e) => setFormData({...formData, author: e.target.value})}
                          />
                        </div>
                      </>
                    )}

                    {/* Affirmation Specific Fields */}
                    {activeTab === 'affirmations' && (
                      <>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Category</label>
                            <select className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl font-bold text-[#2D1520]">
                                <option>Self Love</option>
                                <option>Success</option>
                                <option>Healing</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Text Color Preference</label>
                          <input type="color" className="w-full h-[58px] bg-rose-50/30 border border-rose-100 rounded-2xl p-1" />
                        </div>
                      </>
                    )}

                    {/* Grooming / Spiritual Fields */}
                    {(activeTab === 'grooming' || activeTab === 'spiritual') && (
                      <>
                         <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Focus Area</label>
                          <input 
                            type="text" placeholder={activeTab === 'grooming' ? 'Skincare' : 'Verse 2.12'}
                            className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Session Type</label>
                          <select className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl font-bold text-[#2D1520]">
                                <option>Video Module</option>
                                <option>Text Lesson</option>
                                <option>Audio Commentary</option>
                            </select>
                        </div>
                      </>
                    )}

                    <div className="col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC] block mb-3">
                        {activeTab === 'meditation' ? 'Audio Stream (MP3)' : activeTab === 'grooming' ? 'Video Asset (MP4)' : 'Visual Asset'}
                      </label>
                      <div className="w-full border-2 border-dashed border-rose-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:bg-rose-50 transition-all cursor-pointer group">
                        <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center text-[#ff69b4] group-hover:scale-110 transition-transform">
                          <UploadCloud size={32} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-[#2D1520]">Click to upload {activeTab} asset</p>
                          <p className="text-[10px] font-bold text-[#C4A0AC] mt-1">Recommended size under 50MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#C4A0AC]">Full Description</label>
                      <textarea 
                        rows="4"
                        placeholder="Provide detailed context for the sisters..."
                        className="w-full px-5 py-4 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff69b4]/20 transition-all font-bold text-[#2D1520] resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-rose-50">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-4 text-[#C4A0AC] font-black text-[12px] uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-4 bg-[#ff69b4] text-white font-black text-[12px] uppercase tracking-widest rounded-2xl shadow-xl shadow-rose-200 hover:scale-105 active:scale-95 transition-all"
                    >
                      Publish {activeTab}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SakhiCMS;
