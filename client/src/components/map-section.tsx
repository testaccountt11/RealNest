import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { List, Map as MapIcon, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { YMaps, Map, Placemark, ZoomControl, SearchControl } from "@pbe/react-yandex-maps";

// Примеры объектов недвижимости
const SAMPLE_PROPERTIES = [
  {
    id: 1,
    price: 35500000,
    rooms: 2,
    area: 65,
    complex: "ЖК Премиум 7",
    coordinates: [51.169392, 71.449074],
    type: "Квартира",
    floor: 5,
    totalFloors: 12,
    images: [
      "/images/properties/property1-1.jpg",
      "/images/properties/property1-2.jpg",
      "/images/properties/property1-3.jpg"
    ]
  },
  {
    id: 2,
    price: 42800000,
    rooms: 3,
    area: 85,
    complex: "ЖК Премиум 12",
    coordinates: [51.166592, 71.428074],
    type: "Квартира",
    floor: 8,
    totalFloors: 16,
    images: [
      "/images/properties/property2-1.jpg",
      "/images/properties/property2-2.jpg",
      "/images/properties/property2-3.jpg"
    ]
  },
  {
    id: 3,
    price: 28300000,
    rooms: 1,
    area: 45,
    complex: "ЖК Премиум 15",
    coordinates: [51.163792, 71.447074],
    type: "Студия",
    floor: 3,
    totalFloors: 9,
    images: [
      "/images/properties/property3-1.jpg",
      "/images/properties/property3-2.jpg",
      "/images/properties/property3-3.jpg"
    ]
  },
  {
    id: 4,
    price: 51200000,
    rooms: 3,
    area: 95,
    complex: "ЖК Премиум 9",
    coordinates: [51.167992, 71.438074],
    type: "Квартира",
    floor: 12,
    totalFloors: 20,
    images: [
      "/images/properties/property4-1.jpg",
      "/images/properties/property4-2.jpg",
      "/images/properties/property4-3.jpg"
    ]
  },
  {
    id: 5,
    price: 31900000,
    rooms: 2,
    area: 58,
    complex: "ЖК Премиум 3",
    coordinates: [51.165192, 71.443074],
    type: "Квартира",
    floor: 4,
    totalFloors: 14,
    images: [
      "/images/properties/property5-1.jpg",
      "/images/properties/property5-2.jpg",
      "/images/properties/property5-3.jpg"
    ]
  }
];

// Временные изображения для демонстрации
const PLACEHOLDER_IMAGES = {
  property1: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60"
  ],
  property2: [
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60"
  ],
  property3: [
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60"
  ],
  property4: [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60"
  ],
  property5: [
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60"
  ]
};

const formatPrice = (price: number) => {
  return (price / 1000000).toFixed(1) + " млн ₸";
};

interface Filters {
  priceRange: [number, number];
  rooms: string;
  type: string;
  search: string;
}

interface ImageGalleryProps {
  images: string[];
  propertyId: number;
}

