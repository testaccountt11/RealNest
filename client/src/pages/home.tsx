import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedProperties from "@/components/featured-properties";
import PropertyCard from "@/components/property-card";
import PropertyModal from "@/components/property-modal";
import PropertyCalculator from "@/components/property-calculator";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";
import { MapSection } from "@/components/map-section";
import { HowItWorks } from "@/components/how-it-works";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Показываем по 3 объекта на странице
  const [filters, setFilters] = useState({
    type: "sale",
    propertyType: "",
    district: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    area: [20, 500],
  });

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("type", "sale");
      
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
      return response.json();
    },
  });

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      type: "sale",
      propertyType: "",
      district: "",
      minPrice: "",
      maxPrice: "",
      rooms: "",
      area: [20, 500],
    });
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      <Hero />
      <HowItWorks />
      <MapSection />
      <FeaturedProperties onPropertyClick={handlePropertyClick} />
      <PropertyCalculator />
      
      {/* Main Content with Sidebar */}
      <section id="properties" className="min-h-screen py-24 md:py-32 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Найдите свой идеальный дом
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Используйте фильтры для поиска недвижимости, соответствующей вашим требованиям
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Filter className="w-5 h-5 text-blue-600" />
                      Фильтры
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Сбросить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Фильтры */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Тип жилья</Label>
                      <Select
                        value={filters.propertyType}
                        onValueChange={(value) => handleFilterChange("propertyType", value)}
                      >
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

                    <div>
                      <Label className="text-sm font-medium">Район</Label>
                      <Select
                        value={filters.district}
                        onValueChange={(value) => handleFilterChange("district", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите район" />
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

                    <div>
                      <Label className="text-sm font-medium">Количество комнат</Label>
                      <Select
                        value={filters.rooms}
                        onValueChange={(value) => handleFilterChange("rooms", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите количество" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Любое</SelectItem>
                          <SelectItem value="1">1 комната</SelectItem>
                          <SelectItem value="2">2 комнаты</SelectItem>
                          <SelectItem value="3">3 комнаты</SelectItem>
                          <SelectItem value="4">4 комнаты</SelectItem>
                          <SelectItem value="5">5+ комнат</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Цена, ₸</Label>
                      <div className="grid grid-cols-2 gap-2">
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

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Площадь: {filters.area[0]} - {filters.area[1]} м²
                      </Label>
                      <Slider
                        value={filters.area}
                        onValueChange={(value) => handleFilterChange("area", value)}
                        min={20}
                        max={500}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Results info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Недвижимость на продажу
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Астана</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {isLoading ? "Загрузка..." : `Найдено ${properties.length} объектов`}
                </div>
              </div>

              {/* Property Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                  ))}
                </div>
              ) : properties.length === 0 ? (
                <div className="text-center py-12">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onPropertyClick={handlePropertyClick}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                      <nav className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Предыдущая
                        </Button>

                        {getVisiblePages().map((page, index) => (
                          <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => typeof page === 'number' && handlePageChange(page)}
                            disabled={typeof page !== 'number'}
                          >
                            {page}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
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
        </div>
      </section>

      {/* Добавляем форму заявки */}
      <ContactForm />

      <PropertyModal
        property={selectedProperty}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      <Footer />
    </div>
  );
}
