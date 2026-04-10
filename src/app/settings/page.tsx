import { insertScreenTimeEntry, insertSleepEntry, insertStressEntry, sampleInsert } from "./server";
import ScreenTimeEntryForm from "@/components/forms/ScreenTimeEntryForm";
import SleepEntryForm from "@/components/forms/SleepEntryForm";
import StressEntryForm from "@/components/forms/StressEntryForm";

export default function Home() {  
  return (
    <div>
      <ScreenTimeEntryForm onSubmit = {insertScreenTimeEntry}/>
      <StressEntryForm onSubmit = {insertStressEntry}/>
      <SleepEntryForm onSubmit = {insertSleepEntry}/>
    </div>
  );
};


