"use client";

import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight, IconEye, IconSearch, IconX } from '@tabler/icons-react';
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
import { Input } from '@/components/ui/input';
import { useApproveReportContentMutation, useGetAllReportQuery, useRemoveReportContentMutation, useSingleReportQuery } from '@/app/api/contentManagementApi';
import { AllContentType, ReportType } from '@/utility/type/contentType';
import { imgUrl } from '@/utility/imgUrl';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { errorMesage } from '@/utility/error/error';
import { deleteAlert } from '@/utility/alert/deleteAlert';
import { approveAlert } from '@/utility/alert/approveAlert';
import { useBandUserMutation } from '@/app/api/userApi';
import { bandAlert } from '@/utility/alert/bandAlert';

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
const CustomReviewModal = ({ isOpen, onClose, id }: { isOpen: boolean; onClose: () => void; id: number | undefined }) => {

    // ban user 

    const [bandUser] = useBandUserMutation()


    const handleBandUser = async (id: number) => {
        try {
            const res = await bandAlert();
            if (res?.isConfirmed) {
                const res = await bandUser(id).unwrap();
                if (res) {
                    toast.success(res?.data?.message)
                }
            }

        } catch (error) {
            errorMesage(error);
        }
    }



    // report approve 

    const [approveReportContent] = useApproveReportContentMutation();

    const handleApproveContent = async (id: number) => {
        try {
            const res = await approveAlert();
            if (res?.isConfirmed) {
                const res = await approveReportContent(id).unwrap();

                if (res) {
                    toast.success(res?.data?.message);
                }
            }
        } catch (error) {
            errorMesage(error)
        }
    }


    // remove report 

    const [removeReportContent] = useRemoveReportContentMutation()

    const handleRemoveContent = async (id: number) => {
        try {
            const res = await deleteAlert();
            if (res?.isConfirmed) {
                const res = await removeReportContent(id).unwrap();
                if (res) {
                    toast.success(res?.data?.message)
                }
            }
        } catch (err) {
            errorMesage(err)
        }
    }






    // single report 

    const { data: singleReport } = useSingleReportQuery(id);


    const reportData = singleReport?.data || null;



    if (!isOpen || !id) return null;

    const handleAction = (action: string) => {
        alert(`Action: ${action} on report #${id}`);
        onClose();
    };
    if (!reportData || !reportData.post_content) {
        return null;
    }



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
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white cursor-pointer ">
                        <IconX size={24} />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-8">
                    <div className="">
                        {/* Left Column: Content Preview */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white">Post Content : </h3>
                            <div className="rounded-lg bg-[#0F0E13] p-4">
                                <div className="mb-3 flex items-center gap-2">
                                    <Avatar className="h-8 w-8"><AvatarImage src={`${imgUrl}/${reportData.post_content?.avatar}`} /><AvatarFallback>AU</AvatarFallback></Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-white">{reportData.post_content.posted_by}</p>
                                        <p className="text-xs text-gray-400">{reportData?.post_content?.posted_by}</p>
                                    </div>
                                </div>
                                {reportData?.post_content?.photos[0] && <Image src={`${imgUrl}/${reportData?.post_content?.photos[0]}`} alt="Reported content" width={656} height={220} className="w-full rounded-md object-cover" />}
                                <p className="mt-3 text-gray-300">{reportData?.report_details?.description}</p>
                            </div>
                        </div>

                        {/* Right Column: Report Details */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white">Report Details</h3>
                                <div className="mt-4 space-y-2 text-sm">
                                    <p><span className="font-bold text-gray-300">Reported by:</span> <a href="#" className="text-blue-400 underline">{reportData?.report_details?.reported_by}</a></p>
                                    <p><span className="font-bold text-gray-300">Posted by:</span> <a href="#" className="text-blue-400 underline">{reportData?.post_content?.posted_by}</a></p>
                                    <p><span className="font-bold text-gray-300">Date Reported:</span> {new Date(reportData?.report_details?.date_reported).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-semibold text-white">Reason:</h3>
                                <TagBadge text={reportData?.report_details?.report_type} className={getReasonBadgeStyle(reportData?.report_details?.report_type)} />
                            </div>
                            <div>

                                <span className="text-lg font-semibold text-white flex ">Previous Reports: {reportData?.report_details?.previous_reports.length} </span> <span className="text-gray-300">

                                    {
                                        reportData?.report_details?.previous_reports.map((item: ReportType, i: number) => {
                                            return (
                                                <div key={i} >
                                                    <p> Last On {" "}
                                                        {
                                                            new Date(item?.date_reported).toLocaleDateString()
                                                        }
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </span>

                                <p>
                                    <span className="text-lg font-semibold text-white">User History:</span> <span className="text-gray-300">{reportData?.post_content?.posted_by} {" "} {reportData?.user_history?.removed_posts?.length} previous content removals for similar violations </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center gap-4 border-t border-gray-700 px-8 py-4">
                    <Button onClick={() => handleBandUser(reportData?.post_content?.user?.id)} className="bg-[#C86F20] hover:bg-orange-700">Suspend User</Button>
                    <Button onClick={() => handleRemoveContent(reportData?.report_details?.previous_reports?.reported_id)} variant="destructive" className="bg-[#C82E20] hover:bg-red-700">Remove Content</Button>
                    <Button onClick={() => handleApproveContent(reportData?.report_details?.previous_reports?.reported_id)} className="bg-[#2FAC21] hover:bg-green-600">Approve (Dismiss Report)</Button>
                </div>
            </div>
        </div>
    );
};




// --- MAIN PAGE COMPONENT ---
function ContentModerationPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number>();

    const handleViewReport = (id: number) => {
        setIsModalOpen(true);
        setId(id)
    };











    // search 

    const [search, setSearch] = useState("");

    // content api 

    const { data } = useGetAllReportQuery(search);



    const contentData: AllContentType[] = data?.data?.reports?.data || [];




    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = contentData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const paginateContent = contentData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );




    return (
        <div className="p-8 min-h-screen text-white" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F0E13' }}>
            <h1 className="text-2xl font-bold mb-8">Content Moderation</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Reports" value={data?.data?.stats?.total_reports} color="#5191F0" />
                <StatCard title="Pending Review" value={data?.data?.stats?.unreviewed_total} color="#F0A151" />
                <StatCard title="Resolved Today" value={data?.data?.stats?.resolved_today} color="#28C93A" />
                <StatCard title="Content Removed" value={data?.data?.stats?.content_removed} color="#F33535" />
            </div>
            {/* The rest of the page (filters, table, pagination) remains the same */}
            {/* search  */}
            <div className="flex items-center gap-4 mb-8 ">
                <div className="relative w-1/2">
                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search for a business..." className="bg-[#1A1C20] border-[#989898] pl-10 h-11" />
                </div>


                {/* <Select  >
                    <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                        <SelectValue placeholder="Search" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            allCategory?.map((item, i) => (
                                <SelectItem key={i} value={String(item?.id)}>
                                    {item?.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select> */}


                {/* <Select  >
                    <SelectTrigger className="w-[180px] bg-[#0F0E13] border-[#989898]">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={String(0)}>Active</SelectItem>
                        <SelectItem value={String(1)}>Suspended</SelectItem>
                    </SelectContent>
                </Select> */}
            </div>
            <div className="rounded-lg border border-[#989898] overflow-hidden">
                <Table>
                    <TableHeader style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #3A3E41' }}>
                        <TableRow className="border-b border-[#989898] hover:bg-transparent">
                            <TableHead className="text-white font-semibold">Content Type</TableHead>
                            <TableHead className="text-white font-semibold">Content Preview</TableHead>
                            <TableHead className="text-white font-semibold">Reported By</TableHead>
                            <TableHead className="text-white font-semibold">Posted By</TableHead>
                            <TableHead className="text-white font-semibold">Reason</TableHead>
                            <TableHead className="text-white font-semibold">Status</TableHead>
                            <TableHead className="text-white font-semibold">Date & Time</TableHead>
                            <TableHead className="text-white font-semibold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginateContent.map((report, i) => (
                            <TableRow key={i} className="border-b border-[#989898] hover:bg-gray-900/50">
                                <TableCell>
                                    <div className="font-semibold">{report?.type}</div>

                                </TableCell>
                                <TableCell>
                                    <div className="text-xs text-gray-400 truncate max-w-[150px]">{report.post?.content?.slice(0, 20)}...</div>
                                </TableCell>
                                <TableCell>{report.user?.name}</TableCell>
                                <TableCell>{report.post?.user?.name}</TableCell>
                                <TableCell><TagBadge text={report.name} className={getReasonBadgeStyle(report.name as Report['reason'])} /></TableCell>
                                <TableCell><TagBadge text={report.status.charAt(0).toUpperCase() + report.status.slice(1)} className={getStatusBadgeStyle((report.status.charAt(0).toUpperCase() + report.status.slice(1)) as Report['status'])} /></TableCell>
                                <TableCell>{new Date(report?.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button className='cursor-pointer' variant="default" size="icon" onClick={() => handleViewReport(report?.id)}>
                                        <IconEye size={20} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div>
                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-8">

                    {/* Prev */}
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className="disabled:opacity-50"
                    >
                        <IconChevronLeft size={20} />
                    </Button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "secondary"}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    {/* Next */}
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="disabled:opacity-50"
                    >
                        <IconChevronRight size={20} />
                    </Button>

                </div>
            </div>

            <CustomReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} id={id} />
        </div>
    );
}

export default ContentModerationPage;