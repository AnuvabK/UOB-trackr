import { db } from "@/server/db";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createContext({ req }: { req: Request }) {
  let user: { id: string } | null = null;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7);
    try {
      const { payload } = await jwtVerify(token, secret);
      if (payload.sub) {
        user = { id: payload.sub };
      }
    } catch {
      // invalid token
    }
  }

  return { db, user };
}
