"use client"; // Add "use client" at the top

import React from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import {
    IconUsers,
    IconBriefcase,
    IconFileText,
    IconBuildingStore,
    IconFlag,
    IconArrowUpRight,
} from "@tabler/icons-react";
import StatCard from "./ui/StateCard";
import RecentActivity from "./ui/RecentAcvity";
import UserGrowth from "./ui/UserGrowth";



const kpiData = [
    {
        title: "Total Users",
        value: "24,450",
        percentage: "+12.5%",
        icon: IconUsers,
        iconBgColor: "bg-[#4593F5]",
        percentageColor: "text-[#1BCF30]",
    },
    {
        title: "Active Job Listings",
        value: "456",
        percentage: "+12.5%",
        icon: IconBriefcase,
        iconBgColor: "bg-[#1BCF30]",
        percentageColor: "text-[#1BCF30]",
    },
    {
        title: "Content Posted",
        value: "23",
        percentage: "+12.5%",
        icon: IconFileText,
        iconBgColor: "bg-[#AE2DCE]",
        percentageColor: "text-[#1BCF30]",
    },
    {
        title: "Business Profile",
        value: "24,450",
        percentage: "-2.5%",
        icon: IconBuildingStore,
        iconBgColor: "bg-[#CC7E11]",
        percentageColor: "text-[#CF2A1B]",
    },
    {
        title: "Reported Posts",
        value: "7",
        percentage: "+12.5%",
        icon: IconFlag,
        iconBgColor: "bg-[#F23134]",
        percentageColor: "text-[#1BCF30]",
    },
];


function Dashboard() {
    return (
        <div className="min-h-screen p-8 " style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <div className=" flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white pb-4">Dashboard Overview</h1>
                <div className="text-sm text-gray-400">
                    Last Updated: 8/19/2025, 12:02 PM
                </div>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {kpiData.map((item, index) => (
                    <StatCard key={index} {...item} />
                ))}
            </div>
            <div className="flex flex-col gap-8 lg:flex-row">
                <RecentActivity />
                <UserGrowth />
            </div>
        </div>
    );
}

export default Dashboard;