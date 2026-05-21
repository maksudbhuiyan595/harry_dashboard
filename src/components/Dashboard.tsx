"use client";

import React from "react";
import {
    IconUsers,
    IconBriefcase,
    IconFileText,
    IconBuildingStore,
    IconFlag,
} from "@tabler/icons-react";
import StatCard from "./ui/StateCard";
import RecentActivity from "./ui/RecentAcvity";
import UserGrowth from "./ui/UserGrowth";
import { useDashboardOverviewQuery } from "@/app/api/dashboardApi";

function Dashboard() {
    const { data } = useDashboardOverviewQuery(undefined);
    const statasData = data?.stats || null;


    return (
        <div
            className="min-h-screen p-8"
            style={{
                background:
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13",
            }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white pb-4">
                    Dashboard Overview
                </h1>
                <div className="text-sm text-gray-400">
                    Last Updated: 8/19/2025, 12:02 PM
                </div>
            </div>

            {/* Removed loop → Manually added StatCard components */}
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

                <StatCard
                    title="Total Users"
                    value={statasData?.users?.total_users || 0}
                    percentage={`${statasData?.users?.total_users_growth || 0}%`}
                    icon={IconUsers}
                    iconBgColor="bg-[#4593F5]"
                    percentageColor={
                        statasData?.users?.total_users_growth >= 0
                            ? "text-[#1BCF30]"
                            : "text-[#F23134]"
                    }
                />

                <StatCard
                    title="Active Job Listings"
                    value={statasData?.jobs?.active_job_listings || 0}
                    percentage={`${statasData?.jobs?.active_jobs_growth || 0}%`}
                    icon={IconBriefcase}
                    iconBgColor="bg-[#1BCF30]"
                    percentageColor={
                        statasData?.jobs?.active_jobs_growth >= 0
                            ? "text-[#1BCF30]"
                            : "text-[#F23134]"
                    }
                />

                <StatCard
                    title="Content Posted"
                    value={statasData?.content?.content_posted || 0}
                    percentage={`${statasData?.content?.content_growth || 0}%`}
                    icon={IconFileText}
                    iconBgColor="bg-[#AE2DCE]"
                    percentageColor={
                        statasData?.content?.content_growth >= 0
                            ? "text-[#1BCF30]"
                            : "text-[#F23134]"
                    }
                />

                <StatCard
                    title="Business Profile"
                    value={`${statasData?.business?.business_profiles || 0}`}
                    percentage={`${statasData?.business?.business_growth || 0}%`}
                    icon={IconBuildingStore}
                    iconBgColor="bg-[#CC7E11]"
                    percentageColor={
                        statasData?.business?.business_growth >= 0
                            ? "text-[#1BCF30]"
                            : "text-[#F23134]"
                    }
                />

                <StatCard
                    title="Reported Posts"
                    value={`${statasData?.reports?.reported_posts || 0}`}
                    percentage={`${statasData?.reports?.reported_growth || 0}%`}
                    icon={IconFlag}
                    iconBgColor="bg-[#F23134]"
                    percentageColor={
                        statasData?.reports?.reported_growth >= 0
                            ? "text-[#1BCF30]"
                            : "text-[#F23134]"
                    }
                />

            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
                <RecentActivity />
                <UserGrowth />
            </div>
        </div>
    );
}

export default Dashboard;
