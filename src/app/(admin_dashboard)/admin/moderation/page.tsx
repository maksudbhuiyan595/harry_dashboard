"use client";

import React, { useState, useMemo } from 'react';
import { IconSearch, IconCalendar, IconEye, IconChevronLeft, IconChevronRight, IconUser, IconLink, IconX } from '@tabler/icons-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// --- TYPES & MOCK DATA (Unchanged) ---
type Report = {
    id: number;
    contentType: 'Post' | 'Image' | 'Comment';
    preview: string;
    content: {
        image?: string;
        text: string;
        author: {
            name: string;
            title: string;
            avatar: string;
        }
    };
    reportedBy: string;
    postedBy: string;
    reason: 'Harassment' | 'Inappropriate' | 'Spam' | 'Misinformation';
    status: 'Unreviewed' | 'Removed' | 'Approved';
    dateTime: string;
    previousReports: number;
    userHistory: string;
};

const reportsData: Report[] = [
    {
        id: 1,
        contentType: 'Post',
        preview: 'This is completely...',
        content: {
            image: "https://placehold.co/656x220",
            text: "Excited to share my latest project! #design #uidesign",
            author: { name: "Leo Messi", title: "Product Designer @ Google", avatar: "https://placehold.co/29x29" }
        },
        reportedBy: '@azhar123',
        postedBy: '@mahedi234',
        reason: 'Harassment',
        status: 'Unreviewed',
        dateTime: '2025-05-25 10:30',
        previousReports: 2,
        userHistory: '@mahedi234 has 1 previous content removal for similar violations.'
    },
    {
        id: 2,
        contentType: 'Image',
        preview: 'An inappropriate...',
        content: {
            image: "https://placehold.co/656x220/ff0000/ffffff",
            text: "Check out this controversial art piece.",
            author: { name: "Jane Doe", title: "Artist", avatar: "https://placehold.co/29x29" }
        },
        reportedBy: '@jane.doe',
        postedBy: '@john.smith',
        reason: 'Inappropriate',
        status: 'Removed',
        dateTime: '2025-05-24 15:00',
        previousReports: 5,
        userHistory: '@john.smith has been suspended once before.'
    },
];

// --- REUSABLE COMPONENTS (Unchanged) ---
const StatCard = ({ title, value, color }: { title: string, value: string | number, color: string }) => (
    <Card className="flex flex-row p-4 border-[#989898]  items-center justify-between" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
        <div><p className="text-2xl font-bold text-white">{value}</p><p className="text-sm text-white">{title}</p></div>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    </Card>
);

const TagBadge = ({ text, className }: { text: string; className: string; }) => (
    <div className={`px-3 py-1 text-sm font-medium rounded-full inline-block ${className}`}>{text}</div>
);

const getReasonBadgeStyle = (reason: Report['reason']) => {
    switch (reason) {
        case 'Harassment': return "bg-[#A85E5E] text-[#7B1E1E]";
        case 'Inappropriate': return "bg-[#A85EA8] text-[#62125C]";
        case 'Spam': return "bg-[#A88E5E] text-[#624312]";
        case 'Misinformation': return "bg-[#5E9FA8] text-[#1E747B]";
        default: return "bg-gray-500 text-gray-100";
    }
};

const getStatusBadgeStyle = (status: Report['status']) => {
    switch (status) {
        case 'Unreviewed': return "bg-[#BDBA60] text-[#70670B]";
        case 'Removed': return "bg-[#A85E5E] text-[#7B1E1E]";
        case 'Approved': return "bg-[#60BD66] text-[#10700B]";
        default: return "bg-gray-500 text-gray-100";
    }
};

