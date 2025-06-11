import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import PropertyCard from "./property-card";
import { Button } from "@/components/ui/button";

export default function FeaturedProperties() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Рекомендуемые объекты</h2>
            <p className="text-lg text-gray-600">Лучшие предложения, отобранные нашими экспертами</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Рекомендуемые объекты</h2>
          <p className="text-lg text-gray-600">Лучшие предложения, отобранные нашими экспертами</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} featured />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3">
            Посмотреть все объекты
          </Button>
        </div>
      </div>
    </section>
  );
}
