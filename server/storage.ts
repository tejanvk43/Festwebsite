import { db } from "./db";
import {
  events, stalls, registrations,
  type Event, type InsertEvent,
  type Stall, type InsertStall,
  type Registration, type InsertRegistration
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  getStalls(): Promise<Stall[]>;
  getStall(id: string): Promise<Stall | undefined>;
  createStall(stall: InsertStall): Promise<Stall>;

  createRegistration(registration: InsertRegistration): Promise<Registration>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }

  async getStalls(): Promise<Stall[]> {
    return await db.select().from(stalls);
  }

  async getStall(id: string): Promise<Stall | undefined> {
    const [stall] = await db.select().from(stalls).where(eq(stalls.id, id));
    return stall;
  }

  async createStall(insertStall: InsertStall): Promise<Stall> {
    const [stall] = await db.insert(stalls).values(insertStall).returning();
    return stall;
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await db.insert(registrations).values(insertRegistration).returning();
    return registration;
  }
}

export const storage = new DatabaseStorage();
