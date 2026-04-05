import { router, publicProcedure } from "@/server/trpc";
import { registerSchema, loginSchema } from "@/lib/validators";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";
import { SignJWT } from "jose";
import { TRPCError } from "@trpc/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      const existing = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, input.email));

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is already in use",
        });
      }

      const hashedPassword = await hash(input.password, 12);

      const [newUser] = await ctx.db
        .insert(users)
        .values({
          email: input.email,
          password: hashedPassword,
          name: input.name,
        })
        .returning();

      const token = await new SignJWT({ sub: newUser.id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);

      return { token };
    }),

  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const [user] = await ctx.db
      .select()
      .from(users)
      .where(eq(users.email, input.email));

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }
    // TODO: password is not encrypted!?!?!?!? WHAT HASHING DO WE USE
    // TODO: this means someone can reverse engineer password from JWT package
    const valid = await compare(input.password, user.password);

    if (!valid) {
      throw new TRPCError({
        code: "UNAUTHORIZED",// Package is americanised no english english version
        message: "Invalid password",
      });
    }

    const token = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    return { token };
  }),
});
