import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Home, TrendingUp, MapPin } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Стили для удаления outline при всех взаимодействиях
const noOutlineStyle = "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 outline-none ring-0 ring-offset-0 hover:ring-0 hover:ring-offset-0 active:ring-0 active:ring-offset-0";

// Стили для SelectContent
const selectContentStyle = "[&>div]:focus:ring-0 [&>div]:focus:outline-none [&>div]:outline-none [&>div]:ring-0";

export default function PropertyCalculator() {
  const [propertyType, setPropertyType] = useState("apartment");
  const [area, setArea] = useState(60);
  const [rooms, setRooms] = useState(2);
  const [district, setDistrict] = useState("Есиль");
  const [condition, setCondition] = useState("good");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Базовые цены за квадратный метр по типам недвижимости
  const basePrices = {
    apartment: 450000, // тенге за м²
    house: 400000,
    studio: 500000
  };

  // Коэффициенты по районам
  const districtMultipliers = {
    "Есиль": 1.3,
    "Алматы": 1.1,
    "Сарыарка": 0.9,
    "Байконур": 0.85
  };

  // Коэффициенты по состоянию
  const conditionMultipliers = {
    "excellent": 1.2, // Отличное
    "good": 1.0, // Хорошее
    "average": 0.8, // Среднее
    "poor": 0.6 // Требует ремонта
  };

  const calculatePrice = () => {
    const basePrice = basePrices[propertyType as keyof typeof basePrices];
    const districtMultiplier = districtMultipliers[district as keyof typeof districtMultipliers];
    const conditionMultiplier = conditionMultipliers[condition as keyof typeof conditionMultipliers];
    
    // Коэффициент за количество комнат (небольшая премия за оптимальное количество комнат)
    const roomsMultiplier = rooms === 2 || rooms === 3 ? 1.05 : 1;
    
    const price = basePrice * area * districtMultiplier * conditionMultiplier * roomsMultiplier;
    setEstimatedPrice(Math.round(price));
  };

  // Пересчитываем цену при изменении любого параметра
  useEffect(() => {
    calculatePrice();
  }, [propertyType, area, rooms, district, condition]);

  return (
    <section id="calculator" className="min-h-screen py-24 md:py-32 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-4">
            Калькулятор стоимости недвижимости
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Узнайте примерную стоимость недвижимости на основе текущих рыночных цен
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Калькулятор */}
          <div className="w-full">
            <Card className="shadow-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Параметры расчета
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Тип недвижимости */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Тип недвижимости</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className={noOutlineStyle}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyle}>
                      <SelectItem value="apartment" className={noOutlineStyle}>Квартира</SelectItem>
                      <SelectItem value="house" className={noOutlineStyle}>Дом</SelectItem>
                      <SelectItem value="studio" className={noOutlineStyle}>Студия</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Площадь */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Площадь: {area} м²</Label>
                  <Slider
                    value={[area]}
                    onValueChange={(value) => setArea(value[0])}
                    min={20}
                    max={300}
                    step={1}
                    className={`w-full ${noOutlineStyle}`}
                  />
                </div>

                {/* Количество комнат */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Количество комнат</Label>
                  <Select value={rooms.toString()} onValueChange={(value) => setRooms(Number(value))}>
                    <SelectTrigger className={noOutlineStyle}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyle}>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()} className={noOutlineStyle}>
                          {num} {num === 1 ? "комната" : num < 5 ? "комнаты" : "комнат"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Район */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Район</Label>
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className={noOutlineStyle}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyle}>
                      <SelectItem value="Есиль" className={noOutlineStyle}>Есиль</SelectItem>
                      <SelectItem value="Алматы" className={noOutlineStyle}>Алматы</SelectItem>
                      <SelectItem value="Сарыарка" className={noOutlineStyle}>Сарыарка</SelectItem>
                      <SelectItem value="Байконур" className={noOutlineStyle}>Байконур</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Состояние */}
                <div className="space-y-1.5">
                  <Label className="text-sm">Состояние</Label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className={noOutlineStyle}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyle}>
                      <SelectItem value="excellent" className={noOutlineStyle}>Отличное</SelectItem>
                      <SelectItem value="good" className={noOutlineStyle}>Хорошее</SelectItem>
                      <SelectItem value="average" className={noOutlineStyle}>Среднее</SelectItem>
                      <SelectItem value="poor" className={noOutlineStyle}>Требует ремонта</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Результат */}
          <div className="w-full">
            <Card className="shadow-sm h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Результат оценки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {estimatedPrice ? `${(estimatedPrice / 1000000).toFixed(1)} млн ₸` : "—"}
                  </div>
                  <p className="text-gray-600 text-sm">Примерная рыночная стоимость</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-sm">Тип</span>
                    </div>
                    <span className="font-medium text-sm">
                      {propertyType === "apartment" && "Квартира"}
                      {propertyType === "house" && "Дом"}
                      {propertyType === "studio" && "Студия"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-sm">Район</span>
                    </div>
                    <span className="font-medium text-sm">{district}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600 text-sm">Цена за м²</span>
                    </div>
                    <span className="font-medium text-sm">
                      {estimatedPrice ? `${Math.round(estimatedPrice / area).toLocaleString()} ₸` : "—"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600">
                    * Расчет приблизительный и основан на средних рыночных ценах. 
                    Для точной оценки рекомендуем обратиться к нашим специалистам.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 