import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const catPreferences = pgTable("cat_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  catImageUrl: text("cat_image_url").notNull(),
  liked: boolean("liked").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCatPreferenceSchema = createInsertSchema(catPreferences).pick({
  userId: true,
  catImageUrl: true,
  liked: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CatPreference = typeof catPreferences.$inferSelect;
export type InsertCatPreference = z.infer<typeof insertCatPreferenceSchema>;
