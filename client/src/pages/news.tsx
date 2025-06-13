import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  ChevronRight,
  Newspaper,
  Sparkles,
  Book,
  ArrowLeft,
  Lightbulb
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
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      title: "Рынок недвижимости Астаны показал рост на 15% в первом полугодии 2025",
      excerpt: "Эксперты отмечают стабильный рост цен на жилье в столице, особенно в новых районах города.",
      content: `Согласно последним исследованиям рынка недвижимости, в первом полугодии 2025 года наблюдается значительный рост цен на жилую недвижимость в Астане. Аналитики отмечают несколько ключевых факторов:

1. Увеличение спроса на новое жилье
- Рост числа молодых семей
- Миграция из других регионов
- Инвестиционная привлекательность

2. Развитие инфраструктуры
- Строительство новых транспортных развязок
- Открытие торговых и развлекательных центров
- Благоустройство общественных пространств

3. Государственные программы
- Льготное кредитование
- Субсидии для определенных категорий граждан
- Поддержка строительной отрасли

Эксперты прогнозируют сохранение положительной динамики до конца 2025 года, особенно в сегменте жилья комфорт-класса.`,
      category: "market",
      publishDate: "2025-06-15",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: "Новый жилой комплекс 'Астана Ривер Парк' открыл продажи",
      excerpt: "Современный ЖК на берегу Есиля предлагает квартиры от 1 до 4 комнат с видом на реку.",
      content: `Жилой комплекс "Астана Ривер Парк" - новый проект премиум-класса, расположенный в престижном районе столицы. Особенности комплекса:

1. Расположение и инфраструктура
- Первая линия у реки Есиль
- Собственная набережная
- Подземный паркинг
- Закрытая территория

2. Планировочные решения
- Квартиры от 45 до 150 кв.м
- Панорамное остекление
- Высокие потолки (3.3 м)
- Свободная планировка

3. Технологии и комфорт
- Умный дом
- Центральное кондиционирование
- Фильтрация воды
- Бесшумные лифты

Начало строительства - июль 2025, завершение - декабрь 2027.`,
      category: "projects",
      publishDate: "2025-06-12",
      readTime: "3 мин",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 890,
      featured: true
    },
    {
      id: 3,
      title: "Изменения в законодательстве о ипотечном кредитовании",
      excerpt: "Правительство анонсировало новые льготы для молодых семей при покупке первого жилья.",
      content: `В рамках государственной программы поддержки молодых семей внесены важные изменения в законодательство об ипотечном кредитовании. Рассмотрим основные нововведения:

1. Расширение программы льготной ипотеки
- Снижение первоначального взноса до 10%
- Увеличение максимальной суммы кредита
- Специальные условия для семей с детьми
- Дополнительные субсидии от государства

2. Упрощение процедуры оформления
- Цифровизация процесса подачи документов
- Сокращение сроков рассмотрения заявок
- Единое окно для всех государственных программ
- Онлайн-мониторинг статуса заявки

3. Новые финансовые инструменты
- Возможность комбинирования разных программ
- Гибкие условия погашения кредита
- Защита от колебаний процентной ставки
- Специальные условия страхования

Эксперты отмечают, что новые меры поддержки сделают жилье более доступным для молодых семей и повысят спрос на первичном рынке недвижимости.`,
      category: "law",
      publishDate: "2025-06-10",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1560,
      featured: false
    },
    {
      id: 4,
      title: "Топ-5 районов Астаны для инвестиций в недвижимость",
      excerpt: "Аналитики выделили наиболее перспективные районы столицы для покупки недвижимости.",
      content: `На основе комплексного анализа рынка недвижимости Астаны, эксперты определили самые перспективные районы для инвестиций в 2025 году:

1. Есильский район
- Активное развитие инфраструктуры
- Близость к деловому центру
- Высокий потенциал роста стоимости
- Качественные проекты от надежных застройщиков

2. Район EXPO
- Современная архитектура
- Развитая транспортная система
- Наличие международных компаний
- Высокий спрос на аренду

3. Левобережный деловой район
- Престижное расположение
- Концентрация бизнес-центров
- Премиальные жилые комплексы
- Стабильный рост цен

4. Район нового вокзала
- Перспективы развития
- Доступные цены
- Хорошая транспортная доступность
- Потенциал для редевелопмента

5. Зеленый квартал
- Экологичность
- Современные технологии строительства
- Комплексная застройка
- Высокое качество жизни

Каждый из этих районов имеет свои уникальные преимущества и потенциал для роста стоимости недвижимости в ближайшие годы.`,
      category: "analytics",
      publishDate: "2025-06-08",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 2100,
      featured: false
    },
    {
      id: 5,
      title: "Арендный рынок: тенденции и прогнозы на 2025 год",
      excerpt: "Спрос на аренду жилья в Астане продолжает расти, особенно в сегменте 1-2 комнатных квартир.",
      content: `Анализ арендного рынка недвижимости Астаны показывает значительные изменения в 2025 году. Рассмотрим основные тенденции:

1. Изменение структуры спроса
- Повышенный интерес к малогабаритным квартирам
- Рост популярности меблированного жилья
- Увеличение срока аренды
- Спрос на квартиры с хорошей инфраструктурой

2. Ценовая динамика
- Рост ставок в центральных районах
- Стабилизация цен на окраинах
- Сезонные колебания
- Влияние новых ЖК на рынок

3. Новые форматы аренды
- Развитие сервисных апартаментов
- Появление коливингов
- Профессиональное управление арендным жильем
- Цифровизация арендных отношений

Эксперты прогнозируют дальнейший рост арендных ставок и профессионализацию рынка аренды жилья.`,
      category: "market",
      publishDate: "2025-06-05",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 745,
      featured: false
    },
    {
      id: 6,
      title: "Открытие нового торгового центра повлияло на цены в районе",
      excerpt: "Строительство крупного ТРЦ в Есильском районе привело к росту стоимости жилья на 8%.",
      content: `Открытие нового торгово-развлекательного центра оказало существенное влияние на рынок недвижимости прилегающего района:

1. Влияние на инфраструктуру
- Улучшение транспортной доступности
- Создание новых рабочих мест
- Развитие сопутствующего бизнеса
- Благоустройство территории

2. Изменение цен на недвижимость
- Рост стоимости квартир в радиусе 1 км
- Увеличение арендных ставок
- Повышение ликвидности жилья
- Сокращение сроков продажи

3. Перспективы развития района
- Планы по строительству новых ЖК
- Развитие социальной инфраструктуры
- Создание общественных пространств
- Повышение привлекательности района

Эксперты отмечают, что подобные крупные инфраструктурные проекты продолжат оказывать положительное влияние на развитие прилегающих территорий.`,
      category: "projects",
      publishDate: "2025-06-03",
      readTime: "3 мин",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1120,
      featured: false
    },
    {
      id: 7,
      title: "Новые технологии строительства: что применяют в Астане",
      excerpt: "Застройщики внедряют инновационные методы строительства для повышения качества и скорости работ.",
      content: `В строительной отрасли Астаны активно внедряются современные технологии, которые меняют подход к возведению зданий:

1. Инновационные материалы
- Энергоэффективные стеновые панели
- Современные теплоизоляционные материалы
- Экологичные отделочные материалы
- Долговечные композитные материалы

2. Цифровые технологии
- BIM-моделирование
- Автоматизация процессов
- Дроны для мониторинга
- Умные системы управления строительством

3. Экологические решения
- Солнечные панели
- Системы сбора дождевой воды
- Зеленые крыши
- Энергоэффективное остекление

Применение новых технологий позволяет существенно повысить качество строительства и снизить эксплуатационные расходы будущих жильцов.`,
      category: "projects",
      publishDate: "2025-06-01",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 980,
      featured: false
    },
    {
      id: 8,
      title: "Умные дома: новый стандарт жилья в Астане",
      excerpt: "Все больше новостроек оснащаются системами умного дома уже на этапе строительства.",
      content: `Современные жилые комплексы Астаны все чаще включают системы умного дома в базовую комплектацию. Рассмотрим основные тенденции:

1. Базовые функции умного дома
- Удаленное управление освещением
- Климат-контроль
- Системы безопасности
- Контроль протечек

2. Интеграция с инфраструктурой ЖК
- Умный доступ в подъезд
- Управление парковкой
- Мониторинг общественных зон
- Связь с управляющей компанией

3. Дополнительные возможности
- Голосовое управление
- Сценарии автоматизации
- Энергоэффективные режимы
- Интеграция с бытовой техникой

Эксперты прогнозируют, что к концу 2025 года более 60% новых жилых комплексов будут оснащены базовыми функциями умного дома.`,
      category: "projects",
      publishDate: "2025-05-30",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1340,
      featured: false
    },
    {
      id: 9,
      title: "Эко-тренды в строительстве: зеленые технологии в Астане",
      excerpt: "Застройщики внедряют экологичные решения в новых жилых комплексах для создания устойчивой городской среды.",
      content: `Современное строительство в Астане все больше ориентируется на экологические стандарты и устойчивое развитие:

1. Энергоэффективные решения
- Солнечные панели на крышах
- Тепловые насосы
- Энергосберегающие окна
- Умные системы освещения

2. Экологичные материалы
- Переработанные строительные материалы
- Натуральная отделка
- Безопасные для здоровья решения
- Локальное производство

3. Управление ресурсами
- Системы сбора дождевой воды
- Раздельный сбор отходов
- Очистка воздуха
- Вертикальное озеленение

Эксперты отмечают растущий спрос на экологичное жилье среди покупателей, особенно молодого поколения.`,
      category: "projects",
      publishDate: "2025-05-28",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 890,
      featured: false
    },
    {
      id: 10,
      title: "Новые стандарты качества в строительстве",
      excerpt: "Министерство строительства утвердило обновленные требования к качеству жилых комплексов.",
      content: `В 2025 году вступают в силу новые стандарты качества строительства жилых объектов:

1. Повышенные требования к безопасности
- Сейсмоустойчивость конструкций
- Пожарная безопасность
- Качество строительных материалов
- Системы видеонаблюдения

2. Комфорт проживания
- Улучшенная шумоизоляция
- Качество вентиляции
- Инсоляция помещений
- Доступность для маломобильных групп

3. Контроль качества
- Регулярные проверки
- Цифровой мониторинг
- Независимая экспертиза
- Гарантийные обязательства

Новые стандарты призваны повысить качество жизни в новостройках и защитить права покупателей.`,
      category: "law",
      publishDate: "2025-05-25",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1230,
      featured: false
    },
    {
      id: 11,
      title: "Инвестиции в коммерческую недвижимость: анализ рынка",
      excerpt: "Эксперты отмечают рост интереса к офисным и торговым помещениям в центре города.",
      content: `Рынок коммерческой недвижимости Астаны демонстрирует устойчивый рост в 2025 году:

1. Тренды рынка
- Рост спроса на офисы класса А
- Развитие торговых центров
- Популярность коворкингов
- Инвестиции в логистические комплексы

2. Инвестиционные возможности
- Доходность разных сегментов
- Окупаемость инвестиций
- Риски и возможности
- Перспективные локации

3. Прогнозы развития
- Влияние экономических факторов
- Технологические инновации
- Изменение потребительских предпочтений
- Государственная поддержка

Аналитики рекомендуют обратить внимание на объекты с потенциалом редевелопмента.`,
      category: "analytics",
      publishDate: "2025-05-22",
      readTime: "7 мин",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1680,
      featured: false
    },
    {
      id: 12,
      title: "Цифровизация риэлторских услуг",
      excerpt: "Новые технологии меняют подход к покупке и продаже недвижимости.",
      content: `Рынок риэлторских услуг переживает цифровую трансформацию:

1. Онлайн-сервисы
- Виртуальные туры
- Электронные сделки
- Онлайн-оценка
- Цифровые документы

2. Искусственный интеллект
- Подбор объектов
- Анализ рынка
- Прогнозирование цен
- Автоматизация процессов

3. Безопасность сделок
- Блокчейн-технологии
- Защита данных
- Электронные подписи
- Умные контракты

Эксперты прогнозируют полный переход рынка на цифровые технологии к 2027 году.`,
      category: "market",
      publishDate: "2025-05-20",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 920,
      featured: false
    },
    {
      id: 13,
      title: "Развитие транспортной инфраструктуры влияет на рынок жилья",
      excerpt: "Строительство новых транспортных развязок повышает привлекательность отдаленных районов.",
      content: `Масштабные транспортные проекты оказывают значительное влияние на рынок недвижимости:

1. Новые транспортные узлы
- Строительство развязок
- Расширение дорог
- Новые маршруты
- Модернизация остановок

2. Влияние на рынок
- Рост цен в новых локациях
- Развитие инфраструктуры
- Повышение доступности
- Инвестиционные возможности

3. Перспективные районы
- Анализ транспортных проектов
- Прогнозы развития
- Потенциал роста
- Рекомендации инвесторам

Эксперты рекомендуют следить за планами развития транспортной сети при выборе недвижимости.`,
      category: "analytics",
      publishDate: "2025-05-18",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1450,
      featured: false
    },
    {
      id: 14,
      title: "Тренды в дизайне жилых комплексов",
      excerpt: "Современные ЖК сочетают функциональность и эстетику в архитектуре и планировке территории.",
      content: `Дизайн жилых комплексов в Астане следует современным тенденциям:

1. Архитектурные решения
- Уникальный внешний вид
- Панорамное остекление
- Эргономичные планировки
- Многофункциональные пространства

2. Благоустройство территории
- Ландшафтный дизайн
- Зоны отдыха
- Детские площадки
- Спортивная инфраструктура

3. Общественные пространства
- Коворкинги
- Лаунж-зоны
- Фитнес-центры
- Развлекательные площадки

Новые проекты создаются с учетом потребностей разных групп жителей.`,
      category: "projects",
      publishDate: "2025-05-15",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1780,
      featured: false
    },
    {
      id: 15,
      title: "Ипотечные программы: новые возможности для молодых семей",
      excerpt: "Банки запускают специальные программы кредитования с пониженными ставками для молодых семей.",
      content: `В 2025 году расширяются возможности ипотечного кредитования для молодых семей:

1. Новые условия кредитования
- Ставка от 3% годовых
- Первоначальный взнос от 5%
- Срок кредита до 30 лет
- Увеличенная сумма кредита

2. Государственная поддержка
- Субсидирование первого взноса
- Компенсация части процентов
- Материнский капитал
- Налоговые вычеты

3. Дополнительные преимущества
- Онлайн-оформление
- Быстрое рассмотрение заявки
- Гибкий график платежей
- Страховые программы

Новые программы делают жилье более доступным для молодых семей.`,
      category: "market",
      publishDate: "2025-05-12",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 2100,
      featured: false
    },
    {
      id: 16,
      title: "Новый формат жилья: апартаменты с обслуживанием",
      excerpt: "В Астане растет популярность сервисных апартаментов с полным набором услуг.",
      content: `Сервисные апартаменты становятся новым трендом на рынке недвижимости Астаны:

1. Преимущества формата
- Профессиональное управление
- Гостиничный сервис
- Консьерж-служба
- Клининг и обслуживание

2. Инфраструктура комплексов
- Фитнес-центры
- Рестораны и кафе
- Конференц-залы
- Зоны коворкинга

3. Инвестиционная привлекательность
- Высокая доходность
- Стабильный спрос
- Простота управления
- Ликвидность актива

Эксперты прогнозируют дальнейший рост популярности данного формата.`,
      category: "projects",
      publishDate: "2025-05-10",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1560,
      featured: false
    },
    {
      id: 17,
      title: "Развитие загородной недвижимости: новые проекты",
      excerpt: "Растет интерес к коттеджным поселкам с развитой инфраструктурой вблизи города.",
      content: `Рынок загородной недвижимости Астаны активно развивается:

1. Современные коттеджные поселки
- Единая архитектурная концепция
- Развитая инфраструктура
- Безопасность и охрана
- Экологичность

2. Преимущества загородной жизни
- Чистый воздух
- Приватность
- Большие участки
- Близость к природе

3. Инфраструктурные решения
- Школы и детские сады
- Магазины и сервисы
- Спортивные объекты
- Зоны отдыха

Загородная недвижимость становится альтернативой городским квартирам.`,
      category: "projects",
      publishDate: "2025-05-08",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1890,
      featured: false
    },
    {
      id: 18,
      title: "Инновации в отделке: новые материалы и технологии",
      excerpt: "Застройщики внедряют современные отделочные материалы для повышения качества жилья.",
      content: `Современные технологии отделки меняют подход к строительству:

1. Инновационные материалы
- Самоочищающиеся покрытия
- Звукопоглощающие панели
- Экологичные краски
- Умные обои

2. Технологии нанесения
- Роботизированная отделка
- 3D-печать элементов
- Автоматизированный контроль
- Лазерное выравнивание

3. Преимущества новых решений
- Долговечность
- Экологичность
- Простота ухода
- Эстетичность

Новые технологии позволяют создавать более качественное и комфортное жилье.`,
      category: "projects",
      publishDate: "2025-05-05",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1340,
      featured: false
    },
    {
      id: 19,
      title: "Влияние экономических факторов на рынок недвижимости",
      excerpt: "Аналитики оценивают влияние экономической ситуации на цены и спрос на недвижимость.",
      content: `Экономические факторы оказывают существенное влияние на рынок недвижимости:

1. Ключевые факторы влияния
- Процентные ставки
- Инфляция
- Курс валют
- Доходы населения

2. Тенденции рынка
- Изменение цен
- Динамика спроса
- Инвестиционная активность
- Объемы строительства

3. Прогнозы развития
- Краткосрочные перспективы
- Долгосрочные тренды
- Рекомендации инвесторам
- Риски и возможности

Понимание экономических факторов помогает принимать взвешенные решения.`,
      category: "analytics",
      publishDate: "2025-05-03",
      readTime: "7 мин",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 2200,
      featured: false
    },
    {
      id: 20,
      title: "Редевелопмент промышленных зон: новая жизнь территорий",
      excerpt: "Старые промышленные территории превращаются в современные жилые кварталы.",
      content: `Проекты редевелопмента меняют облик городских территорий:

1. Преимущества редевелопмента
- Эффективное использование земли
- Развитие инфраструктуры
- Улучшение экологии
- Создание новых пространств

2. Успешные проекты
- Жилые комплексы
- Общественные пространства
- Деловые центры
- Креативные кластеры

3. Социальный эффект
- Создание рабочих мест
- Развитие районов
- Повышение качества жизни
- Формирование сообществ

Редевелопмент становится драйвером развития городских территорий.`,
      category: "projects",
      publishDate: "2025-05-01",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1780,
      featured: false
    },
    {
      id: 21,
      title: "Развитие арендного жилья: государственные программы",
      excerpt: "Новая программа поддержки арендного жилья делает его более доступным для населения.",
      content: `Государство активно развивает сектор арендного жилья:

1. Основные направления программы
- Строительство арендных домов
- Субсидирование арендных ставок
- Социальная поддержка
- Прозрачность рынка

2. Преимущества для жильцов
- Доступные цены
- Качественное обслуживание
- Долгосрочные контракты
- Защита прав арендаторов

3. Условия участия
- Критерии отбора
- Необходимые документы
- Порядок заключения договора
- Система очередности

Программа призвана решить жилищный вопрос для тысяч семей.`,
      category: "law",
      publishDate: "2025-04-28",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1890,
      featured: false
    },
    {
      id: 22,
      title: "Новые технологии безопасности в жилых комплексах",
      excerpt: "Современные ЖК оснащаются передовыми системами безопасности и контроля доступа.",
      content: `Безопасность жилых комплексов выходит на новый уровень:

1. Системы контроля доступа
- Биометрическая идентификация
- Умные домофоны
- Распознавание автомобилей
- Электронные пропуска

2. Видеонаблюдение
- Камеры высокого разрешения
- Искусственный интеллект
- Архивация данных
- Мобильный мониторинг

3. Умная инфраструктура
- Датчики движения
- Аварийное оповещение
- Пожарная безопасность
- Экстренная связь

Новые технологии обеспечивают максимальную защиту жителей.`,
      category: "projects",
      publishDate: "2025-04-25",
      readTime: "4 мин",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1560,
      featured: false
    },
    {
      id: 23,
      title: "Тренды в планировках квартир 2025 года",
      excerpt: "Как изменились предпочтения покупателей в выборе планировочных решений.",
      content: `Планировочные решения адаптируются под современные потребности:

1. Популярные форматы
- Квартиры-трансформеры
- Студии с зонированием
- Двухуровневые решения
- Панорамные квартиры

2. Функциональные зоны
- Домашние офисы
- Гардеробные комнаты
- Кухни-гостиные
- Мастер-спальни

3. Умные решения
- Эргономичная мебель
- Встроенная техника
- Системы хранения
- Многофункциональные пространства

Современные планировки отвечают всем требованиям комфортной жизни.`,
      category: "analytics",
      publishDate: "2025-04-22",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 2100,
      featured: false
    },
    {
      id: 24,
      title: "Инвестиции в студенческое жилье: новый тренд",
      excerpt: "Растет спрос на компактные квартиры рядом с университетами и колледжами.",
      content: `Студенческое жилье становится привлекательным направлением для инвестиций:

1. Преимущества сегмента
- Стабильный спрос
- Высокая доходность
- Быстрая окупаемость
- Низкие риски

2. Популярные форматы
- Микроапартаменты
- Студенческие общежития
- Коливинги
- Малогабаритные квартиры

3. Локации и инфраструктура
- Близость к учебным заведениям
- Транспортная доступность
- Развитая инфраструктура
- Безопасность района

Эксперты прогнозируют рост этого сегмента рынка.`,
      category: "market",
      publishDate: "2025-04-20",
      readTime: "5 мин",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1670,
      featured: false
    },
    {
      id: 25,
      title: "Реновация старых районов: комплексный подход",
      excerpt: "Программа реновации охватит несколько районов города в ближайшие годы.",
      content: `Масштабная программа реновации преобразит облик города:

1. Этапы реализации
- Выбор территорий
- Расселение жителей
- Снос старых зданий
- Новое строительство

2. Преимущества программы
- Современное жилье
- Развитая инфраструктура
- Благоустройство территорий
- Повышение качества жизни

3. Социальные аспекты
- Гарантии для жителей
- Сохранение района проживания
- Улучшение условий
- Поддержка при переезде

Программа реновации затронет более 100 домов в ближайшие 5 лет.`,
      category: "projects",
      publishDate: "2025-04-18",
      readTime: "7 мин",
      imageUrl: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1980,
      featured: false
    },
    {
      id: 26,
      title: "Зеленая сертификация зданий: новые стандарты",
      excerpt: "Все больше застройщиков стремятся получить экологические сертификаты для своих проектов.",
      content: `Экологическая сертификация становится важным трендом в строительстве:

1. Международные стандарты
- LEED сертификация
- BREEAM оценка
- GREEN ZOOM
- Экологический паспорт

2. Критерии оценки
- Энергоэффективность
- Экологичность материалов
- Управление отходами
- Качество среды

3. Преимущества сертификации
- Снижение эксплуатационных расходов
- Повышение стоимости объекта
- Улучшение имиджа
- Забота об экологии

Зеленая сертификация становится стандартом качества в строительстве.`,
      category: "projects",
      publishDate: "2025-04-15",
      readTime: "6 мин",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      views: 1450,
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
  
  const totalPages = Math.ceil(regularArticles.length / itemsPerPage);
  const currentArticles = regularArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <section className="relative overflow-hidden py-20 bg-white">
        <div className="absolute inset-0 bg-grid-blue/[0.02]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Левая колонка с текстом */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm">
                <Newspaper className="w-4 h-4" />
                Будьте в курсе последних событий
              </div>

              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  Новости 
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    рынка недвижимости
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl text-gray-600 max-w-xl"
                >
                  Актуальные новости, аналитика и экспертные мнения о рынке недвижимости Казахстана
                </motion.p>
              </div>

              {/* Поиск и фильтры */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Поиск новостей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 outline-none ring-0 focus:outline-none focus:ring-0 hover:border-blue-300 transition-colors"
                    />
                  </div>
                </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 outline-none ring-0 focus:outline-none focus:ring-0 hover:border-blue-300 transition-colors">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                  <SelectContent className="outline-none ring-0">
                      {categories.map(category => (
                      <SelectItem 
                        key={category.value} 
                        value={category.value}
                        className="outline-none ring-0 focus:outline-none focus:ring-0 hover:bg-blue-50 transition-colors"
                      >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </motion.div>

              {/* Статистика */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Newspaper className="w-6 h-6" />
                </div>
                  <div>
                    <div className="font-semibold text-gray-800">{newsArticles.length}</div>
                    <div className="text-sm text-gray-600">Статей</div>
              </div>
            </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {newsArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Просмотров</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">24/7</div>
                    <div className="text-sm text-gray-600">Обновление</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Правая колонка с изображением */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative lg:h-[600px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="News and Analytics"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl shadow-blue-500/10"
              />
              
              {/* Плавающие карточки */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Аналитика рынка</div>
                    <div className="text-sm text-gray-600">Ежедневные обзоры</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Новые проекты</div>
                    <div className="text-sm text-gray-600">Все о строительстве</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Главные новости</h2>
            <p className="mt-4 text-xl text-gray-600">Самые важные события рынка недвижимости</p>
            </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedArticle(article);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <Badge className={getCategoryColor(article.category)}>
                      {getCategoryLabel(article.category)}
                    </Badge>
                    <h3 className="mt-3 text-xl font-semibold text-white">
                      {article.title}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.publishDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {article.views.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Badge className={getCategoryColor(selectedArticle.category)}>
                    {getCategoryLabel(selectedArticle.category)}
                  </Badge>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                      {formatDate(selectedArticle.publishDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                      {selectedArticle.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                      {selectedArticle.views.toLocaleString()} просмотров
                        </div>
                      </div>
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  {selectedArticle.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-6">
                {/* Краткое описание */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8">
                    {selectedArticle.excerpt}
                  </p>
                </motion.div>

                {/* Изображение */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-[400px] mb-8 overflow-hidden rounded-xl"
                >
                  <img 
                    src={selectedArticle.imageUrl} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Основной контент */}
                <div className="prose max-w-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-6"
                  >
                    {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                      // Проверяем, является ли параграф заголовком (начинается с цифры и точки)
                      if (/^\d+\./.test(paragraph)) {
                        return (
                          <h3 key={index} className="text-xl font-semibold text-gray-800 mt-8 mb-4">
                            {paragraph}
                          </h3>
                        );
                      }
                      // Проверяем, является ли строка элементом списка
                      else if (paragraph.startsWith('- ')) {
                        return (
                          <ul key={index} className="list-disc list-inside mb-4 ml-4 text-gray-600">
                            <li className="mb-2">{paragraph.substring(2)}</li>
                          </ul>
                        );
                      }
                      // Обычный параграф
                      return (
                        <p key={index} className="text-gray-600 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </motion.div>

                  {/* Нижняя панель */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-end items-center mt-8 pt-8 border-t"
                  >
                    <Button 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)}
                      className="hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                    >
                      Закрыть
                      </Button>
                  </motion.div>
                    </div>
            </div>
            </>
        )}
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {currentArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedArticle(article);
                    setIsModalOpen(true);
                  }}>
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-1 text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Share functionality can be added here
                        }}
                      >
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
                <Button 
                  variant="ghost" 
                  className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Предыдущая
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button 
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                    className={`px-3 py-2 text-sm ${
                      currentPage === i + 1 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  variant="ghost" 
                  className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Следующая
                </Button>
              </nav>
            </div>
          )}
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-24 mb-24 bg-blue-50 rounded-2xl p-8 text-center">
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