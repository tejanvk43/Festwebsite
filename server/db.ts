import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

// Only initialize SQLite if Firebase is not configured
// In serverless environments with Firebase, we don't need SQLite
const sqlite = process.env.FIREBASE_SERVICE_ACCOUNT
    ? null
    : new Database("sqlite.db");

export const db = sqlite ? drizzle(sqlite, { schema }) : null as any;
