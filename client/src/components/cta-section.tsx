import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="w-full min-h-screen flex items-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-24 md:py-32 w-full">
        <Card className="bg-white shadow-lg">
          <div className="grid lg:grid-cols-2 gap-8 p-8 md:p-12 items-center">
            {/* Левая колонка с текстом */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Готовы найти дом своей мечты?
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                Наши эксперты помогут подобрать идеальный вариант под ваши требования и бюджет. 
                Оставьте заявку или свяжитесь с нами любым удобным способом.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Посмотреть все объекты
                </Button>
              </div>
            </div>

            {/* Правая колонка с контактами */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-6 bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Телефон</h3>
                      <p className="text-slate-600 mb-2">Ежедневно с 9:00 до 20:00</p>
                      <a href="tel:+77000000000" className="text-blue-600 hover:text-blue-700 font-medium">
                        +7 (700) 000-00-00
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                      <p className="text-slate-600 mb-2">Ответим в течение часа</p>
                      <a href="mailto:info@realnest.kz" className="text-blue-600 hover:text-blue-700 font-medium">
                        info@realnest.kz
                      </a>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm text-slate-500">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
} 