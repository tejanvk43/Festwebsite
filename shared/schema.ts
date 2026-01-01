import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = sqliteTable("events", {
  id: text("id").primaryKey(), // Using text ID to match JSON (e.g., 'evt-001')
  title: text("title").notNull(),
  type: text("type").notNull(), // 'tech', 'cultural', etc.
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  date: text("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  venueArea: text("venue_area").notNull(),
  teamSize: integer("team_size").notNull(),
  registrationFee: integer("registration_fee").notNull(),
  prize: text("prize").notNull(),
  rules: text("rules", { mode: "json" }).$type<string[]>().notNull(),
  tags: text("tags", { mode: "json" }).$type<string[]>().notNull(),
  image: text("image").notNull(),
});

export const stalls = sqliteTable("stalls", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description").notNull(),
  owner: text("owner").notNull(),
  booth: text("booth").notNull(),
  location: text("location").notNull(),
  items: text("items", { mode: "json" }).$type<string[]>().notNull(),
  priceRange: text("price_range").notNull(),
  openingHours: text("opening_hours", { mode: "json" }).$type<{ day: string, open: string, close: string }[]>().notNull(),
  contact: text("contact", { mode: "json" }).$type<{ phone: string, email: string }>().notNull(),
  image: text("image").notNull(),
});

export const registrations = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  eventId: text("event_id").notNull(), // FK to events.id manually
  teamName: text("team_name"),
  participantName: text("participant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  rollNumber: text("roll_number").notNull(),
  college: text("college"),
});

export const insertEventSchema = createInsertSchema(events);
export const insertStallSchema = createInsertSchema(stalls);
export const insertRegistrationSchema = createInsertSchema(registrations);

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Stall = typeof stalls.$inferSelect;
export type InsertStall = z.infer<typeof insertStallSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

