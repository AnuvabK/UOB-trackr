'use client' // using useState

import React, { useState, useMemo } from "react";

export type SleepEntry = {
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number;
  notes: string;
};

type SleepEntryFormProps = {
  initialData?: SleepEntry;
  onSubmit: (data: SleepEntry) => void;
};

export default function SleepEntryForm({ initialData, onSubmit }: SleepEntryFormProps) {
  const [formData, setFormData] = useState<SleepEntry>(
    initialData || {
      date: new Date().toISOString().split("T")[0],
      bedtime: "22:00",
      wakeTime: "07:00",
      quality: 3,
      notes: "",
    }
  );

  const duration = useMemo(() => {
    const [bedH, bedM] = formData.bedtime.split(":").map(Number);
    const [wakeH, wakeM] = formData.wakeTime.split(":").map(Number);

    let bedDate = new Date(2000, 0, 1, bedH, bedM);
    let wakeDate = new Date(2000, 0, 1, wakeH, wakeM);

    if (wakeDate < bedDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }

    const diffMs = wakeDate.getTime() - bedDate.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    return diffHrs.toFixed(1);
  }, [formData.bedtime, formData.wakeTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6 transition-all duration-300 hover:shadow-primary/5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Record Sleep
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          How did you rest last night?
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

        <div className="grid grid-cols-2 gap-4">
          {/* Bedtime Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Bedtime
            </label>
            <input
              type="time"
              required
              value={formData.bedtime}
              onChange={(e) => setFormData({ ...formData, bedtime: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Wake Time Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Wake Time
            </label>
            <input
              type="time"
              required
              value={formData.wakeTime}
              onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Calculated Duration */}
        <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl">
          <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Duration
          </span>
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {duration} hours
          </span>
        </div>

        {/* Quality Rating */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Sleep Quality
          </label>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, quality: star })}
                className={`flex-1 py-3 text-lg rounded-xl border transition-all duration-200 ${formData.quality >= star
                    ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-indigo-300"
                  }`}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Any dreams, interruptions, or feelings?"
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
