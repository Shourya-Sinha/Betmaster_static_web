import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaAndroid, FaApple, FaDownload, FaStar, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// ✅ Your ImageKit URL - REPLACE WITH YOUR ACTUAL URL
const APK_DOWNLOAD_URL = 'https://drive.google.com/file/d/18UrcDjcOR2e1GvaFQW7UuYSLIjJUpcqH/view?usp=sharing';

export default function Download() {
  const { t } = useTranslation();
  const [showIOSAlert, setShowIOSAlert] = useState(false);

  const handleAndroidDownload = () => {
    window.open(APK_DOWNLOAD_URL, '_blank');
  };

  const handleIOSClick = () => {
    setShowIOSAlert(true);
    setTimeout(() => setShowIOSAlert(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-black text-white mb-6"
        >
          {t('download.title1')} <span className="text-primary">{t('download.title2')}</span>
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400 mb-16"
        >
         {t('download.subtitle')}
        </motion.p>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Android */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleAndroidDownload}
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-primary/50 cursor-pointer transition-all group"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <FaAndroid size={45} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('download.android')}</h3>
            <p className="text-gray-400 mb-6">{t('download.android_desc')}</p>
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white flex items-center gap-2 mx-auto">
              <FaDownload /> {t('download.download')}
            </button>
            <p className="text-xs text-gray-500 mt-4"> {t('download.version')}</p>
          </motion.div>

          {/* iOS */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleIOSClick}
            className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-accent/50 cursor-pointer transition-all group relative"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <FaApple size={45} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{t('download.ios')}</h3>
            <p className="text-gray-400 mb-6">{t('download.ios_desc')}</p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-bold text-white flex items-center gap-2 mx-auto">
              <FaApple /> {t('download.coming')}
            </button>
            <p className="text-xs text-gray-500 mt-4">{t('download.develop')}</p>

            {/* iOS Alert */}
            {showIOSAlert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-accent/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold shadow-xl"
              >
                🍎 {t('download.soon')}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl mx-auto">
          {[
            { icon: <FaShieldAlt size={24} />, title: 'Safe & Secure', desc: 'Verified and virus-free APK' },
            { icon: <FaBolt size={24} />, title: 'Fast Download', desc: 'Optimized for quick install' },
            { icon: <FaStar size={24} />, title: '4.8 Rating', desc: 'Trusted by 10M+ users' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center p-6"
            >
              <div className="text-primary mb-3 flex justify-center">{item.icon}</div>
              <h4 className="text-white font-bold mb-1">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}