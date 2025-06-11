import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  totalResults: number;
}

export default function SearchFilters({ onFiltersChange, totalResults }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    district: "",
    rooms: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    sortBy: "relevance"
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    const apiFilters: any = {};
    
    if (filters.district && filters.district !== "all") apiFilters.district = filters.district;
    if (filters.rooms && filters.rooms !== "any") apiFilters.rooms = Number(filters.rooms);
    if (filters.minPrice) apiFilters.minPrice = Number(filters.minPrice);
    if (filters.maxPrice) apiFilters.maxPrice = Number(filters.maxPrice);
    if (filters.propertyType && filters.propertyType !== "any") apiFilters.propertyType = filters.propertyType;
    
    onFiltersChange(apiFilters);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Все объекты</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Найдено {totalResults?.toLocaleString() || 0} объектов
              </span>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">По релевантности</SelectItem>
                  <SelectItem value="price_asc">По цене: возрастанию</SelectItem>
                  <SelectItem value="price_desc">По цене: убыванию</SelectItem>
                  <SelectItem value="date">По дате</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <Select value={filters.district} onValueChange={(value) => handleFilterChange("district", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все районы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все районы</SelectItem>
                <SelectItem value="Есиль">Есиль</SelectItem>
                <SelectItem value="Сарыарка">Сарыарка</SelectItem>
                <SelectItem value="Алматы">Алматы</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.rooms} onValueChange={(value) => handleFilterChange("rooms", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Комнаты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Любое количество</SelectItem>
                <SelectItem value="0">Студия</SelectItem>
                <SelectItem value="1">1 комната</SelectItem>
                <SelectItem value="2">2 комнаты</SelectItem>
                <SelectItem value="3">3+ комнат</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Цена от"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />

            <Input
              type="text"
              placeholder="Цена до"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />

            <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange("propertyType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Тип дома" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Любой тип</SelectItem>
                <SelectItem value="apartment">Квартира</SelectItem>
                <SelectItem value="house">Дом</SelectItem>
                <SelectItem value="studio">Студия</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleApplyFilters} className="bg-primary text-white hover:bg-primary/90">
              Применить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
