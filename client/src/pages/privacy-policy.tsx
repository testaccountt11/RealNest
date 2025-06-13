import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Shield, FileText, User, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
        >
          Политика конфиденциальности
        </motion.h1>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-12"
        >
          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <p className="ml-8 text-lg text-gray-700 leading-relaxed">
                  Настоящая Политика конфиденциальности описывает, как RealNest собирает, использует и защищает вашу личную информацию.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <User className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Сбор информации</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Мы собираем информацию, которую вы предоставляете нам при регистрации, использовании наших услуг или обращении в службу поддержки.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Использование информации</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Собранная информация используется для улучшения наших услуг, связи с вами и обеспечения безопасности.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Защита информации</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Мы принимаем меры для защиты вашей личной информации от несанкционированного доступа и использования.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Контакты</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Если у вас есть вопросы относительно нашей политики конфиденциальности, пожалуйста, свяжитесь с нами по адресу: 
                    <a href="mailto:info@realnest.kz" className="text-blue-600 hover:text-blue-700 ml-1">
                      info@realnest.kz
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
} 