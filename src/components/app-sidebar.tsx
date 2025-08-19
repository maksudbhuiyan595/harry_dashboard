
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconAnalyze,
  IconBellRinging,
  IconBuildingStore,
  IconCategory,
  IconDashboard,
  IconFileText,
  IconShieldCheck,
  IconSettings,
  IconUsers,
  IconBriefcase,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils" // Assuming you use this for classnames

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar" // Keeping your original UI components
import Image from "next/image"
import logoImage from "../assets/Images/logo.png";
// 1. Updated data object to match the new design's navigation items
const navData = {
  adminNav: [
    {
      title: "Dashboard Overview",
      href: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: IconUsers,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: IconCategory,
    },
    {
      title: "Business Profiles",
      href: "/admin/profiles",
      icon: IconBuildingStore,
    },
    {
      title: "Job Management",
      href: "/admin/jobs",
      icon: IconBriefcase,
    },
    {
      title: "Content Moderation",
      href: "/admin/moderation",
      icon: IconShieldCheck,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: IconAnalyze,
    },
    {
      title: "Notification Manager",
      href: "/admin/notifications",
      icon: IconBellRinging,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="offcanvas"
      // 2. Applied new background styles using Tailwind CSS
      className="bg-[#3A3E41]  text-white"
      {...props}
    >
      <SidebarHeader className="flex bg-[#3A3E41] flex-col items-center gap-3 p-6">
        {/* 3. New header content matching the design */}

        <Image src={logoImage} alt="Admin Logo" width={87} height={87} />

        <div className="flex items-center gap-2">
          <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4265 10.9022C8.01481 10.9022 7.32345 5.7321 7.32345 5.7321C6.91766 3.04183 8.15007 0.00588989 11.3814 0.00588989C14.6278 0.00588989 15.8602 3.04183 15.4544 5.7321C15.4544 5.7321 14.8382 10.9022 11.4265 10.9022ZM11.4265 14.7648L15.5145 12.0294C19.1065 12.0294 22.3078 15.5313 22.3078 18.8378V22.5801C22.3078 22.5801 16.8221 24.2784 11.4265 24.2784C5.94074 24.2784 0.545181 22.5801 0.545181 22.5801V18.8378C0.545181 15.4561 3.46089 12.1046 7.26334 12.1046L11.4265 14.7648Z" fill="#4593F5" />
          </svg>

          <span className="text-2xl font-bold text-[#4593F5]">Admin</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 px-4 bg-[#3A3E41]">
        {/* 4. Mapped over the new data to create the navigation list */}
        <nav className="flex flex-col gap-2">
          {navData.adminNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-md px-3 py-2 text-base font-semibold transition-colors hover:bg-[#4593F5]/90",
                  isActive ? "bg-[#4593F5]" : "hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </SidebarContent>

      {/* 5. The SidebarFooter was removed as it is not in the new design */}
    </Sidebar>
  )
}