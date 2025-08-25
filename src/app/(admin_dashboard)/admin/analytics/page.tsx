"use client";

import { IconUsers, IconUserCheck, IconActivity, IconEye } from '@tabler/icons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// --- MOCK DATA ---
const userGrowthData = [
    { month: 'Jan', signups: 400 }, { month: 'Feb', signups: 300 },
    { month: 'Mar', signups: 500 }, { month: 'Apr', signups: 450 },
    { month: 'May', signups: 600 }, { month: 'Jun', signups: 800 },
];
const trafficSourceData = [
    { name: 'Organic Search', value: 450 }, { name: 'Direct', value: 300 },
    { name: 'Referral', value: 200 }, { name: 'Social Media', value: 150 },
];
const topPagesData = [
    { path: '/jobs/senior-developer', views: 1250 },
    { path: '/profiles/tech-innovators', views: 980 },
    { path: '/blog/future-of-ai', views: 850 },
    { path: '/categories/technology', views: 720 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- REUSABLE COMPONENTS ---
const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string, value: string, icon: React.ElementType, change: string, changeType: 'increase' | 'decrease' }) => (
    <Card className="bg-[#3A3E41] border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
            <Icon className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
            <p className={`text-xs ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                {change} from last month
            </p>
        </CardContent>
    </Card>
);



// --- MAIN PAGE COMPONENT ---
function AnalyticsPage() {
    return (
        <div className="flex min-h-screen w-full bg-[#0F0E13] text-white">


            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>

                {/* Stat Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <StatCard title="Total Users" value="12,450" icon={IconUsers} change="+15.2%" changeType="increase" />
                    <StatCard title="Active Users" value="9,870" icon={IconUserCheck} change="-2.1%" changeType="decrease" />
                    <StatCard title="Engagement Rate" value="65.8%" icon={IconActivity} change="+5.5%" changeType="increase" />
                    <StatCard title="Total Page Views" value="1.2M" icon={IconEye} change="+20.1%" changeType="increase" />
                </div>

                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Chart */}
                    <Card className="lg:col-span-2 bg-[#3A3E41] border-gray-700 text-white p-4">
                        <CardHeader><CardTitle>User Signups Over Time</CardTitle></CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                                    <XAxis dataKey="month" stroke="#888888" />
                                    <YAxis stroke="#888888" />
                                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #555' }} />
                                    <Area type="monotone" dataKey="signups" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Pie Chart */}
                    <Card className="bg-[#3A3E41] border-gray-700 text-white p-4">
                        <CardHeader><CardTitle>Traffic by Source</CardTitle></CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={trafficSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
                                        {trafficSourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #555' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Data Table */}
                    <Card className="lg:col-span-3 bg-[#3A3E41] border-gray-700 text-white">
                        <CardHeader><CardTitle>Top Performing Pages</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-gray-700 hover:bg-transparent">
                                        <TableHead className="text-white">Page Path</TableHead>
                                        <TableHead className="text-right text-white">Views</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topPagesData.map(page => (
                                        <TableRow key={page.path} className="border-gray-700">
                                            <TableCell className="font-medium">{page.path}</TableCell>
                                            <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

export default AnalyticsPage;