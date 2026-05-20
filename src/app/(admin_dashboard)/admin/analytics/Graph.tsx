"use client";


import { useAnalycisDataQuery } from '@/app/api/analycisApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobsArtType } from '@/utility/type/analycisType';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, } from 'recharts';

const trafficSourceData = [
    { name: 'Organic Search', value: 450 }, { name: 'Direct', value: 300 },
    { name: 'Referral', value: 200 }, { name: 'Social Media', value: 150 },
];



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];




// --- MAIN PAGE COMPONENT ---
function Graph() {


    const { data } = useAnalycisDataQuery(undefined);

    const monthlyUsers = data?.data?.user_growth?.monthly?.new_users;

    const chartData = monthlyUsers ? Object.values(monthlyUsers) : [];


    const jobData: JobsArtType[] = data?.data?.jobs_by_art?.monthly || [];






    return (
        <div className="flex  w-full bg-[#0F0E13] text-white">


            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-8">Analytics Overview</h1>



                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
                    {/* Main Chart */}
                    <Card className="lg:col-span-2 bg-[#3A3E41] border-gray-700 text-white p-4">
                        <CardHeader><CardTitle>User Signups Over Time</CardTitle></CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis width={80} />
                                    <Legend />

                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Pie Chart */}
                    <Card className="bg-[#3A3E41] border-gray-700 text-white p-4">
                        <CardHeader><CardTitle>Jobs By Art</CardTitle></CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={jobData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
                                        {jobData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #555' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Data Table */}
                    {/* <Card className="lg:col-span-3 bg-[#3A3E41] border-gray-700 text-white">
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
                    </Card> */}
                </div>
            </main>
        </div>
    );
}

export default Graph;