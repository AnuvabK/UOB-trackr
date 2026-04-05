"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/shared/trpc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = trpc.auth.login.useMutation({
    onSuccess(data) {
      localStorage.setItem("token", data.token);
      router.push("/");
    },
    onError(err) {
      setError(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    login.mutate({ email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Log in</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {login.isPending ? "Logging in..." : "Log in"}
        </button>

        <p className="text-sm text-center text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-zinc-900 dark:text-white underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
