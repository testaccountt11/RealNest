import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { FileText, CheckCircle, AlertCircle, Scale, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
          Пользовательское соглашение
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
                  Настоящее Пользовательское соглашение регулирует отношения между RealNest и пользователями платформы.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Общие положения</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Используя наш сервис, вы соглашаетесь с условиями данного соглашения. Сервис предоставляется "как есть", 
                    без каких-либо гарантий. Мы оставляем за собой право изменять условия соглашения в любое время.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Правила использования</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Пользователи обязуются предоставлять достоверную информацию, не нарушать права третьих лиц,
                    не использовать сервис для незаконной деятельности и соблюдать все применимые законы и правила.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Scale className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Ответственность сторон</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    RealNest не несет ответственности за действия пользователей и достоверность размещаемой ими информации.
                    Пользователи несут полную ответственность за свои действия и размещаемый контент.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-10 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
                <div className="ml-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Разрешение споров</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Все споры, возникающие между пользователями и RealNest, решаются путем переговоров. При невозможности достичь согласия,
                    споры разрешаются в соответствии с действующим законодательством Республики Казахстан.
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