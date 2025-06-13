import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Award, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  Building2,
  Target,
  Heart,
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Building2, label: "Объектов недвижимости", value: "50,000+" },
    { icon: Users, label: "Довольных клиентов", value: "15,000+" },
    { icon: MapPin, label: "Городов Казахстана", value: "20+" },
    { icon: Award, label: "Лет на рынке", value: "8" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Надежность",
      description: "Все объекты проходят тщательную проверку. Мы гарантируем достоверность информации и безопасность сделок."
    },
    {
      icon: Target,
      title: "Точность",
      description: "Используем современные технологии для предоставления максимально точной информации о недвижимости."
    },
    {
      icon: Heart,
      title: "Забота о клиентах",
      description: "Наша команда экспертов всегда готова помочь найти идеальное решение для ваших потребностей."
    },
    {
      icon: TrendingUp,
      title: "Инновации",
      description: "Постоянно развиваем платформу, внедряя новые функции для удобства пользователей."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-white">
        {/* Декоративный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Текстовая колонка */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-1">8 лет на рынке недвижимости</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Мы создаем 
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    будущее недвижимости
                  </span>
                </h1>
                <p className="text-lg text-gray-600">
                  Объединяем технологии и опыт для создания лучшего опыта поиска 
                  и покупки недвижимости в Казахстане
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Users className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="font-semibold text-gray-900">15,000+</div>
                  <div className="text-sm text-gray-600">Довольных клиентов</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <Building2 className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="font-semibold text-gray-900">50,000+</div>
                  <div className="text-sm text-gray-600">Объектов в базе</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.location.href = '/'}
                >
                  Начать поиск
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2"
                  onClick={() => {
                    document.getElementById('about-history')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  О компании
                </Button>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center">
                        <Star className="h-4 w-4 text-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">4.9 из 5</div>
                    <div className="text-sm text-gray-600">На основе 3,200+ отзывов</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Колонка с изображением */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 relative"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 p-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="RealNest Office"
                  className="w-full rounded-xl"
                />

                <div className="absolute left-4 bottom-4 right-4 z-20">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-600" />
                      <div className="text-sm font-medium text-gray-900">Топ-1 сервис</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div className="text-sm font-medium text-gray-900">20+ городов</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div className="text-sm font-medium text-gray-900">24/7 поддержка</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Декоративные элементы */}
              <div className="absolute -z-10 top-1/3 right-0 w-1/2 h-1/2 bg-blue-100/30 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-1/3 left-0 w-1/2 h-1/2 bg-indigo-100/30 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-history" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">Наша история</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                8 лет помогаем людям найти дом мечты
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                RealNest была основана в 2016 году с простой целью - сделать рынок недвижимости 
                более прозрачным и доступным для всех. Мы начинали как небольшая команда 
                энтузиастов в Астане и выросли в крупнейшую платформу недвижимости Казахстана.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Сегодня мы помогаем тысячам семей ежемесячно находить идеальное жилье, 
                предоставляя современные технологии поиска, честные цены и профессиональную поддержку.
              </p>
              <div className="flex items-center gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Связаться с нами
                </Button>
                <Button variant="outline">
                  Наша история
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Офис RealNest"
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Поддержка клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 pb-48 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Наши ценности</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Принципы, которыми мы руководствуемся
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Наша работа строится на четких принципах, которые помогают нам создавать 
              лучший сервис для наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}