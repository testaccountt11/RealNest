import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import PropertyCard from "./property-card";
import SearchFilters from "./search-filters";
import { Button } from "@/components/ui/button";

interface PropertyListingsProps {
  onPropertyClick?: (property: Property) => void;
}

export default function PropertyListings({ onPropertyClick }: PropertyListingsProps) {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Обработчик фильтров из Hero секции
  useEffect(() => {
    const handleHeroFilters = (event: CustomEvent<any>) => {
      const heroFilters = event.detail;
      setFilters(prevFilters => ({
        ...prevFilters,
        ...heroFilters
      }));
      setCurrentPage(1);
    };

    window.addEventListener("updateFilters", handleHeroFilters as EventListener);
    
    // Проверяем URL при монтировании компонента
    const params = new URLSearchParams(window.location.search);
    const urlFilters: any = {};
    
    const type = params.get("type");
    if (type) urlFilters.type = type;
    
    const propertyType = params.get("propertyType");
    if (propertyType) urlFilters.propertyType = propertyType;
    
    const minPrice = params.get("minPrice");
    if (minPrice) urlFilters.minPrice = Number(minPrice);
    
    const maxPrice = params.get("maxPrice");
    if (maxPrice) urlFilters.maxPrice = Number(maxPrice);
    
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }

    return () => {
      window.removeEventListener("updateFilters", handleHeroFilters as EventListener);
    };
  }, []);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
      
      const response = await fetch(`/api/properties?${params}`);
      if (!response.ok) throw new Error("Failed to fetch properties");
      return response.json();
    },
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
    setCurrentPage(1);
  };

  // Вычисляем общее количество страниц
  const itemsPerPage = 12;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Получаем объекты для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = properties.slice(startIndex, endIndex);

  // Генерируем массив номеров страниц для пагинации
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <>
        <SearchFilters onFiltersChange={handleFiltersChange} totalResults={0} />
        <section className="pb-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SearchFilters onFiltersChange={handleFiltersChange} totalResults={properties.length} />
      <section id="properties" className="pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onPropertyClick={onPropertyClick} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  Предыдущая
                </Button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      className={`px-3 py-2 text-sm ${
                        currentPage === page 
                          ? "bg-primary text-white" 
                          : "text-gray-700 hover:text-primary"
                      }`}
                      onClick={() => setCurrentPage(page as number)}
                    >
                      {page}
                    </Button>
                  )
                ))}
                
                <Button 
                  variant="ghost"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-primary disabled:opacity-50"
                >
                  Следующая
                </Button>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
