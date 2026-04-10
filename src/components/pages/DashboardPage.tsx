
export default function Dashboard() {
    return (
        <div>
        </div>
    );
} 
import type { SleepEntry } from "@/lib/validators";
import StatCard from "@/components/layout/StatCard";
import EntryCard from "@/components/layout/EntryCard";

export type DashboardPageProps = {
  user: {
    name: string;
  };
  stats: {
    sleep: {
      average: string;
      trend: { direction: "up" | "down" | "flat"; percentage: number };
    };
    stress: {
      average: number;
      trend: { direction: "up" | "down" | "flat"; percentage: number };
    };
    screentime: {
      total: string;
      trend: { direction: "up" | "down" | "flat"; percentage: number };
    };
  };
  recentSleepEntries: SleepEntry[];
};

export default function DashboardPage({
  user,
  stats,
  recentSleepEntries,
}: DashboardPageProps) {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold font-sans">Good morning, {user.name}</h1>
        <p className="text-gray-500">Here's your health summary for today.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
        <StatCard
          title="Avg. Sleep"
          value={stats.sleep.average}
          trend={stats.sleep.trend}
        />
        <StatCard
          title="Stress Level"
          value={`${stats.stress.average}/10`}
          trend={stats.stress.trend}
        />
        <StatCard
          title="Screen Time"
          value={stats.screentime.total}
          trend={stats.screentime.trend}
        />
      </div>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4 font-sans">Recent Sleep Logs</h2>
        <div className="space-y-4">
          {recentSleepEntries.map((entry, index) => (
            <EntryCard key={index} entry={entry} />
          ))}
          {recentSleepEntries.length === 0 && (
            <p className="text-sm italic text-gray-500">No entries yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
