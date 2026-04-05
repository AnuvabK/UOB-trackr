"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/shared/trpc";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = trpc.auth.register.useMutation({
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    register.mutate({ email, password, name });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create account</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

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
            minLength={8}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <p className="text-xs text-zinc-400 mt-1">At least 8 characters</p>
        </div>

        <button
          type="submit"
          disabled={register.isPending}
          className="w-full py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {register.isPending ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-sm text-center text-zinc-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-zinc-900 dark:text-white underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
