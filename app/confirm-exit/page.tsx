"use client"

import Navbar from "@/components/navbar"
// import EntryLogForm from "./entry-log";
import { CheckedInList } from "./checkin-list";

export default function Page() {
  return (
    <div>
        <Navbar/>
        <CheckedInList/>
    </div>
  );
}