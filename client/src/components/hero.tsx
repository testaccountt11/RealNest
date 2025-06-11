import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Hero() {
  return (
    <section className="gradient-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Найдите идеальное жилье</h1>
          <p className="text-xl text-blue-100 mb-8">Более 50,000 объектов недвижимости для аренды и покупки</p>
          
          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Тип сделки</Label>
                <Select defaultValue="buy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Купить</SelectItem>
                    <SelectItem value="rent">Арендовать</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Тип жилья</Label>
                <Select defaultValue="apartment">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="house">Дом</SelectItem>
                    <SelectItem value="studio">Студия</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Город</Label>
                <Input type="text" placeholder="Астана" />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Цена</Label>
                <Input type="text" placeholder="От - До" />
              </div>
            </div>
            <Button className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90">
              Найти жилье
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
