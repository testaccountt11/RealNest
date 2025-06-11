import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import PropertyCard from "./property-card";
import SearchFilters from "./search-filters";
import { Button } from "@/components/ui/button";

export default function PropertyListings() {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

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
    setFilters(newFilters);
    setCurrentPage(1);
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
      <section className="pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-12">
            <nav className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                Предыдущая
              </Button>
              
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  className={`px-3 py-2 text-sm ${
                    currentPage === page 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:text-primary"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
              
              <Button
                variant="ghost"
                className="px-3 py-2 text-sm text-gray-700 hover:text-primary"
              >
                25
              </Button>
              
              <Button 
                variant="ghost"
                className="px-3 py-2 text-sm text-gray-700 hover:text-primary"
              >
                Следующая
              </Button>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
