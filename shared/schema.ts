import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("₸"),
  type: text("type").notNull(), // "sale" | "rent"
  propertyType: text("property_type").notNull(), // "apartment" | "house" | "studio"
  area: integer("area").notNull(), // in square meters
  rooms: integer("rooms").notNull(),
  floor: integer("floor"),
  totalFloors: integer("total_floors"),
  address: text("address").notNull(),
  district: text("district").notNull(),
  city: text("city").notNull().default("Астана"),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").default(false),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  publishedAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;

// Unified Property type that includes all fields
export type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  type: string;
  propertyType: string;
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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