function ImageGallery({ images, propertyId }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const placeholderImages = PLACEHOLDER_IMAGES[`property${propertyId}` as keyof typeof PLACEHOLDER_IMAGES];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % placeholderImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + placeholderImages.length) % placeholderImages.length);
  };

  return (
    <div className="relative group w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
      <img
        src={placeholderImages[currentImageIndex]}
        alt={`Фото ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
      />
      
      {placeholderImages.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {placeholderImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      <div className="absolute top-1 right-1 text-xs bg-black/50 text-white px-1.5 py-0.5 rounded-full flex items-center gap-1">
        <ImageIcon className="w-3 h-3" />
        <span>{currentImageIndex + 1}/{placeholderImages.length}</span>
      </div>
    </div>
  );
}

export function MapSection() {
  const [isMapView, setIsMapView] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [20000000, 60000000],
    rooms: "all",
    type: "all",
    search: ""
  });

  const mapState = {
    center: [51.166592, 71.438074],
    zoom: 13,
    controls: []
  };

  const handlePriceChange = useCallback((value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  }, []);

  const filteredProperties = SAMPLE_PROPERTIES.filter(property => {
    const matchesPrice = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
    const matchesRooms = filters.rooms === "all" || property.rooms.toString() === filters.rooms;
    const matchesType = filters.type === "all" || property.type === filters.type;
    const matchesSearch = property.complex.toLowerCase().includes(filters.search.toLowerCase()) ||
                         property.type.toLowerCase().includes(filters.search.toLowerCase());
    return matchesPrice && matchesRooms && matchesType && matchesSearch;
  });

  return (
    <section className="w-full bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок и контролы */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Недвижимость на карте
            </h2>
            <div className="flex items-center gap-2">
              {/* <Button
                variant={!isMapView ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsMapView(false)}
              > */}
                {/* <List className="h-4 w-4" /> */}
                {/* <span className="hidden sm:inline">Список</span> */}
              {/* </Button> */}
              {/* <Button
                variant={isMapView ? "secondary" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsMapView(true)}
              >
                <MapIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Карта</span>
              </Button> */}
            </div>
          </div>

          {/* Поиск и фильтры */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Поиск по названию ЖК..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              {filters.search && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setFilters(prev => ({ ...prev, search: "" }))}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Фильтры
            </Button>
          </div>

          {/* Панель фильтров */}
          {showFilters && (
            <Card className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white/90 backdrop-blur-sm">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Цена</label>
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={60000000}
                    min={20000000}
                    step={1000000}
                    onValueChange={handlePriceChange}
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Комнаты</label>
                <Select
                  value={filters.rooms}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, rooms: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите количество комнат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="1">1 комната</SelectItem>
                    <SelectItem value="2">2 комнаты</SelectItem>
                    <SelectItem value="3">3 комнаты</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Тип жилья</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип жилья" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="Квартира">Квартира</SelectItem>
                    <SelectItem value="Студия">Студия</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({
                    priceRange: [20000000, 60000000],
                    rooms: "all",
                    type: "all",
                    search: ""
                  })}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Карточка с картой */}
        <Card className="w-full overflow-hidden bg-white/90 backdrop-blur-sm">
          <div className="grid lg:grid-cols-[1fr,400px] h-[600px]">
            {/* Карта */}
            <div className="relative h-full">
              <YMaps>
                <Map
                  defaultState={mapState}
                  width="100%"
                  height="100%"
                  options={{
                    suppressMapOpenBlock: true
                  }}
                >
                  <ZoomControl options={{ position: { right: 10, top: 10 } }} />
                  <SearchControl options={{ position: { right: 10, top: 50 } }} />
                  {filteredProperties.map((property) => (
                    <Placemark
                      key={property.id}
                      geometry={property.coordinates}
                      options={{
                        preset: selectedProperty === property.id ? 
                          'islands#blueCircleDotIconWithCaption' : 
                          'islands#blueCircleDotIcon',
                        iconColor: selectedProperty === property.id ? '#3B82F6' : '#64748B'
                      }}
                      properties={{
                        iconCaption: formatPrice(property.price)
                      }}
                      onClick={() => setSelectedProperty(property.id)}
                    />
                  ))}
                </Map>
              </YMaps>
            </div>

            {/* Список объектов */}
            <div className="hidden lg:block border-l border-slate-100">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-medium text-slate-800">
                  Найдено {filteredProperties.length} {filteredProperties.length === 1 ? 'объект' : 
                    filteredProperties.length > 1 && filteredProperties.length < 5 ? 'объекта' : 'объектов'}
                </h3>
              </div>
              <div className="overflow-auto h-[calc(600px-56px)]">
                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer ${
                      selectedProperty === property.id ? 'bg-blue-50' : ''
                    }`}
                    onMouseEnter={() => setSelectedProperty(property.id)}
                    onMouseLeave={() => setSelectedProperty(null)}
                  >
                    <div className="flex gap-4">
                      <ImageGallery images={property.images} propertyId={property.id} />
                      <div>
                        <p className="font-medium text-slate-800 mb-1">
                          {formatPrice(property.price)}
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {property.type}, {property.rooms}-комн., {property.area} м²
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {property.floor}/{property.totalFloors} этаж
                        </p>
                        <p className="text-sm text-slate-500">
                          {property.complex}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
} 