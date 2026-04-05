import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/context";
import { appRouter } from "@/server/router/root";

// trpc route handler
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext({ req }),
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`tRPC error on ${path ?? "<no path>"}:`, error);
          }
        : undefined,
  });

export { handler as GET, handler as POST };
