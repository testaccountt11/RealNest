import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Property } from "@shared/schema";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Ruler, 
  Bed, 
  Building, 
  Calendar,
  Phone,
  Mail,
  User,
  Star,
  Camera,
  Car,
  Wifi,
  Thermometer,
  Shield,
  CheckCircle,
  X
} from "lucide-react";

interface PropertyModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyModal({ property, open, onOpenChange }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!property) return null;

  // Mock additional images for the gallery
  const images = [
    property.imageUrl,
    "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
  ];

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

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Недавно";
    const d = new Date(date);
    return d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const features = [
    "Встроенная кухня",
    "Балкон",
    "Парковочное место",
    "Интернет",
    "Кондиционер",
    "Охрана"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Image Gallery */}
          <div className="relative">
            <img 
              src={images[currentImageIndex]}
              alt={property.title}
              className="w-full h-80 object-cover"
            />
            
            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
              <Camera className="h-4 w-4" />
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                >
                  ←
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                >
                  →
                </Button>
              </>
            )}

            {/* Thumbnail navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <DialogHeader className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${getTypeColor(property.type)}`}>
                      {getTypeLabel(property.type)}
                    </Badge>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(property.publishedAt)}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </DialogTitle>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.address}, {property.district}, {property.city}
                  </div>
                  <div className="text-3xl font-bold text-primary mb-4">
                    {formatPrice(property.price, property.currency)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Key Details */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-4">Основные характеристики</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Ruler className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                        <div className="font-semibold">{property.area} м²</div>
                        <div className="text-sm text-gray-500">Площадь</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                        <div className="font-semibold">{getRoomsText(property.rooms, property.propertyType)}</div>
                        <div className="text-sm text-gray-500">Комнаты</div>
                      </div>
                      {property.floor && property.totalFloors && (
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Building className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                          <div className="font-semibold">{property.floor}/{property.totalFloors}</div>
                          <div className="text-sm text-gray-500">Этаж</div>
                        </div>
                      )}
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Star className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                        <div className="font-semibold">4.8</div>
                        <div className="text-sm text-gray-500">Рейтинг</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Описание</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {property.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-4">
                      Прекрасная квартира в центре города с современным ремонтом. 
                      Рядом развитая инфраструктура: школы, детские сады, магазины, 
                      остановки общественного транспорта. Тихий двор, консьерж, 
                      парковочные места.
                    </p>
                  </CardContent>
                </Card>

                {/* Features */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-4">Удобства</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Contact Card */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Агент по недвижимости</div>
                        <div className="text-sm text-gray-500">Александр Иванов</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Phone className="h-4 w-4 mr-2" />
                        Позвонить
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Написать
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Показов сегодня</div>
                      <div className="font-semibold">12</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Info */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Дополнительно</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">ID объявления:</span>
                        <span>#{property.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Тип недвижимости:</span>
                        <span>
                          {property.propertyType === "apartment" && "Квартира"}
                          {property.propertyType === "house" && "Дом"}
                          {property.propertyType === "studio" && "Студия"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Состояние:</span>
                        <span>Хорошее</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="font-semibold text-sm">Безопасная сделка</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Документы проверены. Сделка проходит через эскроу-счет для вашей безопасности.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}