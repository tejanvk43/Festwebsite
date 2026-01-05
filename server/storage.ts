import { db as firebaseDb } from "./firebase";
import { db as sqliteDb } from "./db";
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
  getRegistrations(): Promise<Registration[]>;
  getRegistrationByTicketId(ticketId: string): Promise<Registration | undefined>;
  getLastRegistrationId(): Promise<number>;
  clearEvents(): Promise<void>;
  clearStalls(): Promise<void>;
  clearRegistrations(): Promise<void>;
}

export class FirebaseStorage implements IStorage {
  private getCollection(name: string) {
    if (!firebaseDb) throw new Error("Firebase not initialized");
    return firebaseDb.collection(name);
  }

  async getEvents(): Promise<Event[]> {
    const snapshot = await this.getCollection("events").get();
    return snapshot.docs.map(doc => doc.data() as Event);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const doc = await this.getCollection("events").doc(id).get();
    return doc.exists ? (doc.data() as Event) : undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    await this.getCollection("events").doc(insertEvent.id).set(insertEvent);
    return insertEvent as Event;
  }

  async getStalls(): Promise<Stall[]> {
    const snapshot = await this.getCollection("stalls").get();
    return snapshot.docs.map(doc => doc.data() as Stall);
  }

  async getStall(id: string): Promise<Stall | undefined> {
    const doc = await this.getCollection("stalls").doc(id).get();
    return doc.exists ? (doc.data() as Stall) : undefined;
  }

  async createStall(insertStall: InsertStall): Promise<Stall> {
    await this.getCollection("stalls").doc(insertStall.id).set(insertStall);
    return insertStall as Stall;
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    // We'll use a transaction to ensure unique IDs if needed, 
    // but for now let's just use the timestamp-based ID or increment
    const id = Date.now();
    const registration = { ...insertRegistration, id };
    await this.getCollection("registrations").doc(registration.ticketId).set(registration);
    return registration as Registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    const snapshot = await this.getCollection("registrations").orderBy("id").get();
    return snapshot.docs.map(doc => doc.data() as Registration);
  }

  async getRegistrationByTicketId(ticketId: string): Promise<Registration | undefined> {
    const doc = await this.getCollection("registrations").doc(ticketId).get();
    return doc.exists ? (doc.data() as Registration) : undefined;
  }

  async getLastRegistrationId(): Promise<number> {
    const snapshot = await this.getCollection("registrations").orderBy("id", "desc").limit(1).get();
    if (snapshot.empty) return 0;
    return (snapshot.docs[0].data() as Registration).id;
  }

  async clearEvents(): Promise<void> {
    const snapshot = await this.getCollection("events").get();
    const batch = firebaseDb!.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

  async clearStalls(): Promise<void> {
    const snapshot = await this.getCollection("stalls").get();
    const batch = firebaseDb!.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }

  async clearRegistrations(): Promise<void> {
    const snapshot = await this.getCollection("registrations").get();
    const batch = firebaseDb!.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  }
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    return await sqliteDb.select().from(events);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await sqliteDb.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await sqliteDb.insert(events).values(insertEvent).returning();
    return event;
  }

  async getStalls(): Promise<Stall[]> {
    return await sqliteDb.select().from(stalls);
  }

  async getStall(id: string): Promise<Stall | undefined> {
    const [stall] = await sqliteDb.select().from(stalls).where(eq(stalls.id, id));
    return stall;
  }

  async createStall(insertStall: InsertStall): Promise<Stall> {
    const [stall] = await sqliteDb.insert(stalls).values(insertStall).returning();
    return stall;
  }

  async createRegistration(insertRegistration: InsertRegistration): Promise<Registration> {
    const [registration] = await sqliteDb.insert(registrations).values(insertRegistration).returning();
    return registration;
  }

  async getRegistrations(): Promise<Registration[]> {
    return await sqliteDb.select().from(registrations).orderBy(registrations.id);
  }

  async getRegistrationByTicketId(ticketId: string): Promise<Registration | undefined> {
    const [registration] = await sqliteDb.select().from(registrations).where(eq(registrations.ticketId, ticketId));
    return registration;
  }

  async getLastRegistrationId(): Promise<number> {
    const result = await sqliteDb.select({ id: registrations.id }).from(registrations).orderBy(registrations.id);
    if (result.length === 0) return 0;
    return result[result.length - 1].id;
  }

  async clearEvents(): Promise<void> {
    await sqliteDb.delete(events);
  }

  async clearStalls(): Promise<void> {
    await sqliteDb.delete(stalls);
  }

  async clearRegistrations(): Promise<void> {
    await sqliteDb.delete(registrations);
  }
}

// Export FirebaseStorage if configured, otherwise fallback to DatabaseStorage
export const storage = process.env.FIREBASE_SERVICE_ACCOUNT ? new FirebaseStorage() : new DatabaseStorage();
