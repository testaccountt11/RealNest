import { properties, users, type Property, type InsertProperty, type User, type InsertUser } from "@shared/schema";

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
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
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

    return result.sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => p.isFeatured);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = {
      ...insertProperty,
      id,
      publishedAt: new Date(),
      city: insertProperty.city || "Астана",
      currency: insertProperty.currency || "₸",
      floor: insertProperty.floor || null,
      totalFloors: insertProperty.totalFloors || null,
      isFeatured: insertProperty.isFeatured || false,
    };
    this.properties.set(id, property);
    return property;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
