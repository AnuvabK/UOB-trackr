import Image from "next/image";
import EntryCard from "@/components/layout/EntryCard";
import StatCard from "@/components/layout/StatCard";

import { db } from "@/db"
import * as p from "drizzle-orm/pg-core"

const sampleEntry = {
  date: "2026-04-04",
  bedtime: "2026-04-03T22:30:00Z",
  wakeTime: "2026-04-04T06:30:00Z",
  quality: 8,
  notes: "Feeling rested today!",
};

export const screen = p.pgTable("screen", {
  uid: p.integer().primaryKey(),
  date: p.date().notNull(),
  hrs: p.integer().notNull(),
  mins: p.integer().notNull(),
  cat: p.text().notNull(),
  app: p.text(),
  notes: p.text()
});

async function insertScreenTimeEntry(
  uid: number, date: Date, hrs: number, mins: number, cat: string, app?: string, notes?: string) {

  console.log(app)
  console.log(notes)
  
  await db.insert(screen).values({
    uid: uid,
    date: date,
    hrs: hrs,
    mins: mins,
    cat: cat,
    app: app,
    notes: notes
  })
} 

try {
  await insertScreenTimeEntry(
    1, new Date(2026, 4), 12, 40
  );    
}
catch (error) {
  console.log("The error is " + error)
}

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