// --- NEW CUSTOM MODAL COMPONENT ---
const CustomReviewModal = ({ isOpen, onClose, report }: { isOpen: boolean; onClose: () => void; report: Report | null }) => {
    if (!isOpen || !report) return null;

    const handleAction = (action: string) => {
        console.log({ action, reportId: report.id });
        alert(`Action: ${action} on report #${report.id}`);
        onClose();
    };

    return (
        // 1. Main overlay: fixed position, covers the screen, with a semi-transparent background.
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15">
            {/* 2. Modal Panel: The actual modal content area with our custom styles. */}
            <div
                className="relative flex h-[90vh] w-[35vw] max-w-screen-xl flex-col rounded-lg border border-gray-700 shadow-2xl"
                style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-700 px-8 py-4">
                    <h2 className="text-2xl text-white font-bold">Reported Content Review</h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
                        <IconX size={24} />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-8">
                    <div className="">
                        {/* Left Column: Content Preview */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white">Post Content</h3>
                            <div className="rounded-lg bg-[#0F0E13] p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <Avatar className="h-8 w-8"><AvatarImage src={report.content.author.avatar} /><AvatarFallback>AU</AvatarFallback></Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-white">{report.content.author.name}</p>
                                        <p className="text-xs text-gray-400">{report.content.author.title}</p>
                                    </div>
                                </div>
                                {report.content.image && <Image src={report.content.image} alt="Reported content" width={656} height={220} className="w-full rounded-md object-cover" />}
                                <p className="mt-3 text-gray-300">{report.content.text}</p>
                            </div>
                        </div>

                        {/* Right Column: Report Details */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Report Details</h3>
                                <div className="mt-4 space-y-2 text-sm">
                                    <p><span className="font-bold text-gray-300">Reported by:</span> <a href="#" className="text-blue-400 underline">{report.reportedBy}</a></p>
                                    <p><span className="font-bold text-gray-300">Posted by:</span> <a href="#" className="text-blue-400 underline">{report.postedBy}</a></p>
                                    <p><span className="font-bold text-gray-300">Date Reported:</span> {report.dateTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-semibold text-white">Reason:</h3>
                                <TagBadge text={report.reason} className={getReasonBadgeStyle(report.reason)} />
                            </div>
                            <div>
                                <p><span className="text-lg font-semibold text-white">Previous Reports:</span> <span className="text-gray-300">{report.previousReports}</span></p>
                                <p><span className="text-lg font-semibold text-white">User History:</span> <span className="text-gray-300">{report.userHistory}</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center gap-4 border-t border-gray-700 px-8 py-4">
                    <Button onClick={() => handleAction('Suspend User')} className="bg-[#C86F20] hover:bg-orange-700">Suspend User</Button>
                    <Button onClick={() => handleAction('Remove Content')} variant="destructive" className="bg-[#C82E20] hover:bg-red-700">Remove Content</Button>
                    <Button onClick={() => handleAction('Approve')} className="bg-[#2FAC21] hover:bg-green-600">Approve (Dismiss Report)</Button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
function ContentModerationPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">Content Moderation</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Reports" value={156} color="#5191F0" />
                <StatCard title="Pending Review" value={23} color="#F0A151" />
                <StatCard title="Resolved Today" value={8} color="#28C93A" />
                <StatCard title="Content Removed" value={12} color="#F33535" />
            </div>
            {/* The rest of the page (filters, table, pagination) remains the same */}
            <div className="rounded-lg border border-[#989898] overflow-hidden">
                <Table>
                    <TableHeader style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                        <TableRow className="border-b border-[#989898] hover:bg-transparent">
                            <TableHead className="text-white font-semibold">Content</TableHead>
                            <TableHead className="text-white font-semibold">Reported By</TableHead>
                            <TableHead className="text-white font-semibold">Posted By</TableHead>
                            <TableHead className="text-white font-semibold">Reason</TableHead>
                            <TableHead className="text-white font-semibold">Status</TableHead>
                            <TableHead className="text-white font-semibold">Date</TableHead>
                            <TableHead className="text-white font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportsData.map((report) => (
                            <TableRow key={report.id} className="border-b border-[#989898] hover:bg-gray-900/50">
                                <TableCell>
                                    <div className="font-semibold">{report.contentType}</div>
                                    <div className="text-xs text-gray-400 truncate max-w-[150px]">{report.preview}</div>
                                </TableCell>
                                <TableCell>{report.reportedBy}</TableCell>
                                <TableCell>{report.postedBy}</TableCell>
                                <TableCell><TagBadge text={report.reason} className={getReasonBadgeStyle(report.reason)} /></TableCell>
                                <TableCell><TagBadge text={report.status} className={getStatusBadgeStyle(report.status)} /></TableCell>
                                <TableCell>{report.dateTime}</TableCell>
                                <TableCell>
                                    <Button variant="default" size="icon" onClick={() => handleViewReport(report)}>
                                        <IconEye size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <CustomReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} report={selectedReport} />
        </div>
    );
}

export default ContentModerationPage;