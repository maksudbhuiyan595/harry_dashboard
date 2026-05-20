
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  IconAnalyze,
  IconBellRinging,
  IconBuildingStore,
  IconCategory,
  IconDashboard,
  IconShieldCheck,
  IconSettings,
  IconUsers,
  IconBriefcase,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils" // Assuming you use this for classnames
import Cookies from "js-cookie";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar" // Keeping your original UI components
import Image from "next/image"
import logoImage from "../assets/Images/logo.png";
import { Button } from "./ui/button"
import { logoutAlert } from "@/utility/alert/logoutAlert"
import { toast } from "sonner"
import { useUserProfileQuery } from "@/app/api/authApi"
import { imgUrl } from "@/utility/imgUrl"
// 1. Updated data object to match the new design's navigation items
const navData = {
  adminNav: [
    {
      title: "Dashboard Overview",
      href: "/admin",
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

  const router = useRouter();

  const handleLogout = async () => {

    const res = await logoutAlert();

    if (res.isConfirmed) {

      // Remove token cookie
      Cookies.remove("admin_token");

      // Optional: Remove stored user info
      Cookies.remove("admin_user");

      toast.success("Logged out successfully ✅");

      // Redirect to login page
      router.push("/");
    }


  };


  const { data } = useUserProfileQuery({});

  return (
    <Sidebar
      collapsible="offcanvas"
      // 2. Applied new background styles using Tailwind CSS
      className="bg-[#3A3E41]  text-white"
      {...props}
    >
      <SidebarHeader className="flex bg-[#3A3E41] flex-col items-center gap-3 p-6">
        {/* 3. New header content matching the design */}

        <Link href={"/admin"}><Image src={`${imgUrl}/${data?.data?.avatar}`} alt="Admin Logo" width={87} height={87} className=" rounded-full w-16 h-16 " /></Link>

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

      <SidebarFooter className=" bg-[#3A3E41] p-4">

        <div className="flex items-center gap-2 w-full">

          <Button onClick={handleLogout} variant="destructive" className="w-full flex items-center justify-center gap-[50%] cursor-pointer  ">Log Out <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 18C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H8C8.28333 0 8.521 0.0960001 8.713 0.288C8.905 0.48 9.00067 0.717333 9 1C8.99933 1.28267 8.90333 1.52033 8.712 1.713C8.52067 1.90567 8.28333 2.00133 8 2H2V16H8C8.28333 16 8.521 16.096 8.713 16.288C8.905 16.48 9.00067 16.7173 9 17C8.99933 17.2827 8.90333 17.5203 8.712 17.713C8.52067 17.9057 8.28333 18.0013 8 18H2ZM14.175 10H7C6.71667 10 6.47933 9.904 6.288 9.712C6.09667 9.52 6.00067 9.28267 6 9C5.99933 8.71733 6.09533 8.48 6.288 8.288C6.48067 8.096 6.718 8 7 8H14.175L12.3 6.125C12.1167 5.94167 12.025 5.71667 12.025 5.45C12.025 5.18333 12.1167 4.95 12.3 4.75C12.4833 4.55 12.7167 4.44567 13 4.437C13.2833 4.42833 13.525 4.52433 13.725 4.725L17.3 8.3C17.5 8.5 17.6 8.73333 17.6 9C17.6 9.26667 17.5 9.5 17.3 9.7L13.725 13.275C13.525 13.475 13.2877 13.571 13.013 13.563C12.7383 13.555 12.5007 13.4507 12.3 13.25C12.1167 13.05 12.0293 12.8127 12.038 12.538C12.0467 12.2633 12.1423 12.034 12.325 11.85L14.175 10Z" fill="#fff" />
          </svg>
          </Button>
        </div>
      </SidebarFooter>


    </Sidebar>
  )
}