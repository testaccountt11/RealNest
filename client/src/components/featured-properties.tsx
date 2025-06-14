import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import PropertyCard from "./property-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

interface FeaturedPropertiesProps {
  onPropertyClick?: (property: Property) => void;
}

async function fetchFeaturedProperties(): Promise<Property[]> {
  const response = await fetch('/api/properties/featured');
  if (!response.ok) {
    throw new Error('Failed to fetch featured properties');
  }
  return response.json();
}

export default function FeaturedProperties({ onPropertyClick }: FeaturedPropertiesProps) {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
    queryFn: fetchFeaturedProperties,
  });

  if (isLoading) {
    return (
      <section className="min-h-screen py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-bold text-gray-800">Рекомендуемые объекты</h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span className="text-lg">Астана</span>
              </div>
            </div>
            <div className="text-base text-gray-600">
              Загрузка...
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-[420px]"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-bold text-gray-800">Рекомендуемые объекты</h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">Астана</span>
            </div>
          </div>
          <div className="text-base text-gray-600">
            {`Найдено ${properties?.length || 0} объектов`}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {properties?.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="transform transition-all duration-300"
            >
              <PropertyCard property={property} featured onPropertyClick={onPropertyClick} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="px-10 py-7 text-lg rounded-xl border-2 hover:bg-gray-50 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 group"
            onClick={() => {
              const section = document.getElementById('properties');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Посмотреть все объекты
            <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
