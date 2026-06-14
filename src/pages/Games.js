import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GameAlert from '../components/GameAlert';
import { useTranslation } from 'react-i18next';

export default function Games() {
    const { t } = useTranslation();

    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState('');

    const handlePlayNow = (gameName) => {
        console.log('Play clicked:', gameName);
        setSelectedGame(gameName);
        setAlertOpen(true);
    };

    const games = [
        { icon: '🏏', name: t('games.cricket'), desc: t('games.d1'), color: 'from-green-500 to-emerald-700', players: '2.5M+' },
        { icon: '⚽', name: t('games.football'), desc: t('games.d2'), color: 'from-blue-500 to-indigo-700', players: '1.8M+' },
        { icon: '🃏', name: t('games.teenpatti'), desc: t('games.d3'), color: 'from-purple-500 to-violet-700', players: '3.2M+' },
        { icon: '🎲', name: t('games.ludo'), desc: t('games.d4'), color: 'from-orange-500 to-red-700', players: '4.1M+' },
        { icon: '♠️', name: t('games.poker'), desc: t('games.d5'), color: 'from-red-500 to-pink-700', players: '1.5M+' },
        { icon: '🃏', name: t('games.rummy'), desc: t('games.d6'), color: 'from-cyan-500 to-blue-700', players: '2.8M+' },
    ];
    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-black text-white text-center mb-6"
                >
                    {t('games.title1')} <span className="text-primary"> {t('games.title2')}</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 text-center mb-16"
                >
                    {t('games.subtitle')}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, i) => (
                        <motion.div
                            key={game.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-4xl`}>
                                {game.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{game.name}</h3>
                            <p className="text-gray-400 mb-6">{game.desc}</p>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-sm text-gray-500">👥 {game.players} {t('games.player')}</span>
                                <span className="text-sm text-gold">⭐ 4.8</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent bubbling
                                    handlePlayNow(game.name);
                                }}
                                className="w-full py-3 bg-primary/20 hover:bg-primary text-primary hover:text-white font-bold rounded-xl transition-all">
                                {t('games.play_now')}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
            <GameAlert
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                gameName={selectedGame}
            />
        </div>
    );
}