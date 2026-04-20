import { useState } from "react";
import Link from "next/link";

type LoginFormProps = {
    onSubmit: (data: {email: string; password: string}) => void;
    loading?: boolean;
    error?: string;
};

export function LoginForm({onSubmit, loading, error}: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
    
        <div className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5">

            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ email, password });
            }}>

            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Log in</h2>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <br></br>

            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
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

            <br></br>

            <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
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

            <br></br>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black text-white rounded-xl disabled:opacity-50"
            >
            {loading ? "Logging in..." : "Log in"}
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