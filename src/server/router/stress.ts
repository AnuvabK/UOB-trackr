import { router, protectedProcedure } from "@/server/trpc";
import {
  stressEntrySchema,
  stressEntryUpdateSchema,
  paginatedDateRangeSchema,
  idSchema,
} from "@/lib/validators";
import { stressEntries } from "@/server/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export const stressRouter = router({
  create: protectedProcedure
    .input(stressEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const [entry] = await ctx.db
        .insert(stressEntries)
        .values({ ...input, userId: ctx.user.id })
        .returning();
      return entry;
    }),

  list: protectedProcedure
    .input(paginatedDateRangeSchema)
    .query(async ({ input, ctx }) => {
      const conditions = [eq(stressEntries.userId, ctx.user.id)];

      if (input.startDate) {
        conditions.push(gte(stressEntries.date, input.startDate));
      }
      if (input.endDate) {
        conditions.push(lte(stressEntries.date, input.endDate));
      }

      return ctx.db
        .select()
        .from(stressEntries)
        .where(and(...conditions))
        .limit(input.limit)
        .offset(input.offset);
    }),

  getById: protectedProcedure.input(idSchema).query(async ({ input, ctx }) => {
    const [entry] = await ctx.db
      .select()
      .from(stressEntries)
      .where(
        and(
          eq(stressEntries.id, input.id),
          eq(stressEntries.userId, ctx.user.id),
        ),
      );
    return entry ?? null;
  }),

  update: protectedProcedure
    .input(stressEntryUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const [updated] = await ctx.db
        .update(stressEntries)
        .set(data)
        .where(
          and(eq(stressEntries.id, id), eq(stressEntries.userId, ctx.user.id)),
        )
        .returning();
      return updated;
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(stressEntries)
        .where(
          and(
            eq(stressEntries.id, input.id),
            eq(stressEntries.userId, ctx.user.id),
          ),
        );
      return { success: true };
    }),
});
