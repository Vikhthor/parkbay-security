"use client"

import Navbar from "@/components/navbar"
import { ParkCheckin } from "./verify-entry/park-checkin";

export default function Page() {
  return (
    <div>
        <Navbar/>
        <ParkCheckin/>
    </div>
  );
}
