'use client' // using useState

import React, { useState } from "react";

export type StressEntry = {
    date: string;
    level: number;
    source: string;
    notes: string;
};

type StressEntryFormProps = {
    initialData?: StressEntry;
    onSubmit: (data: StressEntry) => void;
};

export default function StressEntryForm({ initialData, onSubmit }: StressEntryFormProps) {
    const [formData, setFormData] = useState<StressEntry>(
        initialData || {
            date: new Date().toISOString().split("T")[0],
            level: 5,
            source: "",
            notes: "",
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const getLevelColor = (lvl: number) => {
        if (lvl <= 3) return "bg-emerald-500 border-emerald-500 shadow-emerald-500/30";
        if (lvl <= 7) return "bg-amber-500 border-amber-500 shadow-amber-500/30";
        return "bg-rose-500 border-rose-500 shadow-rose-500/30";
    };

    const getLevelLabel = (lvl: number) => {
        if (lvl <= 3) return "Low";
        if (lvl <= 7) return "Moderate";
        return "High";
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Record Stress
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    How are you feeling right now?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* Date Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Date
                    </label>
                    <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                {/* Stress Level Rating */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Stress Level (1-10)
                        </label>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${formData.level <= 3 ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-400 bg-emerald-500/20" :
                            formData.level <= 7 ? "text-amber-600 bg-amber-50 dark:bg-amber-500/10 text-amber-400 bg-amber-500/20" :
                                "text-rose-600 bg-rose-50 dark:bg-rose-500/10 text-rose-400 bg-rose-500/20"
                            }`}>
                            {getLevelLabel(formData.level)}
                        </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setFormData({ ...formData, level: num })}
                                className={`py-2.5 text-sm font-bold rounded-xl border transition-all duration-200 ${formData.level === num
                                    ? `${getLevelColor(num)} text-white shadow-lg`
                                    : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Source Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Primary inducer
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Work, Exam, Social"
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="What's on your mind? Any physical symptoms?"
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-500/10 dark:shadow-none"
            >
                Submit
            </button>
        </form>
    );
}
