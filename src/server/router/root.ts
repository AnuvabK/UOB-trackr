import { router } from "@/server/trpc";
import { authRouter } from "@/server/router/auth";
import { sleepRouter } from "@/server/router/sleep";
import { stressRouter } from "@/server/router/stress";
import { screentimeRouter } from "@/server/router/screentime";

export const appRouter = router({
  auth: authRouter,
  sleep: sleepRouter,
  stress: stressRouter,
  screentime: screentimeRouter,
});

export type AppRouter = typeof appRouter;
