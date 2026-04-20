import { StressEntry } from "@/components/forms/StressEntryForm";
import { SleepEntry } from "./validators";
import { ScreenTimeEntry } from "@/components/forms/ScreenTimeEntryForm";

export function computerSleepAverage(entries:SleepEntry[]) {
    if (!entries.length) return "0h";
    const totalHrs = entries.reduce((sum,e) => {
        const delta = new Date(e.wakeTime).getTime() - new Date(e.bedtime).getTime();
        return sum + delta / (1000*60*60);
    },0);
    return (totalHrs / entries.length).toFixed(1)+"h";
}
export function computeStressAverage(entires:StressEntry[]) {
    if (!entires.length) return 0;
    return Math.round(entires.reduce((sum,e) => sum + e.level,0)/ entires.length); 
}
export function computerScreenTotal(entries:ScreenTimeEntry[]) {
    if (!entries.length) return "0h";
    const totalMins = entries.reduce((sum,e)=>sum + e.totalMins,0)
    return (totalMins/60).toFixed(1)+"h"
}
export function computeTrend(recent:number[], previous:number[]){
    if (!recent.length || !previous.length) return {direction:"flat" as const,percentage:0}
    const recentAvg = recent.reduce((a,b)=>a+b,0)/ recent.length;
    const previousAvg = previous.reduce((a,b)=>a+b,0)/ previous.length;
    if (previousAvg == 0) return {direction:"flat",percentage:0};
    const change = ((recentAvg - previousAvg)/previousAvg)*100;
    const direction = change > 2?"up" : change <-2? "down":"flat";
    return {direction:direction, percentage:Math.round(Math.abs(change))};
}