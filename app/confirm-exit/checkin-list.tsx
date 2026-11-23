"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "cn"
import { Field } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ListFilterIcon, MoreHorizontalIcon, SearchIcon, XIcon } from 'lucide-react'
import { Badge } from "@/components/reui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  ItemSeparator
} from "@/components/ui/item"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  CodeIcon, 
  DatabaseIcon, 
  WebhookIcon, 
  AlertTriangleIcon, 
  SquareArrowRightExitIcon,
  MotorbikeIcon,
  CarIcon,
  VanIcon,
  BusIcon
} from 'lucide-react'
import {
  addDays,
  addMinutes,
  differenceInMinutes,
  format,
  setHours,
  startOfDay,
  endOfDay,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfYear,
  startOfYear,
  addMonths,
  addHours,
  addMilliseconds
} from "date-fns"

export function CheckedInList() {
  const reservations = [
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "pending",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "bike",
      "status": "completed",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22"),
      "out_time": new Date("2026-11-20T15:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "checked-in",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "checked-in",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "bus",
      "status": "checked-in",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "pending",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "pending",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "completed",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22"),
      "out_time": new Date("2026-11-20T15:45:22")
    },
    {
      "licence_number": "LOR-EM-IPSUM",
      "vehicle_type": "car",
      "status": "completed",
      "duration": 1,
      "in_time": new Date("2026-11-20T12:45:22"),
      "out_time": new Date("2026-11-20T15:45:22")
    }
  ]

  const parkSettings = {
    "grace_period": 20,
    "penalty_rate": 200,
    "penalty_interval": "hourly"
  }

  function formatDuration(totalMinutes: number): string {
    const minutes = Math.max(0, Math.round(totalMinutes));
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const parts: string[] = [];
    if (hrs > 0) parts.push(`${hrs}hr${hrs === 1 ? "" : "s"}`);
    if (mins > 0 || hrs === 0) parts.push(`${mins}min${mins === 1 ? "" : "s"}`);

    return parts.join(" ");
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <SearchReservation/>
      <ItemGroup className="no-scrollbar max-h-[70vh] overflow-y-auto">
        {reservations.map((item)=>{
          let duration = 0
          let overstayDuration = 0
          let currentTime = new Date()
          if(item.out_time){
            currentTime = new Date(item.out_time)
          }
          const expectedCheckoutTime = addHours(item.in_time, item.duration)
          const overstayTime = addMinutes(expectedCheckoutTime, parkSettings.grace_period)
          let penalty = "0"
          if(currentTime > overstayTime){
            overstayDuration = differenceInMinutes(currentTime, overstayTime)
            penalty = (overstayDuration*parkSettings.penalty_rate).toFixed(2)
          }
          if(item.status === "checked-in"){
            duration = differenceInMinutes(currentTime, new Date(item.in_time))
          }
          const formattedDuration = formatDuration(duration)
          let overstayDescription = ""
          if(overstayDuration && item.status === "checked-in"){
            const formattedOverstayDuration = formatDuration(overstayDuration)
            overstayDescription = `Overstayed ${formattedOverstayDuration} - ₦${penalty} due`
          }
          return (
            <>
              <Item size="xs">
                <ItemMedia variant="icon">
                  {item.vehicle_type === "bike"? (
                    <MotorbikeIcon />
                  ): item.vehicle_type === "bus"? (
                    <BusIcon/>
                  ): (<CarIcon/>)}
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.licence_number} <span className="text-muted-foreground">{formattedDuration}</span></ItemTitle>
                  <ItemDescription>
                    <span className="text-destructive">{overstayDescription}</span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  {item.status === "checked-in"? (
                    <CheckoutDialog/>
                  ): item.status === "completed"? (
                    <Badge variant="success-light" size="sm">
                      Completed
                    </Badge>
                  ):(
                    <Badge variant="warning-light" size="sm">
                      Pending
                    </Badge>
                  )}
                </ItemActions>
              </Item>
              <ItemSeparator />
            </>
          )
        })}
      </ItemGroup>
    </div>
  )
}



const statuses = ["Active", "Lead", "Prospect"] as const

const statusCounts: Record<(typeof statuses)[number], number> = {
  Active: 12,
  Lead: 7,
  Prospect: 5,
}

