"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IconEye, IconTrash, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useAllUserQuery, useBandUserMutation, useDeleteUserMutation, useSingleUserQuery } from '@/app/api/userApi';
import { AllUserType } from '@/utility/type/userType';
import { imgUrl } from '@/utility/imgUrl';
import { toast } from 'sonner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { deleteAlert } from '@/utility/alert/deleteAlert';
import { bandAlert } from '@/utility/alert/bandAlert';

const ActionButtons = ({ onView, onDelete }: { onView: () => void; onDelete: () => void }) => (
    <div className="flex items-center gap-4">
        <button onClick={onView} className="p-2 border border-gray-500 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
            <IconEye size={20} className="text-white" />
        </button>
        <button onClick={onDelete} className="p-2 border border-gray-500 rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
            <IconTrash size={20} className="text-white" />
        </button>
    </div>
);

const UserDetailsModal = ({ userId, onClose }: { userId: number | undefined; onClose: () => void }) => {
    const { data } = useSingleUserQuery(userId, { skip: !userId });

    const [deleteUser] = useDeleteUserMutation();
    const [bandUser] = useBandUserMutation();

    if (!userId) return null;

    const handleDeleteUser = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res?.isConfirmed) {
                const apiRes = await deleteUser(id).unwrap();
                if (apiRes) {
                    onClose();
                    toast.success(apiRes?.data?.message || "User deleted successfully");
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    const handleUserBand = async (id: number) => {
        try {
            const res = await bandAlert();
            if (res.isConfirmed) {
                const apiRes = await bandUser(id).unwrap();
                if (apiRes) {
                    onClose();
                    toast.success(apiRes?.data?.message || "User status updated");
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45">
            <div
                className="relative w-full max-w-3xl rounded-lg border border-[#989898] p-8"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-white text-3xl">&times;</button>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-start gap-6">
                            <Image src={`${imgUrl}/${data?.data?.avatar}`} alt={data?.data?.name || "User Avatar"} width={110} height={110} className="rounded-full" />
                            <div>
                                <h2 className="text-3xl font-bold text-white">{data?.data?.name}</h2>
                                <p className="text-lg text-gray-300">{data?.data?.email}</p>
                                <div className="mt-4">
                                    {data?.data?.is_banned === 0 ? (
                                        <div className="w-24 bg-[#60BD66] text-[#10700B] rounded-[9px] py-1.5 text-center">
                                            Active
                                        </div>
                                    ) : (
                                        <div className="w-24 bg-[#BD6360] text-[#600C0C] rounded-[9px] py-1.5 text-center">
                                            Suspended
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4">
                            <h3 className="text-xl font-medium text-white">Basic Information</h3>
                            <div className="space-y-3 text-gray-200">
                                <p className="flex justify-between border-b border-gray-600 pb-2"><span>Job Title:</span> <span>{data?.data?.job_title}</span></p>
                                <p className="flex justify-between border-b border-gray-600 pb-2"><span>Location:</span> <span>{data?.data?.location}</span></p>
                                <div>
                                    <p className="font-semibold">Bio:</p>
                                    <p className="text-sm">{data?.data?.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-xl font-medium text-white">Activity Summary</h3>
                        <div className="mt-8 space-y-3 text-gray-200">
                            <p className="flex justify-between border-b border-gray-600 pb-2"><span>Posts Made:</span> <span>{data?.data?.total_posts}</span></p>
                            <p className="flex justify-between border-b border-gray-600 pb-2"><span>Connections:</span> <span>{data?.data?.total_connections}</span></p>
                        </div>
                        <div className="mt-20 flex gap-4">
                            <button onClick={() => handleUserBand(data?.data?.id)} className="cursor-pointer flex-1 p-3 border border-white rounded-md hover:bg-gray-700 text-white transition-colors">
                                {data?.data?.is_banned === 0 ? "Suspend Account" : "Activate Account"}
                            </button>
                            <button onClick={() => handleDeleteUser(data?.data?.id)} className="cursor-pointer flex-1 p-3 bg-[#BC2C2C] border border-white rounded-md hover:bg-red-700 text-white transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
function UserManagementPage() {
    const [selectedUser, setSelectedUser] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Fetch user list based on active page
    const { data, isLoading } = useAllUserQuery(currentPage);

    const usersData: AllUserType[] = data?.data?.data || [];
    const totalPages: number = data?.data?.last_page || 1;

    const handleViewUser = (userId: number) => setSelectedUser(userId);
    const handleCloseModal = () => setSelectedUser(undefined);

    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteUser = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res?.isConfirmed) {
                const apiRes = await deleteUser(id).unwrap();
                if (apiRes) {
                    toast.success(apiRes?.data?.message || "User deleted");
                }
            }
        } catch (err) {
            const error = err as FetchBaseQueryError & { data?: { message?: string } };
            const message = error.data?.message || "Something went wrong ❌";
            toast.error(message);
        }
    };

    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">User Management</h1>

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
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-400">Loading users...</TableCell>
                            </TableRow>
                        ) : usersData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-400">No users found.</TableCell>
                            </TableRow>
                        ) : (
                            usersData.map((user) => (
                                <TableRow key={user.id} className="border-b border-[#989898] hover:bg-gray-900/50">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Image src={`${imgUrl}/${user?.avatar}`} alt={user.name} width={45} height={45} className="rounded-full" />
                                            <span className="font-bold text-base">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-300">{user.email}</TableCell>
                                    <TableCell>
                                        <div className="text-center w-20">
                                            {user?.is_banned === 0 ? (
                                                <span className="bg-[#60BD66] text-[#10700B] rounded-[9px] py-1.5 px-3 block">Active</span>
                                            ) : (
                                                <span className="bg-[#BD6360] text-[#600C0C] rounded-[9px] py-1.5 px-3 block">Suspended</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-300">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <ActionButtons
                                            onView={() => handleViewUser(user?.id)}
                                            onDelete={() => handleDeleteUser(user.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 mt-8">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="p-2 bg-[#3A3E41] rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                    <IconChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-md ${currentPage === page ? "bg-[#1976D2]" : "bg-[#3A3E41] hover:bg-gray-700"}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="p-2 bg-[#3A3E41] rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                    <IconChevronRight size={20} />
                </button>
            </div>

            <UserDetailsModal userId={selectedUser} onClose={handleCloseModal} />
        </div>
    );
}

export default UserManagementPage;