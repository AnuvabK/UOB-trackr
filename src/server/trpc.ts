import { initTRPC, TRPCError } from "@trpc/server";
import type { db } from "./db";

export type Context = {
db: typeof db;
user: { id: string } | null;
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
}
return next({
    ctx: {
    ...ctx,
    user: ctx.user,
    },
});
});