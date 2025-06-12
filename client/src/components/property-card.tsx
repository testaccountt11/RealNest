import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
  onPropertyClick?: (property: Property) => void;
}

export default function PropertyCard({ property, featured = false, onPropertyClick }: PropertyCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return `${price.toLocaleString()} ${currency}`;
  };

  const getTypeLabel = (type: string) => {
    return type === "sale" ? "Продажа" : "Аренда";
  };

  const getTypeColor = (type: string) => {
    return type === "sale" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  const getRoomsText = (rooms: number, propertyType: string) => {
    if (propertyType === "studio") return "Студия";
    return `${rooms} комнат${rooms === 1 ? "а" : rooms < 5 ? "ы" : ""}`;
  };

  const cardClasses = featured 
    ? "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    : "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300";

  const imageHeight = featured ? "h-48" : "h-40";
  const padding = featured ? "p-6" : "p-4";

  return (
    <div className={cardClasses} onClick={() => onPropertyClick?.(property)} style={{ cursor: onPropertyClick ? 'pointer' : 'default' }}>
      <img 
        src={property.imageUrl} 
        alt={property.title}
        className={`w-full ${imageHeight} object-cover`}
      />
      <div className={padding}>
        <div className="flex items-center justify-between mb-2">
          <Badge className={`text-xs font-medium px-2.5 py-0.5 ${getTypeColor(property.type)}`}>
            {getTypeLabel(property.type)}
          </Badge>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 h-auto p-1">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        
        <h3 className={`font-semibold text-gray-900 mb-1 ${featured ? "text-lg" : "text-sm"}`}>
          {property.title}
        </h3>
        
        <p className={`text-gray-600 mb-3 ${featured ? "text-sm" : "text-xs"}`}>
          {property.address}, {property.district}
        </p>
        
        {featured ? (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>{property.area} м²</span>
            <span className="mx-2">•</span>
            <span>{getRoomsText(property.rooms, property.propertyType)}</span>
            {property.floor && property.totalFloors && (
              <>
                <span className="mx-2">•</span>
                <span>{property.floor}/{property.totalFloors} этаж</span>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            {property.floor && property.totalFloors && (
              <>
                <span>{property.floor}/{property.totalFloors} этаж</span>
                <span className="mx-1">•</span>
              </>
            )}
            <span>{property.area} м²</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-bold text-gray-900 ${featured ? "text-2xl" : "text-lg"}`}>
              {formatPrice(property.price, property.currency)}
            </span>
          </div>
          {featured && (
            <Button variant="link" className="text-primary hover:text-primary/80 p-0" onClick={(e) => {
              e.stopPropagation();
              onPropertyClick?.(property);
            }}>
              Подробнее
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
