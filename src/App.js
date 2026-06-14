import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SoundToggle from './components/SoundToggle';
import useGameSound from './hooks/useGameSound'; // ✅ ADD THIS
import SoundPrompt from './components/SoundPrompt';

const Home = lazy(() => import('./pages/Home'));
const Games = lazy(() => import('./pages/Games'));
const Download = lazy(() => import('./pages/Download'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);

function App() {

  const {
    isMuted,
    toggleSound,
    audioReady,
    loadError,
    currentTrack,
    totalTracks,
    skipTrack
  } = useGameSound();

  const [showPrompt, setShowPrompt] = useState(true);

  const handleEnableSound = () => {
    toggleSound(); // Unmute and play
    setShowPrompt(false);
  };

  return (
    <Router>
      <div className="bg-dark min-h-screen text-white overflow-hidden">
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/download" element={<Download />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
        <ScrollToTop />

        <SoundPrompt
          visible={showPrompt && isMuted && audioReady}
          onEnable={handleEnableSound}
        />

        {/* ✅ All variables are now defined */}
        <SoundToggle
          isMuted={isMuted}
          onToggle={toggleSound}
          // audioReady={audioReady}
          // loadError={loadError}
          currentTrack={currentTrack}
          totalTracks={totalTracks}
          onSkipTrack={skipTrack}
        />
      </div>
    </Router>
  );
}
export default App;