import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  Calculator, 
  FileText, 
  Users, 
  Shield, 
  Home,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

interface GuideArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  popular: boolean;
  icon: any;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles: GuideArticle[] = [
    {
      id: 1,
      title: "Как правильно выбрать квартиру для покупки",
      description: "Подробное руководство по выбору недвижимости: от анализа района до проверки документов",
      category: "buying",
      readTime: "8 мин",
      difficulty: "beginner",
      popular: true,
      icon: Home
    },
    {
      id: 2,
      title: "Ипотека в Казахстане: полное руководство 2024",
      description: "Все о получении ипотеки: требования банков, процентные ставки, необходимые документы",
      category: "mortgage",
      readTime: "12 мин",
      difficulty: "intermediate",
      popular: true,
      icon: Calculator
    },
    {
      id: 3,
      title: "Проверка юридической чистоты квартиры",
      description: "Как избежать мошенничества и проверить все документы перед покупкой",
      category: "legal",
      readTime: "6 мин",
      difficulty: "intermediate",
      popular: true,
      icon: Shield
    },
    {
      id: 4,
      title: "Аренда квартиры: права и обязанности сторон",
      description: "Что нужно знать арендаторам и арендодателям о своих правах и обязанностях",
      category: "rental",
      readTime: "10 мин",
      difficulty: "beginner",
      popular: false,
      icon: FileText
    },
    {
      id: 5,
      title: "Инвестиции в недвижимость для начинающих",
      description: "Как начать инвестировать в недвижимость и получать пассивный доход",
      category: "investment",
      readTime: "15 мин",
      difficulty: "intermediate",
      popular: true,
      icon: TrendingUp
    },
    {
      id: 6,
      title: "Оценка стоимости недвижимости",
      description: "Методы оценки квартир и домов, факторы влияющие на цену",
      category: "valuation",
      readTime: "7 мин",
      difficulty: "advanced",
      popular: false,
      icon: Calculator
    },
    {
      id: 7,
      title: "Налоги при покупке и продаже недвижимости",
      description: "Какие налоги нужно платить и как их можно оптимизировать",
      category: "legal",
      readTime: "9 мин",
      difficulty: "advanced",
      popular: false,
      icon: FileText
    },
    {
      id: 8,
      title: "Ремонт и обустройство новой квартиры",
      description: "Планирование ремонта, выбор материалов и подрядчиков",
      category: "renovation",
      readTime: "11 мин",
      difficulty: "beginner",
      popular: true,
      icon: Home
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "Какие документы нужны для покупки квартиры?",
      answer: "Для покупки квартиры вам понадобятся: паспорт, справка о доходах, выписка из банка о наличии средств. Продавец должен предоставить: правоустанавливающие документы, техпаспорт, справку об отсутствии задолженности по коммунальным платежам.",
      category: "buying"
    },
    {
      question: "Сколько составляет первоначальный взнос по ипотеке?",
      answer: "В большинстве банков Казахстана первоначальный взнос составляет от 20% до 30% от стоимости недвижимости. Некоторые банки предлагают программы с первоначальным взносом от 10% для определенных категорий заемщиков.",
      category: "mortgage"
    },
    {
      question: "Как проверить, не находится ли квартира в залоге?",
      answer: "Проверить залоговый статус можно через Единый реестр залогов на сайте Министерства юстиции РК. Также обязательно запросите справку из банка об отсутствии обременений.",
      category: "legal"
    },
    {
      question: "Можно ли расторгнуть договор аренды досрочно?",
      answer: "Да, договор аренды можно расторгнуть досрочно при соблюдении условий, прописанных в договоре. Обычно требуется уведомление за 1 месяц. При нарушении условий одной из сторон договор может быть расторгнут немедленно.",
      category: "rental"
    },
    {
      question: "Какие районы Астаны лучше всего подходят для инвестиций?",
      answer: "Наиболее перспективными для инвестиций считаются: Есильский район (центр), новые микрорайоны на левом берегу, районы возле крупных торговых центров. Важно учитывать развитие инфраструктуры и транспортную доступность.",
      category: "investment"
    },
    {
      question: "Что включается в коммунальные платежи?",
      answer: "В коммунальные платежи обычно входят: отопление, водоснабжение, водоотведение, электроэнергия, газ (если есть), вывоз мусора, содержание общего имущества. Размер платежей зависит от площади квартиры и тарифов в вашем регионе.",
      category: "rental"
    },
    {
      question: "Как рассчитать ежемесячный платеж по ипотеке?",
      answer: "Ежемесячный платеж рассчитывается по формуле аннуитетных платежей и зависит от суммы кредита, процентной ставки и срока кредитования. Большинство банков предоставляют онлайн-калькуляторы для предварительного расчета.",
      category: "mortgage"
    },
    {
      question: "Нужно ли платить комиссию риелтору?",
      answer: "Комиссия риелтора обычно составляет 2-5% от стоимости сделки. Кто платит комиссию (покупатель или продавец) определяется договором. Иногда комиссия делится между сторонами.",
      category: "buying"
    }
  ];

  const categories = [
    { value: "all", label: "Все категории", count: articles.length },
    { value: "buying", label: "Покупка", count: articles.filter(a => a.category === "buying").length },
    { value: "rental", label: "Аренда", count: articles.filter(a => a.category === "rental").length },
    { value: "mortgage", label: "Ипотека", count: articles.filter(a => a.category === "mortgage").length },
    { value: "legal", label: "Юридические вопросы", count: articles.filter(a => a.category === "legal").length },
    { value: "investment", label: "Инвестиции", count: articles.filter(a => a.category === "investment").length }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularArticles = articles.filter(article => article.popular);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case "beginner": return "Начинающий";
      case "intermediate": return "Средний";
      case "advanced": return "Продвинутый";
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-white" />
              <h1 className="text-4xl font-bold text-white">RealГид</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Полное руководство по покупке, аренде и инвестированию в недвижимость. 
              Экспертные советы и ответы на частые вопросы
            </p>
            
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Поиск по статьям и FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Популярные статьи</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.slice(0, 6).map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <article.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <Badge className={getDifficultyColor(article.difficulty)}>
                      {getDifficultyLabel(article.difficulty)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {article.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Читать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col gap-1 ${
                  selectedCategory === category.value 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "hover:border-blue-600 hover:text-blue-600"
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="font-medium">{category.label}</span>
                <span className="text-xs opacity-70">{category.count} статей</span>
              </Button>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Все статьи</h2>
            <div className="text-sm text-gray-600">
              Найдено {filteredArticles.length} статей
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-400 text-lg mb-4">Статьи не найдены</div>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                Показать все статьи
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <article.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getDifficultyColor(article.difficulty)}>
                            {getDifficultyLabel(article.difficulty)}
                          </Badge>
                          {article.popular && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <Star className="h-3 w-3 mr-1" />
                              Популярная
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                          {article.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Читать статью
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Часто задаваемые вопросы</h2>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="px-6">
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Help Section */}
        <section className="bg-blue-50 rounded-2xl p-8 text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Нужна персональная консультация?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Наши эксперты готовы ответить на ваши вопросы и помочь принять правильное решение 
            при покупке или аренде недвижимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Получить консультацию
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Задать вопрос
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}