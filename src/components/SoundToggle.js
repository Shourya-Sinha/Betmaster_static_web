import React from 'react';
import { motion } from 'framer-motion';

export default function SoundToggle({ 
  isMuted, 
  onToggle, 
  currentTrack,
  totalTracks,
  onSkipTrack 
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Skip button */}
      {!isMuted && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onSkipTrack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-xl bg-card/90 border border-white/10 flex items-center justify-center shadow-lg"
        >
          <span className="text-sm">⏭</span>
        </motion.button>
      )}

      {/* Main toggle */}
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-lg transition-all ${
          !isMuted 
            ? 'bg-primary/30 border-primary/50' 
            : 'bg-card/90 border-white/10'
        }`}
      >
        <span className="text-xl">
          {isMuted ? '🎵' : '🔊'}
        </span>
        
        {/* Track number badge */}
        {!isMuted && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">
              {currentTrack + 1}
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
