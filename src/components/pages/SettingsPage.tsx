import React, { useState } from "react";

export type UserSettings = {
  name: string;
  email: string;
  theme: "light" | "dark" | "system";
  units: "metric" | "imperial";
  notifications: {
    general: boolean;
    reminders: boolean;
  };
};

type SettingsPageProps = {
  initialSettings?: UserSettings;
  onSave: (settings: UserSettings) => void;
};

export default function SettingsPage({ initialSettings, onSave }: SettingsPageProps) {
  const [settings, setSettings] = useState<UserSettings>(
    initialSettings || {
      name: "John Doe",
      email: "john@example.com",
      theme: "system",
      units: "metric",
      notifications: {
        general: true,
        reminders: true,
      },
    }
  );

  const handleToggle = (field: keyof UserSettings["notifications"]) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: !settings.notifications[field],
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Settings
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Manage your account and personalise your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Account Section */}
        <section className="lg:col-span-2 space-y-8">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6 transition-all duration-300 hover:shadow-primary/5">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Account Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Full Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-8 transition-all duration-300 hover:shadow-primary/5">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">App Preferences</h2>

            <div className="space-y-6">
              {/* Theme Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Appearance</h3>
                  <p className="text-sm text-zinc-500">Customise how the app looks on your device.</p>
                </div>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                  {(["light", "dark", "system"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setSettings({ ...settings, theme: t })}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${settings.theme === t
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

              {/* Units Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Measurement Units</h3>
                  <p className="text-sm text-zinc-500">Switch between Metric and Imperial systems.</p>
                </div>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                  {(["metric", "imperial"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setSettings({ ...settings, units: u })}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${settings.units === u
                        ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        }`}
                    >
                      {u.charAt(0).toUpperCase() + u.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

              {/* Notifications */}
              <div className="space-y-4">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">General Alerts</span>
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications.general ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.general}
                        onChange={() => handleToggle("general")}
                        className="sr-only"
                      />
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notifications.general ? 'translate-x-6' : ''}`} />
                    </div>
                  </label>
                  <label className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Daily Reminders</span>
                    <div className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications.reminders ? 'bg-indigo-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                      <input
                        type="checkbox"
                        checked={settings.notifications.reminders}
                        onChange={() => handleToggle("reminders")}
                        className="sr-only"
                      />
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notifications.reminders ? 'translate-x-6' : ''}`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar/Data Actions */}
        <aside className="space-y-8">
          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6 transition-all duration-300 hover:shadow-primary/5">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Data & Privacy</h2>

            <div className="space-y-3">
              <button className="w-full py-3 px-4 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2">
                <span>Export Data</span>
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-800 px-1.5 py-0.5 rounded">.csv</span>
              </button>
              <button className="w-full py-3 px-4 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2">
                <span>Export Data</span>
                <span className="text-[10px] bg-indigo-100 dark:bg-indigo-800 px-1.5 py-0.5 rounded">.json</span>
              </button>
              <button className="w-full py-3 px-4 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm">
                Download Backup
              </button>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
              <button className="w-full py-3 px-4 bg-rose-600 dark:bg-rose-700 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all text-sm shadow-lg shadow-rose-500/25">
                Delete Account
              </button>
            </div>
          </div>

          <button
            onClick={() => onSave(settings)}
            className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-500/20 dark:shadow-none"
          >
            Save Changes
          </button>
        </aside>
      </div>
    </div>
  );
}
