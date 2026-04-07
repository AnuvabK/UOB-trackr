import Image from "next/image";
import EntryCard from "@/components/layout/EntryCard";
import StatCard from "@/components/layout/StatCard";

const sampleEntry = {
  date: "2026-04-04",
  bedtime: "2026-04-03T22:30:00Z",
  wakeTime: "2026-04-04T06:30:00Z",
  quality: 8,
  notes: "Feeling rested today!",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <EntryCard entry={sampleEntry} />
        <StatCard title={"Avg sleep"} value={"7.2h"} />
        <StatCard title={""} value={""}/>
      </main>
    </div>
  );
}
