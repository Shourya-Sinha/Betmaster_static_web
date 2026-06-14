import React from 'react';
import { Link } from 'react-router-dom';
import { FaAndroid, FaApple, FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-darker border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-green-700 flex items-center justify-center">
                <span className="text-white font-bold">{t('footer.title1')}</span>
              </div>
              <span className="text-2xl font-black text-white">
                BET<span className="text-primary">MASTER</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">{t('footer.subtitle')}</p>
            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaTelegram].map((Icon, i) => (
                <a key={i} href="#social" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.quick_link')}</h4>
            <div className="space-y-2">
              {['Home', 'Games', 'Download', 'FAQ', 'Contact'].map(link => (
                <Link key={link} to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="block text-gray-400 hover:text-primary transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.download')}</h4>
            <div className="space-y-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                <FaAndroid />{t('footer.android')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                <FaApple />{t('footer.ios_soon')}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>{t('footer.foot_dec')}</p>
        </div>
      </div>
    </footer>
  );
}