'use client';
import { SleepEntry } from '@/lib/validators';
import './Graphs.css';
import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { multipleOf } from 'zod';



interface FormattedSleepEntry {
    date: string;
    totalMins: number;
    light: number;
    deep: number;
    rem: number;
    quality: number;
}

type SleepGraphProps = {
    rawData?: SleepEntry[];
};

const SleepGraph = ({ rawData }: SleepGraphProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0].slice(0, 7));
    const [toggled, setToggled] = useState(false);
    const [toggleTotal, setToggleTotal] = useState(false);
    const [toggleDay, setToggleDay] = useState(false);

    let data = rawData?.filter((entry) => entry.date.startsWith(selectedDate)) || [];

    const formatXAxis = (date: string) => {
    if (date.length === 7) {
      return date.split('-')[2];
    }
    
    if (selectedDate.length === 4) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      return months[parseInt(date.split('-')[1]) - 1];
    }

    else {
      return date.split('-')[2];
    }
  };

    const addTime = (data: SleepEntry[], total: FormattedSleepEntry[], dataLength: number) => {
        for (let i = 0; i < dataLength; i++) {
            const bedDate = new Date(data[i].bedtime)
            const wakeDate = new Date(data[i].wakeTime)
            let totalMins = (wakeDate.getTime()-bedDate.getTime() )/60000;;
        
            const date = data[i].date;
            const month = parseInt(date.split('-')[1]);

            if ((parseInt([0]) * 60 + parseInt(wakeTime[1])) - (parseInt(bedTime[0]) * 60 + parseInt(bedTime[1])) < 0) {
                let nightMins = 24 * 60 - (parseInt(bedTime[0]) * 60 + parseInt(bedTime[1]));
                let morningMins = parseInt(wakeTime[0]) * 60 + parseInt(wakeTime[1]);
                totalMins += nightMins;
                totalMins += morningMins;
                //I need to replace this with a means to add morning mins to the next day
            }

            else{
                totalMins = (parseInt(wakeTime[0]) * 60 + parseInt(wakeTime[1])) - (parseInt(bedTime[0]) * 60 + parseInt(bedTime[1]));
            }

            total[month - 1].totalMins += totalMins;

            if (data[i].cycles === "light") {
                total[month - 1].light += totalMins;
            }
            else if (data[i].cycles === "deep") {
                total[month - 1].deep += totalMins;
            }
            else if (data[i].cycles === "rem") {
                total[month - 1].rem += totalMins;
            }
        }

        return total;

    }

    const formatData = (newData: SleepEntry[]) => {
        const dataLength = data.length;

        if (selectedDate.length === 4) {
            let total = [{date: `${selectedDate}-01-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-02-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-03-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-04-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-05-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-06-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0},{date: `${selectedDate}-07-01`, totalMins: 0,light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-08-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-09-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-10-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-11-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-12-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}];
            total = addTime(data, total, dataLength);
            return total;
        }

        else if (selectedDate.split('-')[1] === "01" || selectedDate.split('-')[1] === "03" || selectedDate.split('-')[1] === "05" || selectedDate.split('-')[1] === "07" || selectedDate.split('-')[1] === "08" || selectedDate.split('-')[1] === "10" || selectedDate.split('-')[1] === "12") {
        let total = [{date: `${selectedDate}-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-02`, totalMins: 0, light: 0, deep: 0, rem: 0,  quality: 0}, {date: `${selectedDate}-03`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-04`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-05`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-06`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-07`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-08`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-09`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-10`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-11`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date:`${selectedDate}-12`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-13`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-14`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-15`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-16`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-17`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-18`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-19`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-20`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-21`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-22`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-23`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date:`${selectedDate}-24`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-25`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-26`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-27`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-28`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-29`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-30`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date: `${selectedDate}-31`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}];
        total = addTime(data, total, dataLength);
            
            return total;
        }
        else if (selectedDate.split('-')[1] === "02" && parseInt(selectedDate.split('-')[0]) % 4 === 0) {
            let total = [{date: `${selectedDate}-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-02`, totalMins: 0, light: 0, deep: 0, rem: 0,  quality: 0}, {date: `${selectedDate}-03`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-04`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-05`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-06`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-07`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-08`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-09`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-10`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-11`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date:`${selectedDate}-12`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-13`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-14`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-15`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-16`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-17`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-18`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-19`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-20`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-21`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-22`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-23`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date:`${selectedDate}-24`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-25`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-26`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-27`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-28`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date: `${selectedDate}-29`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}];
            total = addTime(data, total, dataLength);
            return total;
        }

        else if (selectedDate.split('-')[1] === "02") {
            let total = [{date: `${selectedDate}-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-02`, totalMins: 0, light: 0, deep: 0, rem: 0,  quality: 0}, {date: `${selectedDate}-03`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-04`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-05`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-06`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-07`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-08`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-09`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-10`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-11`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date:`${selectedDate}-12`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-13`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-14`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-15`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-16`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-17`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-18`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-19`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-20`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-21`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-22`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-23`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date:`${selectedDate}-24`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-25`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-26`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-27`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-28`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}];
            total = addTime(data, total, dataLength);
            return total;
        }

        else if (selectedDate.split('-')[1] === "04" || selectedDate.split('-')[1] === "06" || selectedDate.split('-')[1] === "09" || selectedDate.split('-')[1] === "11") {
        let total = [{date: `${selectedDate}-01`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-02`, totalMins: 0, light: 0, deep: 0, rem: 0,  quality: 0}, {date: `${selectedDate}-03`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-04`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-05`, totalMins: 0, light: 0, deep: 0, rem: 0, quality: 0}, {date: `${selectedDate}-06`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-07`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-08`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-09`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-10`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date: `${selectedDate}-11`, totalMins: 0, light: 0, deep: 0, rem : 0, quality: 0}, {date:`${selectedDate}-12`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-13`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-14`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-15`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-16`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-17`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-18`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-19`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-20`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-21`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-22`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date:`${selectedDate}-23`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}, {date:`${selectedDate}-24`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-25`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-26`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-27`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-28`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-29`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0} , {date: `${selectedDate}-30`, totalMins : 0 , light : 0 , deep : 0 , rem : 0, quality: 0}];
            total = addTime(data, total, dataLength);
            return total;
        }
        return [];
    };

    const finalData = formatData(data);

    const [hideLight, setHideLight] = useState(false);
    const [hideDeep, setHideDeep] = useState(false);
    const [hideRem, setHideRem] = useState(false); 

    const hideCategories = 
    <div className="flex items-center justify-start mb-4">
        <form>
            <label htmlFor = "hideLight"> Hide light sleep: </label>
            <input type = "checkbox" id = "hideLight" name="hideLight" onChange={(e) => setHideLight(e.target.checked)}/>
            <label htmlFor = "hideDeep"> Hide deep sleep: </label>
            <input type = "checkbox" id = "hideDeep" name="hideDeep" onChange={(e) => setHideDeep(e.target.checked)}/>
            <label htmlFor = "hideRem"> Hide rem sleep: </label>
            <input type = "checkbox" id = "hideRem" name="hideRem" onChange={(e) => setHideRem(e.target.checked)}/>
        </form>

    </div>

    const toggleMonthYear = 
        <div className="w-full h-96"> 
            <div className="flex items-center justify-between mb-4">
                <div className='w-full h-96'>
                    <button className = "toggle-button" onClick={() => setToggled(!toggled)}> 
                    {toggled ? "Switch to Month View" : "Switch to Year View"}
                    </button>
                </div>
            </div>
        </div>

    const MultiSleepGraph = 
    <ResponsiveContainer minWidth={0} minHeight={0} width={800} height={300}>
        <AreaChart width={800} height={300} data={finalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} minTickGap={10} domain = {["auto", "auto"]}/>
            <YAxis dataKey = "totalMins"/>
            <Area type="monotone" dataKey="light" stroke="#da69de" fill="#da69de" stackId="1" hide = {hideLight}/>
            <Area type="monotone" dataKey="deep" stroke="#82ca9d" fill="#82ca9d" stackId="1" hide = {hideDeep}/>
            <Area type="monotone" dataKey="rem" stroke="#ffc658" fill="#ffc658" stackId="1" hide = {hideRem}/>            
            <Legend />
            <Tooltip />
       </AreaChart>
    </ResponsiveContainer>
    //do seperate view for quality

  if (toggled) {
    return ( 
    
    <div className="w-full h-96">
      <div className="flex items-center justify-between mb-4">
        {hideCategories}
        {toggleMonthYear}
        <form>
            <label htmlFor = "selectYear"> Select year: </label>
            <input type = "number" id = "selectYear" name="selectYear" value = {selectedDate} min = "2000" max = "2027" onChange={(e) => setSelectedDate(e.target.value)}/>
        </form>
      </div>
    {MultiSleepGraph}
    </div>
    )
  }

  else {
    return (
    <div className="w-full h-96">
      <div className="flex items-center justify-between mb-4">
        {hideCategories}
        {toggleMonthYear}
        <form>
            <label htmlFor = "selectMonth"> Select month: </label>
            <input type = "month" id = "selectMonth" name="selectMonth" value = {selectedDate} onChange={(e) => setSelectedDate(e.target.value)}/>
        </form>
      </div>
        {MultiSleepGraph}
    </div>
    )
    }
    
}
export default SleepGraph;