export function SearchReservation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<
    (typeof statuses)[number][]
  >([])

  return (
    <Field className="my-4">
      <InputGroup className="h-10">
        <InputGroupAddon align="inline-start">
          <SearchIcon  aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search number plate..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <InputGroupAddon align="inline-end" className="gap-1">
          {searchQuery.length > 0 ? (
            <InputGroupButton
              aria-label="Clear search"
              size="icon-xs"
              variant="ghost"
              onClick={() => setSearchQuery("")}
            >
              <XIcon  aria-hidden="true" />
            </InputGroupButton>
          ) : null}

          <Popover>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="xs"
                  className="gap-1.5"
                  aria-label="Filter contacts"
                />
              }
            >
              <ListFilterIcon  className="size-3.5" aria-hidden="true" />
              {selectedStatuses.length > 0 ? (
                <span className="tabular-nums">{selectedStatuses.length}</span>
              ) : (
                "Status"
              )}
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-3">
              <div className="flex flex-col gap-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`contact-status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() =>
                        setSelectedStatuses((previous) =>
                          previous.includes(status)
                            ? previous.filter((item) => item !== status)
                            : [...previous, status]
                        )
                      }
                    />
                    <Label
                      htmlFor={`contact-status-${status}`}
                      className="flex grow items-center justify-between gap-1.5 font-normal"
                    >
                      {status}
                      <span className="text-muted-foreground text-xs">
                        {statusCounts[status]}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="More actions"
                />
              }
            >
              <MoreHorizontalIcon  aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuItem>Bulk email</DropdownMenuItem>
                <DropdownMenuItem>Export CSV</DropdownMenuItem>
                <DropdownMenuItem>Add contact</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}


export function CheckoutDialog() {
  const reservation = {
    "licence_number": "LOR-EM-IPSUM",
    "in_time": new Date("2026-11-20T12:45:22"),
    "duration": 1,
  }
  const parkSettings = {
    "grace_period": 20,
    "penalty_rate": 200,
    "penalty_interval": "hourly"
  }
  const currentTime = new Date()
  const expectedCheckoutTime = addHours(reservation.in_time, reservation.duration)
  const overstayTime = addMinutes(expectedCheckoutTime, parkSettings.grace_period)
  let penalty = "0"
  if(currentTime > overstayTime){
    penalty = (differenceInMinutes(currentTime, overstayTime)*parkSettings.penalty_rate).toFixed(2)
  }

  const handleCheckout = ()=>{
    // TODO: Show toast
  }
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Checkout
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="bg-destructive/10 text-destructive rounded-full flex size-10 shrink-0 items-center justify-center">
                <SquareArrowRightExitIcon className="size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <DialogTitle>Checkout</DialogTitle>
                <DialogDescription>
                  {reservation.licence_number}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <Card className="mx-auto w-full overflow-hidden p-0">
            <CardContent className="flex flex-col items-center p-0">
              {/* Status Rows */}
              <div className="w-full space-y-1 ">

                  <div
                    key="check-in"
                    className="rounded-lg flex items-center justify-between px-3 py-2.5"
                  >
                    <span className="text-foreground text-sm font-medium">
                      Checkin Time
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {reservation.in_time.toLocaleTimeString("en-NG", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                      })}
                    </span>
                  </div>

                  <div
                    key="expected-time"
                    className="rounded-lg flex items-center justify-between px-3 py-2.5"
                  >
                    <span className="text-foreground text-sm font-medium">
                      Paid until
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {expectedCheckoutTime.toLocaleTimeString("en-NG", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                      })}
                    </span>
                  </div>
                  {currentTime > overstayTime && (
                    <div
                      key="penalty"
                      className="rounded-lg flex items-center justify-between px-3 py-2.5 bg-red-600/40"
                    >
                      <span className="text-foreground text-sm font-medium">
                        Overstay Penalty
                      </span>
                      <span className="text-muted-foreground text-sm">
                        ₦{penalty}
                      </span>
                    </div>
                  )}

              </div>
            </CardContent>
          </Card>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button 
              className="bg-[#fcad03] hover:bg-[#a88420]"
              onClick={handleCheckout}
            >Confirm Checkout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
