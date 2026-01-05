import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const events = sqliteTable("events", {
  id: text("id").primaryKey(), // Using text ID to match JSON (e.g., 'evt-001')
  title: text("title").notNull(),
  type: text("type").notNull(), // 'tech', 'cultural', etc.
  department: text("department").notNull().default("ALL"), // Branch/department that conducts the event
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
  facultyCoordinator: text("faculty_coordinator"),
  studentCoordinator: text("student_coordinator"),
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
  ticketId: text("ticket_id").notNull().unique(), // Unique ticket identifier (e.g., "YF26-00001")
  eventIds: text("event_ids", { mode: "json" }).$type<string[]>().notNull(), // Array of event IDs
  teamName: text("team_name"),
  participantName: text("participant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  rollNumber: text("roll_number").notNull(),
  participantBranch: text("participant_branch"),
  participantYear: text("participant_year"),
  college: text("college"),
  educationLevel: text("education_level"), // UG, PG, DIPLOMA
  branch: text("branch", { mode: "json" }).$type<string[]>(), // Array - store multiple tech branches
  regType: text("reg_type").notNull().default("tech"), // tech, cultural, both
  // Pricing fields
  totalEvents: integer("total_events").notNull().default(0),
  freeEvents: integer("free_events").notNull().default(0),
  originalAmount: integer("original_amount").notNull().default(0),
  discountAmount: integer("discount_amount").notNull().default(0),
  finalAmount: integer("final_amount").notNull().default(0),
  // QR Code data
  qrCode: text("qr_code"), // Base64 QR code image
  createdAt: text("created_at").notNull().default(""),
});

export const insertEventSchema = createInsertSchema(events);
export const insertStallSchema = createInsertSchema(stalls);
export const insertRegistrationSchema = createInsertSchema(registrations, {
  participantName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  rollNumber: z.string().min(1, "Roll number is required"),
  participantBranch: z.string().min(1, "Branch name is required"),
  participantYear: z.string().min(1, "Year of study is required"),
  educationLevel: z.string().min(1, "Education level is required"),
  college: z.string().min(1, "College name is required"),
  ticketId: z.string().optional(),
  qrCode: z.string().optional(),
  totalEvents: z.number().optional(),
  freeEvents: z.number().optional(),
  originalAmount: z.number().optional(),
  discountAmount: z.number().optional(),
  finalAmount: z.number().optional(),
  createdAt: z.string().optional(),
}).omit({
  id: true,
  ticketId: true,
  qrCode: true,
  totalEvents: true,
  freeEvents: true,
  originalAmount: true,
  discountAmount: true,
  finalAmount: true,
  createdAt: true
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Stall = typeof stalls.$inferSelect;
export type InsertStall = z.infer<typeof insertStallSchema>;
export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;

