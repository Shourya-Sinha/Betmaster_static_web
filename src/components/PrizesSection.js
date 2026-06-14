import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';


export default function PrizesSection() {
  const { t } = useTranslation();

  const recentWinners = [
    { name: 'Rahul S.', amount: '₹1,50,000', game: t('games.cricket'), time: t('prizes.t1') },
    { name: 'Priya M.', amount: '₹85,000', game: t('games.teenpatti'), time: t('prizes.t2') },
    { name: 'Amit K.', amount: '₹2,00,000', game: t('games.ludo'), time: t('prizes.t3') },
    { name: 'Sneha P.', amount: '₹45,000', game: t('games.football'), time: t('prizes.t4') },
    { name: 'Vikram R.', amount: '₹1,25,000', game: t('games.poker'), time: t('prizes.t5') },
  ];

  const prizeCategories = [
    {
      title: t('prizes.cat_title1'),
      amount: '₹10,00,000',
      icon: '🎰',
      desc: t('prizes.cat_dec1'),
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: t('prizes.cat_title2'),
      amount: '₹50,00,000',
      icon: '🏆',
      desc: t('prizes.cat_dec2'),
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: t('prizes.cat_title3'),
      amount: t('prizes.amt'),
      icon: '👥',
      desc: t('prizes.cat_dec3'),
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: t('prizes.cat_title4'),
      amount: t('prizes.amt1'),
      icon: '🎁',
      desc: t('prizes.cat_dec4'),
      color: 'from-green-500 to-emerald-600',
    },
  ];
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            {t('prizes.title')} <span className="text-gold">{t('prizes.title1')}</span>
          </h2>
          <p className="text-xl text-gray-400">
            {t('prizes.subtitle')}
          </p>
        </motion.div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {prizeCategories.map((prize, i) => (
            <motion.div
              key={prize.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prize.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
              <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-6 border border-white/5 hover:border-gold/30 transition-all">
                <div className="text-5xl mb-4">{prize.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{prize.title}</h3>
                <div className={`text-3xl font-black bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-3`}>
                  {prize.amount}
                </div>
                <p className="text-gray-400 text-sm">{prize.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Winners Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-white/5 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-3 h-3 rounded-full bg-green-500"
            />
            <h3 className="text-white font-bold text-lg">🟢 {t('prizes.recent')}</h3>
          </div>

          <div className="space-y-3">
            {recentWinners.map((winner, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center text-white font-bold text-sm">
                    {winner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold">{winner.name}</p>
                    <p className="text-gray-500 text-sm">{winner.game} • {winner.time}</p>
                  </div>
                </div>
                <div className="text-gold font-black text-lg">{winner.amount}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Total Winnings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-block bg-gradient-to-r from-gold/20 to-orange-500/20 rounded-3xl px-8 py-4 border border-gold/20">
            <p className="text-gray-400 text-sm mb-1">{t('prizes.total')}</p>
            <p className="text-4xl font-black text-gold">{t('prizes.amount')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}