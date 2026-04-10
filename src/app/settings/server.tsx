'use server'

import { ScreenTimeEntry } from "@/components/forms/ScreenTimeEntryForm"
import { SleepEntry } from "@/components/forms/SleepEntryForm";
import { StressEntry } from "@/components/forms/StressEntryForm";
import { db } from "@/server/db/index"
import { screentimeEntries, sleepEntries, stressEntries, users } from "@/server/db/schema";

// TODO: get uuid
function getUUID() {
  return "69ae32fa-fa66-4c76-bc02-2ef520ff315c"
}

export async function insertScreenTimeEntry( ste: ScreenTimeEntry ) {

    await db.insert(screentimeEntries).values({
      userId: getUUID(),
      date: ste.date,
      totalMins: ste.totalMins,
      category: ste.category,
      appName: ste.appName,
      notes: ste.notes
    })
    
} 

export async function insertSleepEntry( se: SleepEntry ) {
  
    console.log(se.bedtime)
    console.log(new Date(se.date + " " + se.bedtime))

    await db.insert(sleepEntries).values({
      userId: getUUID(),
      date: se.date,
      bedtime: new Date(se.date + " " + se.bedtime), // workaround, as time strings don't seem to work
      wakeTime: new Date(se.date + " " + se.wakeTime),
      quality: se.quality,
      notes: se.notes,
      cycles: null
    })

}

export async function insertStressEntry( se: StressEntry ) {
  
    await db.insert(stressEntries).values({
      userId: getUUID(),
      date: se.date,
      level: se.level,
      source: se.source,
      notes: se.notes,
  })
}

export async function sampleInsert() {
  await db.insert(users).values({
  email: "test@gmail.com",
  password: "testpass",
  name: "John Doe",
})

}
