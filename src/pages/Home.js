import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaDownload, FaStar, FaUsers, FaTrophy, FaShieldAlt, FaBolt, FaHeadset } from 'react-icons/fa';
import { GiCricketBat, GiSoccerBall, GiCardPlay, GiDiceEightFacesEight } from 'react-icons/gi';
import ThreeDBackground from '../components/3DBackground';
import PrizesSection from '../components/PrizesSection';
import GameAlert from '../components/GameAlert';
import { useTranslation } from 'react-i18next';


export default function Home() {
    const { t } = useTranslation();

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ['start start', 'end start'],
    });

    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [alertOpen, setAlertOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState('');

    const handlePlayNow = (gameName) => {
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

    const features = [
        { icon: <FaBolt />, title: t('features.instant'), desc: t('features.instant_desc') },
        { icon: <FaShieldAlt />, title: t('features.secure'), desc: t('features.secure_desc') },
        { icon: <FaHeadset />, title: t('features.support'), desc: t('features.support_desc') },
        { icon: <FaTrophy />, title: t('features.tournaments'), desc: t('features.tournaments_desc') },
    ];

    const testimonials = [
        { name: 'Rahul S.', text: t('testimonial.t1_dec'), rating: 5 },
        { name: 'Priya M.', text: t('testimonial.t2_dec'), rating: 5 },
        { name: 'Amit K.', text: t('testimonial.t3_dec'), rating: 5 },
    ];

    return (
        <div ref={targetRef}>
            {/* Hero Section with 3D Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <ThreeDBackground />

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-darker/80 via-dark/50 to-dark z-[1]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(76,175,80,0.1),transparent_70%)] z-[1]" />

                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="mb-8 inline-block"
                    >
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-green-700 flex items-center justify-center mx-auto shadow-2xl shadow-primary/50 animate-pulse-glow">
                            <span className="text-5xl">🏏</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight"
                    >
                        <span className="bg-gradient-to-r from-white via-green-200 to-primary bg-clip-text text-transparent">
                            {t('hero.title1')}
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-yellow-400 to-gold bg-clip-text text-transparent">
                            {t('hero.title2')}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
                    >
                        {t('hero.subtitle')}
                        {t('hero.subtitle2')}
                        <span className="text-primary font-bold"> {t('hero.win_daily')}</span>
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/download">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(76,175,80,0.6)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-primary to-green-600 rounded-2xl font-bold text-lg text-white shadow-xl shadow-primary/30 flex items-center gap-3"
                            >
                                <FaDownload />
                                {t('hero.cta_download')}
                            </motion.button>
                        </Link>
                        <Link to="/games">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl font-bold text-lg text-white border border-white/20 hover:bg-white/20 flex items-center gap-3"
                            >
                                <FaStar />
                                {t('hero.cta_explore')}
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
                    >
                        {[
                            { value: '10M+', label: 'Users' },
                            { value: '₹50Cr+', label: 'Daily Winnings' },
                            { value: '24/7', label: 'Live Games' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl md:text-3xl font-black text-gold">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-1.5 h-3 bg-primary rounded-full"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Games Section */}
            <section className="py-24 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t('hero.title3')}<span className="text-primary"> {t('hero.title4')}</span>
                        </h2>
                        <p className="text-gray-400 text-lg">{t('hero.subtitle2')}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {games.map((game, i) => (
                            <motion.div
                                key={game.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <span className="text-2xl">{game.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{game.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <FaUsers size={12} /> {game.players} {t('games.player')}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePlayNow(game.name);
                                        }}
                                        className="text-primary text-sm font-bold hover:underline cursor-pointer bg-transparent border-none"
                                    >
                                        {t('hero.play_now')} →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 bg-darker/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t('features.title')} <span className="text-primary">BetMaster</span>?
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -5 }}
                                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/5"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prizes Section */}
            <PrizesSection />

            {/* Testimonials */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t('testimonial.title1')} <span className="text-primary">{t('testimonial.title2')}</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                            >
                                <div className="flex gap-1 mb-3">
                                    {[...Array(t.rating)].map((_, j) => (
                                        <FaStar key={j} className="text-gold" size={16} />
                                    ))}
                                </div>
                                <p className="text-gray-300 mb-4">"{t.text}"</p>
                                <p className="text-white font-bold">{t.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                            {t('cta_sec.title1')} <span className="text-gold">{t('cta_sec.title2')}</span>?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10">
                            {t('cta_sec.subtitle')}
                        </p>
                        <Link to="/download">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-gradient-to-r from-primary to-green-600 rounded-2xl font-bold text-xl text-white shadow-2xl shadow-primary/50 animate-pulse-glow"
                            >
                                <FaDownload className="inline mr-3" />
                                {t('cta_sec.free_now')}
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
            <GameAlert
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                gameName={selectedGame}
            />
        </div>
    );
}