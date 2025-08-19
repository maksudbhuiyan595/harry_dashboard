// import { IconArrowUpRight } from '@tabler/icons-react'
// import React from 'react'
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// function UserGrowth() {

//     const userGrowthData = [
//         { name: 'Mon', users: 400 },
//         { name: 'Tue', users: 300 },
//         { name: 'Wed', users: 200 },
//         { name: 'Thu', users: 278 },
//         { name: 'Fri', users: 189 },
//         { name: 'Sat', users: 239 },
//         { name: 'Sun', users: 349 },
//     ];

//     return (

//         <div className="h-[529px] rounded-lg p-6 shadow-lg lg:w-1/2" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
//             <h2 className="text-xl font-bold text-white">User Growth</h2>
//             <div className="mt-12 flex items-center">
//                 <div className="text-7xl font-bold text-white">1,590</div>
//                 <div className="ml-4 flex items-center text-lg font-bold text-green-500">
//                     <IconArrowUpRight />
//                     <span>+40.7%</span>
//                 </div>
//             </div>
//             <div className="mt-2 text-sm text-gray-400">Compared to the previous 7 days</div>
//             <div className="mt-8 h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                         <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#888888" />
//                         <YAxis tickLine={false} axisLine={false} stroke="#888888" />
//                         <Tooltip
//                             contentStyle={{
//                                 background: "#3A3E41",
//                                 borderColor: "#555",
//                                 color: "#fff",
//                             }}
//                         />
//                         <Bar dataKey="users" fill="#1778F2" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>

//     )
// }

// export default UserGrowth

import { IconArrowUpRight } from '@tabler/icons-react';
import React from 'react';
// Your specified imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function UserGrowth() {
    const userGrowthData = [
        { name: 'Mon', users: 400 },
        { name: 'Tue', users: 300 },
        { name: 'Wed', users: 200 },
        { name: 'Thu', users: 278 },
        { name: 'Fri', users: 189 },
        { name: 'Sat', users: 239 },
        { name: 'Sun', users: 349 },
    ];

    return (
        <div
            className="flex h-[529px] w-full flex-col rounded-lg p-6 shadow-lg lg:w-1/2"
            style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
        >
            <h2 className="text-xl font-bold text-white">User Growth</h2>
            <div className="mt-12 flex items-center">
                <div className="text-7xl font-bold text-white">1,590</div>
                <div className="ml-4 flex items-center text-lg font-bold text-green-500">
                    <IconArrowUpRight />
                    <span>+40.7%</span>
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-400">Compared to the previous 7 days</div>

            <div className="mt-8 flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        {/* Defines a gradient for the Area fill */}
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#1778F2" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#1778F2" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{
                                background: "#2d3748",
                                borderColor: "#555",
                                color: "#fff",
                                borderRadius: "0.5rem",
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#1778F2" // Line color
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorUsers)" // Gradient fill
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default UserGrowth;