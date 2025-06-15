// Define all types locally since we removed the database
export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string; // "sale" | "rent"
  propertyType: string; // "apartment" | "house" | "studio" | "commercial"
  area: number;
  rooms: number;
  floor: number | null;
  totalFloors: number | null;
  address: string;
  district: string;
  city: string;
  imageUrl: string;
  isFeatured: boolean;
  publishedAt: Date;
};

export type User = {
  id: number;
  username: string;
  password: string;
};

export type InsertProperty = Omit<Property, 'id' | 'publishedAt'>;
export type InsertUser = Omit<User, 'id'>;

export interface IStorage {
  // Property methods
  getProperties(filters?: {
    type?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: number;
    district?: string;
    city?: string;
  }): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private users: Map<number, User>;
  private currentPropertyId: number;
  private currentUserId: number;

  constructor() {
    this.properties = new Map();
    this.users = new Map();
    this.currentPropertyId = 1;
    this.currentUserId = 1;
    this.seedProperties();
  }

  private seedProperties() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "3-комнатная квартира в центре",
        description: "Просторная квартира с современным ремонтом в центре города",
        price: 45000000,
        currency: "₸",
        type: "sale",
        propertyType: "apartment",
        area: 95,
        rooms: 3,
        floor: 8,
        totalFloors: 12,
        address: "ул. Кенесары, 42",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: true,
      },
      {
        title: "Дом с участком",
        description: "Уютный дом с большим участком и садом",
        price: 350000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 180,
        rooms: 5,
        floor: 1,
        totalFloors: 2,
        address: "пос. Коктем",
        district: "Алматинский район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: true,
      },
      {
        title: "Студия в новостройке",
        description: "Современная студия с панорамными окнами",
        price: 18500000,
        currency: "₸",
        type: "sale",
        propertyType: "studio",
        area: 35,
        rooms: 1,
        floor: 15,
        totalFloors: 22,
        address: "ЖК Манхеттен",
        district: "Сарыарка район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: true,
      },
      {
        title: "2-комн. квартира, 65 м²",
        description: "Уютная квартира с качественным ремонтом",
        price: 180000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 65,
        rooms: 2,
        floor: 2,
        totalFloors: 9,
        address: "ул. Республики",
        district: "Есиль р-н",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "1-комн. в новостройке",
        description: "Новая квартира в современном ЖК",
        price: 22000000,
        currency: "₸",
        type: "sale",
        propertyType: "apartment",
        area: 42,
        rooms: 1,
        floor: 12,
        totalFloors: 25,
        address: "ЖК Астана Ривер Сайд",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Дом, 4 комнаты",
        description: "Просторный дом в тихом районе",
        price: 450000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 150,
        rooms: 4,
        floor: 1,
        totalFloors: 2,
        address: "пос. Достык",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Элитная 4-комнатная квартира",
        description: "Роскошная квартира с дизайнерским ремонтом и панорамным видом на город",
        price: 85000000,
        currency: "₸",
        type: "sale",
        propertyType: "apartment",
        area: 160,
        rooms: 4,
        floor: 18,
        totalFloors: 20,
        address: "ЖК Millennium Park",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Уютная 2-комнатная квартира",
        description: "Светлая квартира с хорошим ремонтом и мебелью",
        price: 220000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 58,
        rooms: 2,
        floor: 5,
        totalFloors: 9,
        address: "ул. Сыганак, 54",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Коммерческое помещение",
        description: "Помещение под магазин или офис на первой линии",
        price: 38000000,
        currency: "₸",
        type: "sale",
        propertyType: "commercial",
        area: 85,
        rooms: 3,
        floor: 1,
        totalFloors: 12,
        address: "пр. Мангилик Ел, 26",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Пентхаус с террасой",
        description: "Двухуровневый пентхаус с собственной террасой и панорамным видом",
        price: 245000000,
        currency: "₸",
        type: "sale",
        propertyType: "apartment",
        area: 280,
        rooms: 5,
        floor: 30,
        totalFloors: 30,
        address: "ЖК Premium Tower",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Коттедж с гаражом",
        description: "Просторный коттедж с гаражом на 2 машины и благоустроенным участком",
        price: 185000000,
        currency: "₸",
        type: "sale",
        propertyType: "house",
        area: 320,
        rooms: 6,
        floor: 2,
        totalFloors: 2,
        address: "КГ Green Valley",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false,
      },
      {
        title: "Студия с дизайнерским ремонтом",
        description: "Уютная студия с современным дизайнерским ремонтом и встроенной техникой",
        price: 160000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 38,
        rooms: 1,
        floor: 7,
        totalFloors: 16,
        address: "ЖК Smart City",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Квартира с панорамным видом",
        description: "Современная квартира с панорамным видом на город",
        price: 280000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 75,
        rooms: 2,
        floor: 15,
        totalFloors: 20,
        address: "ЖК Sky City",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Таунхаус с гаражом",
        description: "Современный таунхаус с гаражом и небольшим участком",
        price: 420000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 160,
        rooms: 4,
        floor: 2,
        totalFloors: 2,
        address: "КГ Green Park",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Компактная студия",
        description: "Уютная студия с современной мебелью",
        price: 140000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 32,
        rooms: 1,
        floor: 8,
        totalFloors: 12,
        address: "ЖК Comfort Plus",
        district: "Алматинский район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "3-комнатная с ремонтом",
        description: "Просторная квартира с качественным ремонтом",
        price: 350000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 95,
        rooms: 3,
        floor: 6,
        totalFloors: 9,
        address: "ЖК Central Park",
        district: "Сарыарка район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Дом с бассейном",
        description: "Роскошный дом с бассейном и зоной барбекю",
        price: 850000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 280,
        rooms: 6,
        floor: 2,
        totalFloors: 2,
        address: "КГ Elite Village",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Смарт-квартира",
        description: "Технологичная квартира с системой умный дом",
        price: 200000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 45,
        rooms: 1,
        floor: 10,
        totalFloors: 16,
        address: "ЖК Future Home",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Студия в центре",
        description: "Стильная студия в центре города",
        price: 170000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 35,
        rooms: 1,
        floor: 12,
        totalFloors: 14,
        address: "ЖК Downtown",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "4-комнатная с террасой",
        description: "Просторная квартира с большой террасой",
        price: 480000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 140,
        rooms: 4,
        floor: 7,
        totalFloors: 8,
        address: "ЖК Premium House",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Коттедж с сауной",
        description: "Уютный коттедж с сауной и зимним садом",
        price: 650000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 220,
        rooms: 5,
        floor: 2,
        totalFloors: 2,
        address: "КГ Luxury Village",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Студия с видом на реку",
        description: "Современная студия с видом на реку Ишим",
        price: 190000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 40,
        rooms: 1,
        floor: 14,
        totalFloors: 18,
        address: "ЖК River Park",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "2-комнатная с кабинетом",
        description: "Удобная квартира с отдельным кабинетом",
        price: 250000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 70,
        rooms: 2,
        floor: 4,
        totalFloors: 9,
        address: "ЖК Business Center",
        district: "Алматинский район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Дом с зимним садом",
        description: "Просторный дом с зимним садом и теплицей",
        price: 580000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 200,
        rooms: 5,
        floor: 2,
        totalFloors: 2,
        address: "КГ Garden Village",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Студия-лофт",
        description: "Стильная студия в стиле лофт",
        price: 180000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 42,
        rooms: 1,
        floor: 3,
        totalFloors: 5,
        address: "ЖК Loft City",
        district: "Сарыарка район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "3-комнатная с камином",
        description: "Уютная квартира с настоящим камином",
        price: 420000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 110,
        rooms: 3,
        floor: 5,
        totalFloors: 7,
        address: "ЖК Comfort Elite",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Дом с гостевым домиком",
        description: "Основной дом и отдельный гостевой домик",
        price: 750000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 260,
        rooms: 6,
        floor: 2,
        totalFloors: 2,
        address: "КГ Family Village",
        district: "пригород",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Студия с антресолью",
        description: "Компактная студия с дополнительным спальным местом",
        price: 165000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 36,
        rooms: 1,
        floor: 9,
        totalFloors: 12,
        address: "ЖК Smart House",
        district: "Алматинский район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Просторная 3-комнатная квартира",
        description: "Светлая квартира с современным ремонтом и панорамными окнами",
        price: 350000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 95,
        rooms: 3,
        floor: 12,
        totalFloors: 16,
        address: "ЖК Green Park",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Стильная студия в центре",
        description: "Компактная студия с дизайнерским ремонтом в самом сердце города",
        price: 180000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 42,
        rooms: 1,
        floor: 8,
        totalFloors: 20,
        address: "ЖК Downtown",
        district: "Алматы район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Семейный дом с участком",
        description: "Уютный дом с большим двором и гаражом",
        price: 450000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 180,
        rooms: 5,
        floor: 2,
        totalFloors: 2,
        address: "Коттеджный городок Sun City",
        district: "Алматы район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Видовая 2-комнатная квартира",
        description: "Современная квартира с видом на реку и набережную",
        price: 250000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "apartment",
        area: 68,
        rooms: 2,
        floor: 15,
        totalFloors: 18,
        address: "ЖК River Park",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Таунхаус с террасой",
        description: "Двухэтажный таунхаус с собственной террасой и парковкой",
        price: 380000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "house",
        area: 150,
        rooms: 4,
        floor: 2,
        totalFloors: 2,
        address: "ЖК Garden Village",
        district: "Алматы район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      },
      {
        title: "Студия с панорамными окнами",
        description: "Стильная студия с современной мебелью и техникой",
        price: 170000,
        currency: "₸/мес",
        type: "rent",
        propertyType: "studio",
        area: 40,
        rooms: 1,
        floor: 10,
        totalFloors: 25,
        address: "ЖК Sky City",
        district: "Есиль район",
        city: "Астана",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        isFeatured: false
      }
    ];

    const now = new Date();
    sampleProperties.forEach((property, index) => {
      // Create properties with dates spread over the last week
      const date = new Date(now);
      date.setDate(date.getDate() - index);
      this.createProperty(property);
      
      // Update the publishedAt date after creation
      const createdProperty = this.properties.get(this.currentPropertyId - 1);
      if (createdProperty) {
        createdProperty.publishedAt = date;
      }
    });
  }

  async getProperties(filters?: {
    type?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: number;
    district?: string;
    city?: string;
  }): Promise<Property[]> {
    let result = Array.from(this.properties.values());

    if (filters) {
      if (filters.type) {
        result = result.filter(p => p.type === filters.type);
      }
      if (filters.propertyType) {
        result = result.filter(p => p.propertyType === filters.propertyType);
      }
      if (filters.minPrice) {
        result = result.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        result = result.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.rooms) {
        result = result.filter(p => p.rooms === filters.rooms);
      }
      if (filters.district) {
        result = result.filter(p => p.district.toLowerCase().includes(filters.district!.toLowerCase()));
      }
      if (filters.city) {
        result = result.filter(p => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
      }
    }

    return result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.isFeatured);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const newProperty: Property = {
      ...property,
      id,
      publishedAt: new Date()
    };
    this.properties.set(id, newProperty);
    return newProperty;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

// Export a single instance to be used throughout the application
export const storage = new MemStorage();
