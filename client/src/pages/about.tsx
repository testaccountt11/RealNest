import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp
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

  const team = [
    {
      name: "Алексей Иванов",
      position: "Генеральный директор",
      experience: "12 лет в сфере недвижимости",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Марина Петрова",
      position: "Директор по развитию",
      experience: "8 лет в сфере недвижимости",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    },
    {
      name: "Дмитрий Сидоров",
      position: "Технический директор",
      experience: "10 лет в IT",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">О компании RealNest</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Мы делаем поиск и аренду недвижимости простым, удобным и безопасным 
            для каждого жителя Казахстана
          </p>
          <div className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="text-blue-100 ml-2">4.9 из 5 по отзывам клиентов</span>
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
      <section className="py-16 bg-gray-50">
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
      <section className="py-16 bg-white">
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

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">Наша команда</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Эксперты, которые делают RealNest лучше
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Познакомьтесь с профессионалами, которые стоят за успехом нашей платформы
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-sm">
                <CardHeader>
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-blue-600 font-medium">{member.position}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать поиск недвижимости?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных клиентов и найдите свой идеальный дом уже сегодня
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Начать поиск
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Phone className="h-5 w-5 mr-2" />
              Связаться с нами
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="h-8 w-8 text-blue-200 mx-auto mb-3" />
              <div className="text-white font-medium">Телефон</div>
              <div className="text-blue-100">+7 (7172) 123-456</div>
            </div>
            <div>
              <Mail className="h-8 w-8 text-blue-200 mx-auto mb-3" />
              <div className="text-white font-medium">Email</div>
              <div className="text-blue-100">info@realnest.kz</div>
            </div>
            <div>
              <MapPin className="h-8 w-8 text-blue-200 mx-auto mb-3" />
              <div className="text-white font-medium">Офис</div>
              <div className="text-blue-100">г. Астана, пр. Кунаева, 12</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}