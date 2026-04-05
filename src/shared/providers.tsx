"use client";

  import { useState } from "react";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { httpBatchLink } from "@trpc/client";
  import { trpc } from "@/shared/trpc";

  export function TRPCProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
      trpc.createClient({
        links: [
          httpBatchLink({
            url: "/api/trpc",
            headers() {
              const token = localStorage.getItem("token");
              return token ? { authorization: `Bearer ${token}` } : {};
            },
          }),
        ],
      })
    );

    return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    );
  }