import { router, protectedProcedure } from "@/server/trpc";
import {
  sleepEntrySchema,
  sleepEntryUpdateSchema,
  paginatedDateRangeSchema,
  idSchema,
} from "@/lib/validators";
import { sleepEntries } from "@/server/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export const sleepRouter = router({
  create: protectedProcedure
    .input(sleepEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const [entry] = await ctx.db
        .insert(sleepEntries)
        .values({
          userId: ctx.user.id,
          date: input.date,
          bedtime: new Date(input.bedtime),
          wakeTime: new Date(input.wakeTime),
          quality: input.quality,
          notes: input.notes,
          cycles: input.cycles,
        })
        .returning();
      return entry;
    }),

  list: protectedProcedure
    .input(paginatedDateRangeSchema)
    .query(async ({ input, ctx }) => {
      const conditions = [eq(sleepEntries.userId, ctx.user.id)];

      if (input.startDate) {
        conditions.push(gte(sleepEntries.date, input.startDate));
      }
      if (input.endDate) {
        conditions.push(lte(sleepEntries.date, input.endDate));
      }

      return ctx.db
        .select()
        .from(sleepEntries)
        .where(and(...conditions))
        .limit(input.limit)
        .offset(input.offset);
    }),

  getById: protectedProcedure.input(idSchema).query(async ({ input, ctx }) => {
    const [entry] = await ctx.db
      .select()
      .from(sleepEntries)
      .where(
        and(
          eq(sleepEntries.id, input.id),
          eq(sleepEntries.userId, ctx.user.id),
        ),
      );
    return entry ?? null;
  }),

  update: protectedProcedure
    .input(sleepEntryUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const [updated] = await ctx.db
        .update(sleepEntries)
        // we have to unwrap from original set(data) due to bedtime being stored as string and converted to datetime object
        // TODO: check schema for change and best choice
        .set({
          ...(data.date && { date: data.date }),
          ...(data.bedtime && { bedtime: new Date(data.bedtime) }),
          ...(data.wakeTime && { wakeTime: new Date(data.wakeTime) }),
          ...(data.quality !== undefined && { quality: data.quality }),
          ...(data.notes !== undefined && { notes: data.notes }),
          ...(data.cycles !== undefined && { cycles: data.cycles }),
        })
        .where(
          and(eq(sleepEntries.id, id), eq(sleepEntries.userId, ctx.user.id)),
        )
        .returning();
      return updated;
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(sleepEntries)
        .where(
          and(
            eq(sleepEntries.id, input.id),
            eq(sleepEntries.userId, ctx.user.id),
          ),
        );
      return { success: true };
    }),
});
