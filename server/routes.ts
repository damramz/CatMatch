import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCatPreferenceSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cat API proxy to handle CORS and add caching
  app.get("/api/cats/:count", async (req, res) => {
    try {
      const count = parseInt(req.params.count) || 10;
      const cats = [];
      
      for (let i = 0; i < count; i++) {
        const randomParam = Math.random().toString(36).substring(7);
        cats.push({
          id: i,
          url: `https://cataas.com/cat?${randomParam}&width=400&height=500`,
          name: `Cat ${i + 1}`
        });
      }
      
      res.json(cats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cats" });
    }
  });

  // Save cat preference
  app.post("/api/preferences", async (req, res) => {
    try {
      const preference = insertCatPreferenceSchema.parse(req.body);
      const savedPreference = await storage.saveCatPreference(preference);
      res.json(savedPreference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid preference data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save preference" });
      }
    }
  });

  // Get user preferences
  app.get("/api/preferences/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const preferences = await storage.getUserPreferences(userId);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch preferences" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
