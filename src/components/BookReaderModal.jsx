import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Headphones, Pause, Play, Square } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const BookReaderModal = ({ selectedBook, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.speechSynthesis.cancel();
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
    setDirection(0);
  }

  const turnNext = () => {
    if (pageNumber + 1 >= numPages) return;
    setDirection(1);
    setPageNumber(p => Math.min(numPages || p, p + 2));
  };

  const turnPrev = () => {
    if (pageNumber <= 1) return;
    setDirection(-1);
    setPageNumber(p => Math.max(1, p - 2));
  };

  const handleListen = (e) => {
    if (e) e.stopPropagation();
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      // Start speaking
      const textToSpeak = selectedBook.desc || "Welcome to HealthSakhi Library. This is a sample audio reading. Let's begin the journey of wellness.";
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.9;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const stopAudio = (e) => {
    if (e) e.stopPropagation();
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    window.speechSynthesis.cancel();
    onClose();
  };

  if (!selectedBook) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      {/* Dynamic Glassmorphism Background using the book's specific colors */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 100%)`
        }}
        onClick={handleClose}
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0, transformOrigin: 'center' }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="relative max-w-7xl w-full flex justify-center items-center h-[85vh] sm:h-[90vh] lg:h-[90vh] mt-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Audio Control Floating Button */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl z-50 transition-all duration-300">
          <button 
            onClick={handleListen}
            className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase hover:text-[#BA7517] transition-colors"
          >
            {isSpeaking && !isPaused ? <Pause size={18} /> : (isSpeaking && isPaused ? <Play size={18} /> : <Headphones size={18} />)}
            {isSpeaking && !isPaused ? 'Pause Audio' : (isSpeaking && isPaused ? 'Resume Audio' : 'Listen to Book')}
          </button>
          {isSpeaking && (
            <button 
              onClick={stopAudio}
              className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
            >
              <Square size={14} />
            </button>
          )}
        </div>

        {selectedBook.bookFile ? (
          <div 
            className="relative flex shadow-[0_0_60px_rgba(0,0,0,0.8)] rounded-md transition-transform duration-300" 
            style={{ 
              perspective: '2500px',
              transform: windowWidth < 1200 ? `scale(${Math.min(1.2, (windowWidth - 20) / (windowWidth < 768 ? 800 : 1200))})` : 'none'
            }}
          >
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 hover:bg-red-600 border-2 border-white shadow-xl rounded-full flex items-center justify-center text-white text-xl font-bold transition-all z-50"
            >
              ×
            </button>

            <Document 
              file={selectedBook.bookFile} 
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex relative"
              loading={
                <div className="flex flex-col items-center justify-center text-white/50 animate-pulse w-[800px] h-[500px]">
                  <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                  <p className="text-xs font-black uppercase tracking-widest">Opening Book...</p>
                </div>
              }
            >
              <div className="flex w-full bg-white shadow-xl rounded-md overflow-hidden relative">
                <div 
                  className="relative w-1/2 cursor-pointer group border-r border-black/10"
                  onClick={turnPrev}
                  style={{ perspective: '2000px' }}
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={pageNumber}
                      custom={direction}
                      initial={{ 
                        rotateY: direction === -1 ? -90 : 0, 
                        opacity: direction === -1 ? 0 : 1,
                        transformOrigin: 'right center'
                      }}
                      animate={{ 
                        rotateY: 0, 
                        opacity: 1,
                        zIndex: direction === -1 ? 10 : 1
                      }}
                      exit={{ 
                        rotateY: direction === 1 ? 90 : 0, 
                        opacity: direction === 1 ? 0 : 1,
                        transformOrigin: 'right center',
                        zIndex: direction === 1 ? 10 : 1
                      }}
                      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
                      className="bg-white rounded-l-md"
                    >
                      <Page 
                        pageNumber={pageNumber} 
                        width={550} 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false} 
                      />
                    </motion.div>
                  </AnimatePresence>
                  {pageNumber > 1 && (
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-4 z-20 pointer-events-none">
                      <span className="text-black/40 text-3xl font-bold">‹</span>
                    </div>
                  )}
                </div>

                <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-black/5 via-black/20 to-black/5 z-30 pointer-events-none"></div>

                <div 
                  className="relative w-1/2 cursor-pointer group"
                  onClick={turnNext}
                  style={{ perspective: '2000px' }}
                >
                  {pageNumber < numPages && (
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                      <motion.div
                        key={pageNumber + 1}
                        custom={direction}
                        initial={{ 
                          rotateY: direction === 1 ? 90 : 0, 
                          opacity: direction === 1 ? 0 : 1,
                          transformOrigin: 'left center'
                        }}
                        animate={{ 
                          rotateY: 0, 
                          opacity: 1,
                          zIndex: direction === 1 ? 10 : 1
                        }}
                        exit={{ 
                          rotateY: direction === -1 ? -90 : 0, 
                          opacity: direction === -1 ? 0 : 1,
                          transformOrigin: 'left center',
                          zIndex: direction === -1 ? 10 : 1
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
                        className="bg-white rounded-r-md"
                      >
                        <Page 
                          pageNumber={pageNumber + 1} 
                          width={550} 
                          renderTextLayer={false} 
                          renderAnnotationLayer={false}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-4 z-20 pointer-events-none">
                    <span className="text-black/40 text-3xl font-bold">›</span>
                  </div>
                </div>
              </div>
            </Document>
          </div>
        ) : (
          <div className="w-[800px] h-[500px] bg-white rounded-md flex items-center justify-center p-8 text-center shadow-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-black/50 transition-all z-50"
            >
              ×
            </button>
            <div>
              <div className="w-20 h-20 mx-auto rounded-full bg-turmeric-amber/10 flex items-center justify-center text-turmeric-amber mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <h2 className={`text-4xl font-black ${selectedBook.accentColor} mb-2`}>{selectedBook.title}</h2>
              <p className="text-earth-muted text-lg">{selectedBook.subtitle}</p>
              <div className="mt-8 px-6 py-3 rounded-full bg-turmeric-amber text-white font-bold inline-block opacity-50">
                Book content not available
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookReaderModal;
