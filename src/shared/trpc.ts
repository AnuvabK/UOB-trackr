import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/router/root";

export const trpc = createTRPCReact<AppRouter>();
