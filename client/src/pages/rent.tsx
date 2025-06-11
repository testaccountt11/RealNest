import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import Header from "@/components/header";
import PropertyCard from "@/components/property-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, MapPin, Search } from "lucide-react";

export default function Rent() {
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
      return response.json();
    },
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
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
  };

  const rentalProperties = properties.filter(property => property.type === "rent");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Аренда недвижимости в Астане
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Найдите идеальное жилье для аренды по доступным ценам
            </p>
            
            {/* Quick Search */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Поиск по адресу или району"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Тип жилья" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Любой тип</SelectItem>
                      <SelectItem value="apartment">Квартира</SelectItem>
                      <SelectItem value="house">Дом</SelectItem>
                      <SelectItem value="studio">Студия</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                    Найти
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
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
                  <Label className="text-sm font-medium mb-3 block">Цена за месяц</Label>
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
                  <Label className="text-sm font-medium mb-3 block">Тип недвижимости</Label>
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
                  <Label className="text-sm font-medium mb-3 block">Количество комнат</Label>
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
                  <Label className="text-sm font-medium mb-3 block">Район</Label>
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
                  <Label className="text-sm font-medium mb-3 block">
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
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Аренда недвижимости</h2>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Астана</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {isLoading ? "Загрузка..." : `Найдено ${rentalProperties.length} объектов`}
              </div>
            </div>

            {/* Property Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
                ))}
              </div>
            ) : rentalProperties.length === 0 ? (
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
                  {rentalProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center mt-12">
                  <nav className="flex items-center space-x-2">
                    <Button variant="ghost" className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                      Предыдущая
                    </Button>
                    <Button className="px-3 py-2 text-sm bg-blue-600 text-white">1</Button>
                    <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">2</Button>
                    <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">3</Button>
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                    <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">10</Button>
                    <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                      Следующая
                    </Button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}