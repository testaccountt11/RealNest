import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Building2, MapPin, Search, Home, Users } from "lucide-react";

// Плавающие элементы для фона
const FloatingElement = ({ className }: { className: string }) => (
  <div 
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float ${className}`}
  />
);

export default function Hero() {
  // Получаем начальные значения из URL
  const getInitialFilters = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      type: params.get("type") || "sale",
      propertyType: params.get("propertyType") || "",
      district: params.get("district") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || ""
    };
  };

  const [filters, setFilters] = useState(getInitialFilters());

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const element = document.getElementById('properties');
    element?.scrollIntoView({ behavior: 'smooth' });
    
    // Обновляем URL без перезагрузки страницы
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    // Создаем и отправляем событие для обновления списка недвижимости
    const event = new CustomEvent('updateFilters', { detail: filters });
    window.dispatchEvent(event);
  };

  // Обновляем фильтры при изменении URL
  useEffect(() => {
    const handlePopState = () => {
      setFilters(getInitialFilters());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Дополнительные градиентные эффекты */}
      <div className="absolute inset-0">
        {/* Основной градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/80" />
        
        {/* Радиальные градиенты */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_50%)]" />
        
        {/* Декоративные градиенты */}
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-indigo-200/40 rounded-full blur-3xl opacity-75" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-gradient-to-bl from-indigo-100/40 to-blue-200/40 rounded-full blur-3xl opacity-75" />
        
        {/* Центральный градиент для глубины */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/10 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 top-[40%] h-[120%] bg-gradient-to-b from-transparent via-white/5 to-white/30 blur-3xl" />
        
        {/* Верхний градиент для плавного перехода */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 -mt-4 md:-mt-6 pb-2 md:pb-4">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-5">
          {/* Заголовок с дополнительным градиентным эффектом */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/50 via-indigo-100/50 to-purple-100/50 rounded-lg blur-xl opacity-50" />
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-1 leading-tight">
                Недвижимость <br />
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  в Астане
                </span>
              </h1>
            </div>
            <p className="text-base md:text-lg text-slate-600 mt-1">
              Более 1000 объектов для покупки и аренды
            </p>
          </div>

          {/* Фильтр поиска с улучшенным эффектом стекла */}
          <div className="w-full max-w-5xl mx-auto">
            <Card className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 shadow-lg border-0 p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-3">
                  <Select
                    value={filters.type}
                    onValueChange={(value) => handleFilterChange("type", value)}
                  >
                    <SelectTrigger className="h-12 bg-gradient-to-br from-white/90 to-white/80 text-slate-600 hover:bg-white/95 transition-colors focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50">
                      <SelectValue placeholder="Тип сделки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Купить</SelectItem>
                      <SelectItem value="rent">Арендовать</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3">
                  <Select
                    value={filters.propertyType}
                    onValueChange={(value) => handleFilterChange("propertyType", value)}
                  >
                    <SelectTrigger className="h-12 bg-gradient-to-br from-white/90 to-white/80 text-slate-600 hover:bg-white/95 transition-colors focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50">
                      <SelectValue placeholder="Тип жилья" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Любой тип</SelectItem>
                      <SelectItem value="apartment">Квартира</SelectItem>
                      <SelectItem value="house">Дом</SelectItem>
                      <SelectItem value="studio">Студия</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3">
                  <Select
                    value={filters.district}
                    onValueChange={(value) => handleFilterChange("district", value)}
                  >
                    <SelectTrigger className="h-12 bg-gradient-to-br from-white/90 to-white/80 text-slate-600 hover:bg-white/95 transition-colors focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50">
                      <SelectValue placeholder="Район" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все районы</SelectItem>
                      <SelectItem value="Есиль">Есиль</SelectItem>
                      <SelectItem value="Алматы">Алматы</SelectItem>
                      <SelectItem value="Сарыарка">Сарыарка</SelectItem>
                      <SelectItem value="Байконур">Байконур</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3">
                  <Button 
                    onClick={handleSearch} 
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Найти
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Input
                    type="number"
                    placeholder="Цена от"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="h-12 bg-gradient-to-br from-white/90 to-white/80 text-slate-600 placeholder:text-slate-400 hover:bg-white/95 transition-colors focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Цена до"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="h-12 bg-gradient-to-br from-white/90 to-white/80 text-slate-600 placeholder:text-slate-400 hover:bg-white/95 transition-colors focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Статистика с улучшенными градиентами */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">1000+</h3>
              <p className="text-slate-600">Объектов недвижимости</p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 via-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">4</h3>
              <p className="text-slate-600">Района города</p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Home className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">24/7</h3>
              <p className="text-slate-600">Поддержка клиентов</p>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 via-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">500+</h3>
              <p className="text-slate-600">Довольных клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
