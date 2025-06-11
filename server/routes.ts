import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const searchFiltersSchema = z.object({
  type: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  rooms: z.number().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all properties with optional filters
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = searchFiltersSchema.parse({
        type: req.query.type as string,
        propertyType: req.query.propertyType as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        rooms: req.query.rooms ? Number(req.query.rooms) : undefined,
        district: req.query.district as string,
        city: req.query.city as string,
      });

      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(400).json({ message: "Invalid filter parameters" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  // Get single property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
