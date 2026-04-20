"use client";
import Image from "next/image";
import EntryCard from "@/components/layout/EntryCard";
import StatCard from "@/components/layout/StatCard";
import { trpc } from "@/shared/trpc";
import { useAuth } from "@/lib/useAuth";
import { useEffect, useState } from "react";
import DashboardPage from "@/components/pages/DashboardPage";
import { computerScreenTotal, computerSleepAverage, computeStressAverage, computeTrend } from "@/lib/helpers";
import SleepGraph from "@/components/graphs/SleepGraph";
const sampleEntry = {
  date: "2026-04-04",
  bedtime: "2026-04-03T22:30:00Z",
  wakeTime: "2026-04-04T06:30:00Z",
  quality: 8,
  notes: "Feeling rested today!",
};
const loading = () => {<><h1>Loading...</h1></>}
export default function Home() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem("token"));
  }, []);
  useAuth();

  let { data:user, isLoading:userLoading, error } = trpc.auth.me.useQuery(undefined, {
    enabled: hasToken,
  });
  const {data:sleepData,isLoading:sleepLoading} = trpc.sleep.list.useQuery({limit:14},{enabled:hasToken})
  const {data:stressData,isLoading:stressLoading} = trpc.stress.list.useQuery({limit:14},{enabled:hasToken})
  const {data:screenData,isLoading:screenLoading} = trpc.screentime.list.useQuery({limit:14},{enabled:hasToken})
  if (userLoading || !user) {return loading()}
  // rather than have wholy number of if statements when waiting on async query, we just return empty list and render empty graph
  const sleepList = sleepData ?? [];
  const stressList = stressData ?? [];
  const screenList = screenData ?? [];
  const [RECslp,RECstr,RECscr] = [sleepList,stressList,screenList].map((x)=>x.slice(0,7))

  const [PREslp,PREstr,PREscr] = [sleepList,stressList,screenList].map((x)=>x.slice(7,14))
  console.log(RECslp)
  const stats = {
    sleep: {
      average: computerSleepAverage(RECslp),
      trend:computeTrend(
        RECslp.map(e=> (new Date(e.wakeTime).getTime() - new Date(e.bedtime).getTime())/ 3600000),
        PREslp.map(e=> (new Date(e.wakeTime).getTime() - new Date(e.bedtime).getTime())/ 3600000),
      )
    },
    stress:{
      average:computeStressAverage(RECstr),
      trend:computeTrend(
        RECstr.map(e=>e.level),
        PREstr.map(e=>e.level)
      ),
    },
    screentime:{
      total:computerScreenTotal(RECscr),
      trend:computeTrend(RECscr.map(e=>e.totalMins),PREscr.map(e=>e.totalMins))
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white m:items-start">
        Welcome back, {user.name}
        <DashboardPage user={user} stats={stats} recentSleepEntries={[]}/>
        <SleepGraph rawData={sleepData}/>
      </main>
    </div>
  );
}
