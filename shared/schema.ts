// Basic types without database dependencies
export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string; // "sale" | "rent"
  propertyType: string; // "apartment" | "house" | "studio"
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

// Types for creating new entities (without id and auto-generated fields)
export type InsertProperty = Omit<Property, 'id' | 'publishedAt'>;
export type InsertUser = Omit<User, 'id'>; 