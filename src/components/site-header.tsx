"use client"

import * as React from "react"
import Image from "next/image"
import { IconCalendar, IconClock } from "@tabler/icons-react"
import { SidebarTrigger } from "./ui/sidebar"
import avater from '../assets/Images/avater.png'
export function SiteHeader() {
  // State to hold the current date and time
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date())

  // Effect to update the time every second
  React.useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerId)
  }, [])

  // Format the date and time for display
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <header
      className="flex -mt-8  w-full bg-[#3A3E41]  items-center justify-between px-6 py-4 text-white rounded-t-xl mx-0.5"

    >
      {/* Left Section: Title, Date, and Time */}
      <div className="flex flex-row items-center justify-between gap-1.5 ">
        <div>
          <SidebarTrigger className="-ml-1" />

        </div>
        <div className="border-l border-gray-300 pl-2">

          <h1 className=" text-[19px] font-semibold leading-tight">
            Dashboard
          </h1>
          <div className="flex items-center gap-3 text-xs  text-gray-200">
            <div className="flex items-center gap-1.5">
              <IconCalendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: User Info */}
      <div className="flex items-center gap-4">
        <Image
          src={avater}
          alt="User Avatar"
          width={43}
          height={43}
          className="rounded-full"
        />
        <div className="flex flex-col ">
          <span className="text-base font-bold leading-tight">Harry</span>
          <span className="text-xs font-medium text-gray-300">Admin</span>
        </div>
      </div>
    </header>
  )
}