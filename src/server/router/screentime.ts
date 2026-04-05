import { router, protectedProcedure } from "@/server/trpc";
import {
  screentimeEntrySchema,
  screentimeEntryUpdateSchema,
  paginatedDateRangeSchema,
  idSchema,
} from "@/lib/validators";
import { screentimeEntries } from "@/server/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export const screentimeRouter = router({
  create: protectedProcedure
    .input(screentimeEntrySchema)
    .mutation(async ({ input, ctx }) => {
      const [entry] = await ctx.db
        .insert(screentimeEntries)
        .values({ ...input, userId: ctx.user.id })
        .returning();
      return entry;
    }),

  list: protectedProcedure
    .input(paginatedDateRangeSchema)
    .query(async ({ input, ctx }) => {
      const conditions = [eq(screentimeEntries.userId, ctx.user.id)];

      if (input.startDate) {
        conditions.push(gte(screentimeEntries.date, input.startDate));
      }
      if (input.endDate) {
        conditions.push(lte(screentimeEntries.date, input.endDate));
      }

      return ctx.db
        .select()
        .from(screentimeEntries)
        .where(and(...conditions))
        .limit(input.limit)
        .offset(input.offset);
    }),

  getById: protectedProcedure.input(idSchema).query(async ({ input, ctx }) => {
    const [entry] = await ctx.db
      .select()
      .from(screentimeEntries)
      .where(
        and(
          eq(screentimeEntries.id, input.id),
          eq(screentimeEntries.userId, ctx.user.id),
        ),
      );
    return entry ?? null;
  }),

  update: protectedProcedure
    .input(screentimeEntryUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const [updated] = await ctx.db
        .update(screentimeEntries)
        .set(data)
        .where(
          and(
            eq(screentimeEntries.id, id),
            eq(screentimeEntries.userId, ctx.user.id),
          ),
        )
        .returning();
      return updated;
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(screentimeEntries)
        .where(
          and(
            eq(screentimeEntries.id, input.id),
            eq(screentimeEntries.userId, ctx.user.id),
          ),
        );
      return { success: true };
    }),
});
