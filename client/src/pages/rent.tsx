import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import Header from "@/components/header";
import PropertyCard from "@/components/property-card";
import PropertyModal from "@/components/property-modal";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, Search, Building2, Home, Users, ArrowRight, Star, Clock, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ChatBot } from "@/components/ChatBot";
import { cn } from "@/lib/utils";

export default function Rent() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [filters, setFilters] = useState({
    type: "rent",
    propertyType: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    area: [20, 200],
  });

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("type", "rent");
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && key !== "area" && key !== "type") {
          if (key === "propertyType" && value === "any") return;
          if (key === "district" && value === "all") return;
          if (key === "rooms" && value === "any") return;
          params.append(key, String(value));
        }
      });
      
      const response = await fetch(`/api/properties?${params}`);
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      console.log('Fetched properties:', data); // Добавляем лог для отладки
      return data;
    },
  });

  // Фильтруем только объявления аренды и сортируем по дате
  const rentalProperties = useMemo(() => {
    return properties
      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }, [properties]);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(rentalProperties.length / itemsPerPage);

  // Получаем объявления для текущей страницы
  const currentPageProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return rentalProperties.slice(startIndex, endIndex);
  }, [rentalProperties, currentPage, itemsPerPage]);

  useEffect(() => {
    // Сбрасываем страницу на первую, если изменилось количество объявлений
    if (currentPage > 1 && currentPageProperties.length === 0) {
      setCurrentPage(1);
    }
  }, [currentPageProperties.length, currentPage]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      type: "rent",
      propertyType: "",
      district: "",
      minPrice: "",
      maxPrice: "",
      rooms: "",
      area: [20, 200],
    });
    setCurrentPage(1);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages !== 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Декоративные элементы фона */}
        <div className="absolute inset-0">
          {/* Основные градиенты */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" />
          
          {/* Анимированные круги */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [0.8, 1.1, 0.8],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-bl from-indigo-100/30 to-blue-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Основной контент */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Левая колонка с текстом */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  >
                    Найдите свой 
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      идеальный дом
                    </span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-xl text-slate-600 max-w-xl"
                  >
                    Откройте для себя лучшие варианты аренды в Астане. От уютных квартир до просторных домов – найдите жильё своей мечты.
                  </motion.p>
                </div>
            
                {/* Поисковая строка */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex gap-4 max-w-xl"
                >
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Поиск по адресу или району..."
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <Button 
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-[1.02]"
                  >
                    Найти
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Преимущества */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 gap-6 pt-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Проверенные</div>
                      <div className="text-slate-600 text-sm">арендодатели</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Быстрое</div>
                      <div className="text-slate-600 text-sm">заселение</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Безопасные</div>
                      <div className="text-slate-600 text-sm">сделки</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Поддержка</div>
                      <div className="text-slate-600 text-sm">24/7</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Правая колонка с изображением */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative w-full aspect-[4/3]">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
                      alt="Современная квартира"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay градиент */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
                  </div>
                  
                  {/* Плавающие карточки */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute -left-8 top-1/4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">500+ объектов</div>
                        <div className="text-xs text-slate-600">в каталоге</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -right-8 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">4 района</div>
                        <div className="text-xs text-slate-600">города</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Список объявлений */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Фильтры и список объявлений */}
          <div className="space-y-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
              <Card className="lg:w-72 shrink-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Filter className="h-5 w-5" />
                    Фильтры
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Очистить
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Цена за месяц</Label>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="От"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                      />
                      <Input
                        type="number"
                        placeholder="До"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Тип недвижимости</Label>
                  <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Любой тип</SelectItem>
                      <SelectItem value="apartment">Квартира</SelectItem>
                      <SelectItem value="house">Дом</SelectItem>
                      <SelectItem value="studio">Студия</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rooms */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Количество комнат</Label>
                  <Select value={filters.rooms} onValueChange={(value) => handleFilterChange("rooms", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Любое количество</SelectItem>
                      <SelectItem value="0">Студия</SelectItem>
                      <SelectItem value="1">1 комната</SelectItem>
                      <SelectItem value="2">2 комнаты</SelectItem>
                      <SelectItem value="3">3 комнаты</SelectItem>
                      <SelectItem value="4">4+ комнат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">Район</Label>
                  <Select value={filters.district} onValueChange={(value) => handleFilterChange("district", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите район" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все районы</SelectItem>
                      <SelectItem value="Есиль">Есиль район</SelectItem>
                      <SelectItem value="Сарыарка">Сарыарка район</SelectItem>
                      <SelectItem value="Алматинский">Алматинский район</SelectItem>
                      <SelectItem value="Байконур">Байконур район</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Area Range */}
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Площадь: {filters.area[0]} - {filters.area[1]} м²
                  </Label>
                  <Slider
                    value={filters.area}
                    onValueChange={(value) => handleFilterChange("area", value)}
                    max={300}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

              {/* Active Filters */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-800">Аренда недвижимости</h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Астана</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {isLoading ? "Загрузка..." : `Найдено ${rentalProperties.length} объектов`}
              </div>
            </div>

                {/* Properties Grid */}
            {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
                ))}
              </div>
            ) : rentalProperties.length === 0 ? (
                  <div className="text-center py-24">
                <div className="text-gray-400 text-lg mb-4">Объектов не найдено</div>
                <p className="text-gray-600 mb-6">
                  Попробуйте изменить параметры поиска или очистить фильтры
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Очистить фильтры
                </Button>
              </div>
            ) : (
              <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-12">
                      {currentPageProperties.map((property) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <PropertyCard
                            property={property}
                            onPropertyClick={handlePropertyClick}
                          />
                        </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8 pb-12">
                  <nav className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                          >
                      Предыдущая
                    </Button>

                          {getVisiblePages().map((page, index) => (
                            <Button
                              key={index}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => typeof page === 'number' && setCurrentPage(page)}
                              disabled={typeof page !== 'number'}
                              className={cn(
                                typeof page === 'number' && currentPage === page && 
                                "bg-blue-600 text-white hover:bg-blue-700"
                              )}
                            >
                              {page}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                          >
                      Следующая
                    </Button>
                  </nav>
                </div>
                    )}
              </>
            )}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="space-y-8">
              {/* Properties Grid */}
            </div>
          </div>
        </div>
      </section>

      {/* Чат-бот */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Нужна помощь в поиске?
                </h2>
                <p className="text-slate-600">
                  Наш умный помощник поможет подобрать идеальный вариант аренды
                </p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Декоративный фон */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 rounded-3xl" />
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.1),transparent_50%)]" />
      </div>
              
              {/* Чат-бот */}
              <div className="relative">
                <ChatBot />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PropertyModal
        property={selectedProperty}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <Footer />
    </div>
  );
}