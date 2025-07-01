import { users, catPreferences, type User, type InsertUser, type CatPreference, type InsertCatPreference } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveCatPreference(preference: InsertCatPreference): Promise<CatPreference>;
  getUserPreferences(userId: number): Promise<CatPreference[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private catPreferences: Map<number, CatPreference>;
  private currentUserId: number;
  private currentPreferenceId: number;

  constructor() {
    this.users = new Map();
    this.catPreferences = new Map();
    this.currentUserId = 1;
    this.currentPreferenceId = 1;
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

  async saveCatPreference(insertPreference: InsertCatPreference): Promise<CatPreference> {
    const id = this.currentPreferenceId++;
    const preference: CatPreference = { 
      ...insertPreference, 
      id,
      createdAt: new Date()
    };
    this.catPreferences.set(id, preference);
    return preference;
  }

  async getUserPreferences(userId: number): Promise<CatPreference[]> {
    return Array.from(this.catPreferences.values()).filter(
      (preference) => preference.userId === userId,
    );
  }
}

export const storage = new MemStorage();
