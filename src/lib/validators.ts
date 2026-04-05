
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const sleepCycleSchema = z.object({
    start:z.string().datetime(),
    end  :z.string().datetime(),
    depth:z.enum(["light","deep","rem","awake"]),
})
export const sleepEntrySchema = z.object({
  date: z.string().date(),
  bedtime: z.string().datetime(),
  wakeTime: z.string().datetime(),
  quality: z.number().int().min(1).max(10),
  notes: z.string().optional(),
  cycles:z.array(sleepCycleSchema).optional()
});

export const sleepEntryUpdateSchema = sleepEntrySchema.partial().extend({
  id: z.string().uuid(),
});

export const stressEntrySchema = z.object({
  date: z.string().date(),
  level: z.number().int().min(1).max(10),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export const stressEntryUpdateSchema = stressEntrySchema.partial().extend({
  id: z.string().uuid(),
});

export const screentimeCategory = z.enum([
  "social",
  "entertainment",
  "productivity",
  "education",
  "other",
]);

export const screentimeEntrySchema = z.object({
  date: z.string().date(),
  totalMins: z.number().int().min(0),
  category: screentimeCategory,
  appName: z.string().optional(),
  notes: z.string().optional(),
});
export const screentimeEntryUpdateSchema = screentimeEntrySchema
  .partial()
  .extend({
    id: z.string().uuid(),
  });

export const dateRangeSchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});

export const paginatedDateRangeSchema = dateRangeSchema.extend({
  limit: z.number().int().min(1).max(100).default(50),
  offset: z.number().int().min(0).default(0),
});

export const idSchema = z.object({
  id: z.string().uuid(),
});

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type SleepCycle = z.infer<typeof sleepCycleSchema>
export type SleepEntry = z.infer<typeof sleepEntrySchema>
export type SleepEntryUpdate = z.infer<typeof sleepEntryUpdateSchema>
export type StressEntryUpdate = z.infer<typeof stressEntryUpdateSchema>
export type ScreentimeEntryUpdate = z.infer<typeof screentimeEntryUpdateSchema>