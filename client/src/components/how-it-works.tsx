import { Card } from "@/components/ui/card";
import { Search, MapPin, Calculator, Shield } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Умный поиск",
    description: "Находите идеальное жилье с помощью удобных фильтров и интерактивной карты"
  },
  {
    icon: Calculator,
    title: "Калькулятор стоимости",
    description: "Рассчитайте полную стоимость покупки с учетом всех расходов и ипотеки"
  },
  {
    icon: MapPin,
    title: "Поиск по карте",
    description: "Просматривайте все доступные варианты в нужном вам районе"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Все объявления проверяются нашими специалистами на достоверность"
  }
];

export function HowItWorks() {
  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center relative overflow-hidden">
      {/* Декоративный фоновый элемент */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24 md:py-32 w-full">
        {/* Заголовок секции */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Как работает RealNest
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Мы упрощаем процесс поиска и покупки недвижимости, предоставляя удобные инструменты и проверенную информацию
          </p>
        </div>

        {/* Основные возможности */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
} 