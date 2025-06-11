import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Clock,
  Eye,
  Share2,
  ChevronRight
} from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishDate: string;
  readTime: string;
  imageUrl: string;
  views: number;
  featured: boolean;
}

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Рынок недвижимости Астаны показал рост на 15% в первом полугодии 2024",
      excerpt: "Эксперты отмечают стабильный рост цен на жилье в столице, особенно в новых районах города.",
      content: "Подробный анализ рынка недвижимости...",
      category: "market",
      publishDate: "2024-06-15",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: "Новый жилой комплекс 'Астана Ривер Парк' открыл продажи",
      excerpt: "Современный ЖК на берегу Есиля предлагает квартиры от 1 до 4 комнат с видом на реку.",
      content: "Подробности о новом жилом комплексе...",
      category: "projects",
      publishDate: "2024-06-12",
      readTime: "3 мин",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 890,
      featured: true
    },
    {
      id: 3,
      title: "Изменения в законодательстве о ипотечном кредитовании",
      excerpt: "Правительство анонсировало новые льготы для молодых семей при покупке первого жилья.",
      content: "Детали изменений в законодательстве...",
      category: "law",
      publishDate: "2024-06-10",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1560,
      featured: false
    },
    {
      id: 4,
      title: "Топ-5 районов Астаны для инвестиций в недвижимость",
      excerpt: "Аналитики выделили наиболее перспективные районы столицы для покупки недвижимости.",
      content: "Обзор районов для инвестиций...",
      category: "analytics",
      publishDate: "2024-06-08",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 2100,
      featured: false
    },
    {
      id: 5,
      title: "Арендный рынок: тенденции и прогнозы на 2024 год",
      excerpt: "Спрос на аренду жилья в Астане продолжает расти, особенно в сегменте 1-2 комнатных квартир.",
      content: "Анализ арендного рынка...",
      category: "market",
      publishDate: "2024-06-05",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 745,
      featured: false
    },
    {
      id: 6,
      title: "Открытие нового торгового центра повлияло на цены в районе",
      excerpt: "Строительство крупного ТРЦ в Есильском районе привело к росту стоимости жилья на 8%.",
      content: "Влияние инфраструктуры на цены...",
      category: "projects",
      publishDate: "2024-06-03",
      readTime: "3 мин",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1120,
      featured: false
    }
  ];

  const categories = [
    { value: "all", label: "Все новости" },
    { value: "market", label: "Рынок" },
    { value: "projects", label: "Новые проекты" },
    { value: "law", label: "Законодательство" },
    { value: "analytics", label: "Аналитика" }
  ];

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryLabel = (category: string) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj ? categoryObj.label : category;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      market: "bg-blue-100 text-blue-800",
      projects: "bg-green-100 text-green-800",
      law: "bg-purple-100 text-purple-800",
      analytics: "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Новости недвижимости
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Актуальные новости рынка недвижимости Казахстана, аналитика 
              и экспертные мнения
            </p>
            
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Поиск новостей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured News */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Главные новости</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <p className="text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(article.publishDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Читать <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All News */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Все новости</h2>
            <div className="text-sm text-gray-600">
              Найдено {filteredArticles.length} новостей
            </div>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Новости не найдены</div>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить параметры поиска или очистить фильтры
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                Очистить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <Badge className={`absolute top-3 left-3 text-xs ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.publishDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-blue-600">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredArticles.length > 0 && (
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button variant="ghost" className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                  Предыдущая
                </Button>
                <Button className="px-3 py-2 text-sm bg-blue-600 text-white">1</Button>
                <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">2</Button>
                <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">3</Button>
                <span className="px-3 py-2 text-sm text-gray-500">...</span>
                <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">8</Button>
                <Button variant="ghost" className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600">
                  Следующая
                </Button>
              </nav>
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Будьте в курсе новостей рынка недвижимости
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Подпишитесь на нашу рассылку и получайте важные новости и аналитику 
            рынка недвижимости прямо на почту
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Ваш email адрес"
              className="flex-1"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Подписаться
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}