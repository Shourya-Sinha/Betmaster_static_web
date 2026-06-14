import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGamepad, FaDice, FaDownload, FaQuestionCircle, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { t } = useTranslation();

    // ✅ Move navItems inside component to access t()
    const navItems = [
        { path: '/', label: t('nav.home'), icon: <FaGamepad /> },
        { path: '/games', label: t('nav.games'), icon: <FaDice /> },
        { path: '/download', label: t('nav.download'), icon: <FaDownload /> },
        { path: '/faq', label: t('nav.faq'), icon: <FaQuestionCircle /> },
        { path: '/contact', label: t('nav.contact'), icon: <FaEnvelope /> },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-darker/95 backdrop-blur-lg shadow-2xl shadow-primary/10' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-700 flex items-center justify-center"
                        >
                            <span className="text-white font-bold text-lg">B</span>
                        </motion.div>
                        <div>
                            <span className="text-2xl font-black text-white tracking-wider">
                                BET<span className="text-primary">MASTER</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                                        location.pathname === item.path
                                            ? 'bg-primary text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <span className="text-sm">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* ✅ Right Side: Language Switcher + CTA Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <LanguageSwitcher />
                        <Link to="/download">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(76,175,80,0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2.5 bg-gradient-to-r from-primary to-green-600 rounded-xl font-bold text-white shadow-lg shadow-primary/25"
                            >
                                {t('nav.download')}
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10"
                    >
                        {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-darker/95 backdrop-blur-lg border-t border-white/5"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                                        location.pathname === item.path ? 'bg-primary' : 'hover:bg-white/5'
                                    }`}>
                                        {item.icon}
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                </Link>
                            ))}
                            
                            {/* Language Switcher in Mobile */}
                            <div className="px-4 py-2">
                                <LanguageSwitcher />
                            </div>
                            
                            <Link to="/download" onClick={() => setMobileOpen(false)}>
                                <button className="w-full py-3 bg-gradient-to-r from-primary to-green-600 rounded-xl font-bold text-white mt-2">
                                    {t('nav.download')}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}