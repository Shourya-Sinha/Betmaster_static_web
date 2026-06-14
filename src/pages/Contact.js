import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


const YOUR_EMAIL = 'shouryasinha.c@gmail.com';

export default function Contact() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            // ✅ FormSubmit - sends directly to your email
            const response = await fetch(`https://formsubmit.co/ajax/${YOUR_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _subject: `BetMaster Contact: ${form.name}`,
                    _template: 'table',
                    _captcha: 'false',
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('✅ Message sent!');
                setStatus('success');
                setForm({ name: '', email: '', message: '' });

                // Reset after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error(data.message || 'Failed to send');
            }
        } catch (error) {
            console.error('❌ Error:', error);
            setStatus('error');
            setErrorMsg(
                'Unable to send message. Please email us directly at ' + YOUR_EMAIL
            );

            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-black text-white text-center mb-6"
                >
                    {t('contact.title1')} <span className="text-primary">{t('contact.title2')}</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 text-center mb-16"
                >
                    {t('contact.subtitle')}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {[
                            { icon: <FaEnvelope />, title: 'Email', value: 'support@betmaster.com' },
                            { icon: <FaPhone />, title: 'Phone', value: '+91 1800-123-4567' },
                            { icon: <FaMapMarkerAlt />, title: 'Address', value: 'Mumbai, Maharashtra, India' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 bg-card/50 rounded-2xl p-6 border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-xl">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">{item.title}</p>
                                    <p className="text-white font-bold">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    // className="bg-card/50 rounded-2xl p-8 border border-white/5 space-y-6"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/5 space-y-6 relative overflow-hidden"
                        >
                            {/* Decorative glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                            {/* Name */}
                            <div className="relative z-10">
                                <label className="block text-gray-400 mb-2 text-sm font-medium">
                                     {t('contact.name')} <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                    disabled={status === 'sending'}
                                    minLength={2}
                                />
                            </div>

                            {/* Email */}
                            <div className="relative z-10">
                                <label className="block text-gray-400 mb-2 text-sm font-medium">
                                    {t('contact.email')} <span className="text-primary">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    required
                                    disabled={status === 'sending'}
                                />
                            </div>

                            {/* Message */}
                            <div className="relative z-10">
                                <label className="block text-gray-400 mb-2 text-sm font-medium">
                                     {t('contact.message')} <span className="text-primary">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={5}
                                    placeholder="Tell us how we can help you..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                    required
                                    disabled={status === 'sending'}
                                    minLength={10}
                                />
                                <p className="text-gray-500 text-xs mt-1 text-right">
                                    {form.message.length}/1000
                                </p>
                            </div>
                            {/* Submit Button */}
                            <div className="relative z-10">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${status === 'sending'
                                        ? 'bg-gray-600 cursor-not-allowed'
                                        : status === 'success'
                                            ? 'bg-green-600 shadow-lg shadow-green-500/30'
                                            : 'bg-gradient-to-r from-primary to-green-600 hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]'
                                        }`}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <FaSpinner className="animate-spin" /> {t('contact.sending')}
                                        </>
                                    ) : status === 'success' ? (
                                        <>
                                            <FaCheckCircle /> {t('contact.success')}
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane /> {t('contact.send')}
                                        </>
                                    )}
                                </button>
                            </div>
                            {/* Success Message */}
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative z-10 text-center bg-green-500/10 border border-green-500/30 rounded-xl py-4 px-4"
                                >
                                    <p className="text-green-400 font-bold text-lg mb-1">✅ {t('contact.thank')}</p>
                                    <p className="text-green-300 text-sm">
                                        {t('contact.success_message')}
                                    </p>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative z-10 text-center bg-red-500/10 border border-red-500/30 rounded-xl py-4 px-4"
                                >
                                    <div className="flex items-center justify-center gap-2 mb-1">
                                        <FaExclamationCircle className="text-red-400" />
                                        <p className="text-red-400 font-bold"> {t('contact.failed')}</p>
                                    </div>
                                    <p className="text-red-300 text-sm">{errorMsg}</p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}