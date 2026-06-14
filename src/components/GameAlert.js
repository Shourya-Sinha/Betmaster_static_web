import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function GameAlert({ isOpen, onClose, gameName }) {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-gradient-to-br from-card to-darker border border-white/10 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-primary/20"
          >
            {/* Game Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-7xl mb-6"
            >
              {gameName === 'Cricket' ? '🏏' :
                gameName === 'Football' ? '⚽' :
                  gameName === 'Teen Patti' ? '🃏' :
                    gameName === 'Ludo' ? '🎲' :
                      gameName === 'Poker' ? '♠️' : '🎮'}
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl font-black text-white mb-3">
              {t('alert.play_title')} {gameName}!
            </h2>
            <p className="text-gray-400 mb-6">
              🎮 {t('alert.play_desc')}<br />
              {t('alert.start')}
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: '💰', text: 'Win Cash' },
                { icon: '👥', text: 'Real Players' },
                { icon: '⚡', text: 'Instant Pay' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-gray-400">{item.text}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Link to="/download">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-gradient-to-r from-primary to-green-600 rounded-2xl font-bold text-white text-lg shadow-xl shadow-primary/25"
                >
                  📱 {t('alert.download_now')}Download App Now
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-gray-300 border border-white/10"
              >
                {t('alert.maybe_later')}
              </motion.button>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}