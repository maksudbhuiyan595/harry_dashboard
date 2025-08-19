"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IconEye, IconPencil, IconTrash, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import avater from '../../../../assets/Images/avater.png'

// --- MOCK DATA ---
const usersData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.j@gmail.com',
        avatar: avater,
        status: 'Active',
        joinedDate: '2025-08-15',
        jobTitle: 'Marketing Manager',
        location: 'Dubai, UAE',
        bio: 'Driving growth through strategic marketing campaigns.',
        postsMade: 120,
        connections: 890,
    },
    {
        id: 2,
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: avater,
        status: 'Suspended',
        joinedDate: '2025-07-21',
        jobTitle: 'Lead Developer',
        location: 'New York, USA',
        bio: 'Building scalable web applications and leading technical teams.',
        postsMade: 75,
        connections: 540,
    },
    {
        id: 3,
        name: 'Aisha Khan',
        email: 'aisha.k@work.net',
        avatar: avater,
        status: 'Active',
        joinedDate: '2025-06-11',
        jobTitle: 'UX Designer',
        location: 'London, UK',
        bio: 'Crafting intuitive and beautiful user experiences.',
        postsMade: 210,
        connections: 1200,
    },
];


const StatusBadge = ({ status }: any) => {
    const styles = {
        Active: "bg-[#60BD66] text-[#10700B]",
        Suspended: "bg-[#BD6360] text-[#600C0C]",
    };
    return <div className={`px-2 py-1 text-sm font-medium rounded-full inline-block ${styles[status]}`}>{status}</div>;
};

const ActionButtons = ({ onView, onEdit, onDelete }: any) => (
    <div className="flex items-center gap-4">
        <button onClick={onView} className="p-2 border border-gray-500 rounded-md hover:bg-gray-700 transition-colors">
            <IconEye size={20} className="text-white" />
        </button>
        <button onClick={onEdit} className="p-2 border border-gray-500 rounded-md hover:bg-gray-700 transition-colors">
            <IconPencil size={20} className="text-white" />
        </button>
        <button onClick={onDelete} className="p-2 border border-gray-500 rounded-md hover:bg-gray-700 transition-colors">
            <IconTrash size={20} className="text-white" />
        </button>
    </div>
);

const UserDetailsModal = ({ user, onClose }: any) => {
    if (!user) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div
                className="relative w-full max-w-3xl rounded-lg border border-[#989898] p-8"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl">&times;</button>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-start gap-6">
                            <Image src={user.avatar} alt={user.name} width={110} height={110} className="rounded-full" />
                            <div>
                                <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                                <p className="text-lg text-gray-300">{user.email}</p>
                                <div className="mt-4"><StatusBadge status={user.status} /></div>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="text-xl font-medium text-white">Basic Information</h3>
                            <div className="space-y-3 text-gray-200">
                                <p className="flex justify-between border-b border-gray-600 pb-2"><span>Job Title:</span> <span>{user.jobTitle}</span></p>
                                <p className="flex justify-between border-b border-gray-600 pb-2"><span>Location:</span> <span>{user.location}</span></p>
                                <div>
                                    <p className="font-semibold">Bio:</p>
                                    <p className="text-sm">{user.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl font-medium text-white">Activity Summary</h3>
                        <div className="mt-8 space-y-3 text-gray-200">
                            <p className="flex justify-between border-b border-gray-600 pb-2"><span>Posts Made:</span> <span>{user.postsMade}</span></p>
                            <p className="flex justify-between border-b border-gray-600 pb-2"><span>Connections:</span> <span>{user.connections}</span></p>
                        </div>
                        <div className="mt-20 flex gap-4">
                            <button className="flex-1 p-3 border border-white rounded-md hover:bg-gray-700 text-white transition-colors">Suspend Account</button>
                            <button className="flex-1 p-3 bg-[#BC2C2C] border border-white rounded-md hover:bg-red-700 text-white transition-colors">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
function UserManagementPage() {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewUser = (user: any) => setSelectedUser(user);
    const handleCloseModal = () => setSelectedUser(null);
    const handleEditUser = (userId: any) => alert(`Editing user with ID: ${userId}`);
    const handleDeleteUser = (userId: any) => alert(`Deleting user with ID: ${userId}`);

    return (
        <div className="p-8 min-h-screen text-white " style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">User Management</h1>

            {/* User Table using shadcn/ui */}
            <div className="rounded-lg border border-[#989898] overflow-hidden">
                <Table>
                    <TableHeader style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                        <TableRow className="border-b border-[#989898] hover:bg-transparent">
                            <TableHead className="w-[35%] text-white font-semibold text-lg">User</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Email</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Status</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Joined Date</TableHead>
                            <TableHead className="text-white font-semibold text-lg">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {usersData.map((user) => (
                            <TableRow key={user.id} className="border-b border-[#989898] hover:bg-gray-900/50">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Image src={user.avatar} alt={user.name} width={45} height={45} className="rounded-full" />
                                        <span className="font-bold text-base">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-300">{user.email}</TableCell>
                                <TableCell><StatusBadge status={user.status} /></TableCell>
                                <TableCell className="text-gray-300">{user.joinedDate}</TableCell>
                                <TableCell>
                                    <ActionButtons
                                        onView={() => handleViewUser(user)}
                                        onEdit={() => handleEditUser(user.id)}
                                        onDelete={() => handleDeleteUser(user.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination (Unchanged) */}
            <div className="flex justify-center items-center gap-4 mt-8">
                <button className="p-2 bg-[#3A3E41] rounded-md hover:bg-gray-700"><IconChevronLeft size={20} /></button>
                <button className="px-4 py-2 bg-[#1976D2] rounded-md">1</button>
                <button className="px-4 py-2 bg-[#3A3E41] rounded-md hover:bg-gray-700">2</button>
                <button className="px-4 py-2 bg-[#3A3E41] rounded-md hover:bg-gray-700">3</button>
                <button className="p-2 bg-[#3A3E41] rounded-md hover:bg-gray-700"><IconChevronRight size={20} /></button>
            </div>

            {/* Modal (Unchanged) */}
            <UserDetailsModal user={selectedUser} onClose={handleCloseModal} />
        </div>
    );
}

export default UserManagementPage;