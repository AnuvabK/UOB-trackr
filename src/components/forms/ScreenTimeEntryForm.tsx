'use client' // using useState

import React, { useState, useMemo } from "react";

export type ScreenTimeCategory = "social" | "entertainment" | "productivity" | "education" | "other";

export type ScreenTimeEntry = {
  date: string;
  totalMins: number;
  category: ScreenTimeCategory;
  appName?: string;
  notes?: string;
};

type ScreenTimeEntryFormProps = {
  initialData?: ScreenTimeEntry;
  onSubmit: (data: ScreenTimeEntry) => void;
};

export default function ScreenTimeEntryForm({ initialData, onSubmit }: ScreenTimeEntryFormProps) {
  const [formData, setFormData] = useState({
    date: initialData?.date || new Date().toISOString().split("T")[0],
    hours: Math.floor((initialData?.totalMins || 0) / 60),
    minutes: (initialData?.totalMins || 0) % 60,
    category: initialData?.category || "social" as ScreenTimeCategory,
    appName: initialData?.appName || "",
    notes: initialData?.notes || "",
  });

  const totalMins = useMemo(() => {
    return (Number(formData.hours) || 0) * 60 + (Number(formData.minutes) || 0);
  }, [formData.hours, formData.minutes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: formData.date,
      totalMins,
      category: formData.category,
      appName: formData.appName,
      notes: formData.notes,
    });
  };

  const categories: { value: ScreenTimeCategory; label: string; icon: string }[] = [
    { value: "social", label: "Social", icon: "📱" },
    { value: "entertainment", label: "Fun", icon: "🎮" },
    { value: "productivity", label: "Work", icon: "💼" },
    { value: "education", label: "Study", icon: "📚" },
    { value: "other", label: "Other", icon: "✨" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Screen Time
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          How much time did you spend digitally today?
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

        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Hours
            </label>
            <input
              type="number"
              min="0"
              max="24"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Minutes
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={formData.minutes}
              onChange={(e) => setFormData({ ...formData, minutes: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Category
          </label>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat.value })}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-200 ${
                  formData.category === cat.value
                    ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-indigo-300"
                }`}
              >
                <span className="text-xl mb-1">{cat.icon}</span>
                <span className="text-[10px] font-bold uppercase">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Optional App Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            App Name (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Instagram, VS Code, Kindle"
            value={formData.appName}
            onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
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
            placeholder="What were you doing? Any reflections?"
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
