import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  timestamp,
  json,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const sleepEntries = pgTable("sleep_entries", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  date: date().notNull(),
  bedtime: timestamp().notNull(),
  wakeTime: timestamp().notNull(),
  quality: integer().notNull(),
  notes: text(),
  cycles: json(),
});

export const stressEntries = pgTable("stress_entries", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  date: date().notNull(),
  level: integer().notNull(),
  source: text(),
  notes: text(),
});

export const screentimeEntries = pgTable("screentime_entries", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => users.id),
  date: date().notNull(),
  totalMins: integer().notNull(),
  category: varchar({ length: 50 }).notNull(),
  appName: varchar({ length: 255 }),
  notes: text(),
});
